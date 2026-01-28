import { ref, reactive, computed, onMounted } from "vue";
import {
  VolunteerService,
  VolunteerSkillService,
  SkillService,
} from "../services/api/apiService";
import { useVolunteer } from "./useVolunteer";
import { supabase } from "../config/supabase";

export function useProfile() {
  const profile = reactive({
    id: null, // user id
    full_name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    date_of_birth: "",
    gender: "",
    photo_url: "",
    skills: "",
    volunteer_skills: [], // [{id,name}]
  });

  const form = reactive({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    address: "",
    date_of_birth: "",
    gender: "",
    skills: "",
  });

  const isEditing = ref(false);
  const previewImage = ref(null);
  const profileLoaded = ref(false);

  const message = ref("");
  const messageType = ref("");

  const user = ref(null);

  const { volunteers, fetchVolunteers } = useVolunteer();
  const volunteer = ref(null);

  // Get fresh user data from Supabase
  const getCurrentUser = async () => {
    const { data: { user: supabaseUser } } = await supabase.auth.getUser();
    if (supabaseUser) {
      user.value = supabaseUser;
      localStorage.setItem("user", JSON.stringify(supabaseUser));
    }
    return supabaseUser;
  };

  const fullPhotoUrl = computed(() => {
    if (!profile.photo_url) return null;
    return `${
      profile.photo_url.startsWith("http") ? "" : "http://localhost:3000"
    }${profile.photo_url}?cb=${Date.now()}`;
  });

  const fetchProfile = async () => {
    // Get fresh user from Supabase Auth
    await getCurrentUser();
    
    if (!user.value) {
      profileLoaded.value = true;
      return;
    }

    try {
      // Fetch user data from users table
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', user.value.id)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
        profileLoaded.value = true;
        return;
      }

      if (userData) {
        profile.id = userData.id;
        profile.full_name = userData.full_name || "";
        profile.username = userData.username || "";
        profile.email = userData.email || user.value.email || "";
        profile.phone = userData.phone || "";
        profile.address = userData.address || "";
        profile.date_of_birth = userData.date_of_birth || "";
        profile.gender = userData.gender || "";
        profile.photo_url = userData.photo_url || "";
        profile.skills = userData.skills || "";

        Object.assign(form, {
          full_name: profile.full_name,
          username: profile.username,
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
          date_of_birth: profile.date_of_birth,
          gender: profile.gender,
          skills: profile.skills,
        });

        // Fetch user skills if using skills table (optional)
        // For now, we'll just use the skills text field
        profile.volunteer_skills = [];
      }
    } catch (err) {
      console.error("fetchProfile error:", err);
    } finally {
      profileLoaded.value = true;
    }
  };

  const fetchSkills = async () => {
    try {
      const res = await SkillService.getAll();

      return res.data?.data?.items || res.data?.data || res.data || [];
    } catch (e) {
      console.error("fetchSkills error:", e);
      return [];
    }
  };

  const syncSkillLinks = async (relawanId, newSkillIds = []) => {
    try {
      const existing = await VolunteerSkillService.getAll({
        relawan_id: relawanId,
      });

      const links =
        existing.data?.data?.items ||
        existing.data?.data ||
        existing.data ||
        [];

      console.log("Current relawan_skills links:", links);

      const existMap = {};
      links.forEach((l) => (existMap[l.skill_id] = l.id));

      // skill yang perlu ditambahkan
      const toAdd = newSkillIds.filter((id) => !existMap[id]);

      // skill yang perlu dihapus
      const toRemove = links.filter((l) => !newSkillIds.includes(l.skill_id));

      console.log("toAdd:", toAdd);
      console.log("toRemove:", toRemove);

      for (const sid of toAdd) {
        await VolunteerSkillService.create({
          relawan_id: relawanId,
          skill_id: sid,
        });
        console.log("Created relawan_skills for skill_id:", sid);
      }

      for (const del of toRemove) {
        console.log("Attempting to delete relawan_skills:", del);
        if (del.id) {
          await VolunteerSkillService.delete(del.id);
          console.log("Deleted relawan_skills id:", del.id);
        } else {
          console.warn("del.id is undefined, object:", del);
        }
      }
    } catch (e) {
      console.error("syncSkillLinks error:", e);
    }
  };

  const toggleEdit = () => {
    if (!isEditing.value) {
      Object.assign(form, profile);
    }
    isEditing.value = !isEditing.value;
  };

  // Remove a skill locally only (no backend sync yet)
  const removeSkillLocal = (skillId) => {
    const idx = profile.volunteer_skills.findIndex((s) => s.id === skillId);
    if (idx >= 0) {
      profile.volunteer_skills.splice(idx, 1);
      console.log("Removed skill locally, id:", skillId);
    }
  };

  const saveProfile = async () => {
    if (!user.value || !profile.id) return;

    try {
      showMessage("Menyimpan profil...", "info");

      // Update user data in Supabase
      const { error } = await supabase
        .from('users')
        .update({
          full_name: form.full_name,
          phone: form.phone,
          address: form.address,
          date_of_birth: form.date_of_birth || null,
          gender: form.gender || null,
          skills: form.skills,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (error) {
        throw error;
      }

      // Update local profile state
      Object.assign(profile, form);

      // Fetch fresh data
      await fetchProfile();

      isEditing.value = false;
      showMessage("Profil berhasil diperbarui", "success");
    } catch (err) {
      console.error("saveProfile error:", err);
      showMessage("Gagal menyimpan profil: " + err.message, "error");
    }
  };

  const handlePhotoChange = async (file) => {
    if (!file || !profile.id) return;
    // This function is now handled in Profile.vue with Supabase Storage
    // Keeping it here for compatibility
    console.log('handlePhotoChange called, but now handled in Profile.vue');
  };

  const deletePhoto = async () => {
    if (!profile.id || !user.value) return;
    try {
      showMessage("Menghapus foto...", "info");

      // Update users table to remove photo_url
      const { error } = await supabase
        .from('users')
        .update({ photo_url: null })
        .eq('id', profile.id);

      if (error) throw error;

      profile.photo_url = null;
      previewImage.value = null;

      showMessage("Foto profil dihapus", "success");
    } catch (e) {
      console.error("delete photo error:", e);
      showMessage("Gagal menghapus foto: " + e.message, "error");
    }
  };

  const showMessage = (text, type = "info") => {
    message.value = text;
    messageType.value = type;
    setTimeout(() => (message.value = ""), 3000);
  };

  onMounted(fetchProfile);

  return {
    profile,
    form,
    isEditing,
    toggleEdit,
    saveProfile,
    fetchProfile,
    previewImage,
    message,
    messageType,
    fullPhotoUrl,
    profileLoaded,
    volunteer,
    handlePhotoChange,
    deletePhoto,
    fetchSkills,
    removeSkillLocal,
  };
}
