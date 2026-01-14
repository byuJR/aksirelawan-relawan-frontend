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
    id: null, // volunteer_id
    name: "",
    email: "",
    phone: "",
    address: "",
    photo_url: "",
    volunteer_skills: [], // [{id,name}]
  });

  const form = reactive({
    name: "",
    email: "",
    phone: "",
    address: "",
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
    // Get fresh user from Supabase
    await getCurrentUser();
    
    if (!user.value) {
      profileLoaded.value = true;
      return;
    }

    try {
      await fetchVolunteers();

      // cari volunteer berdasarkan user_id
      volunteer.value =
        volunteers.value.find((v) => v.user_id === user.value.id) || null;

      // jika belum punya volunteer → profil kosong
      if (!volunteer.value) {
        profileLoaded.value = true;
        return;
      }

      const res = await VolunteerService.getById(volunteer.value.id);
      const v = res.data?.data || res.data;

      profile.id = v.id;
      profile.name = v.name || "";
      profile.email = v.email || "";
      profile.phone = v.phone || "";
      profile.address = v.address || "";
      profile.photo_url = v.photo_url || "";

      Object.assign(form, profile);

      if (Array.isArray(v.volunteer_skills)) {
        profile.volunteer_skills = v.volunteer_skills;
      } else {
        // fallback fetch join table
        const skillLinks = await VolunteerSkillService.getAll({
          relawan_id: v.id,
        });

        const linkItems =
          skillLinks.data?.data?.items ||
          skillLinks.data?.data ||
          skillLinks.data ||
          [];

        const skillIds = linkItems.map((s) => s.skill_id);

        const detail = await Promise.all(
          skillIds.map((id) =>
            SkillService.getById(id).then((r) => r.data?.data || r.data)
          )
        );

        profile.volunteer_skills = detail;
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
    if (!user.value) return;

    try {
      showMessage("Menyimpan profil...", "info");

      // UPDATE atau CREATE relawan
      if (profile.id) {
        await VolunteerService.update(profile.id, {
          name: form.name,
          phone: form.phone,
          address: form.address,
        });
      } else {
        const res = await VolunteerService.create({
          user_id: user.value.id,
          name: form.name,
          phone: form.phone,
          address: form.address,
        });

        profile.id = res.data?.data?.id || res.data?.id;
      }

      Object.assign(profile, form);

      // SYNC skills
      console.log(
        "Before syncSkillLinks - profile.volunteer_skills:",
        profile.volunteer_skills
      );
      const skillIds = profile.volunteer_skills.map((s) => s.id);
      console.log("skillIds to sync:", skillIds);
      await syncSkillLinks(profile.id, skillIds);

      // FETCH ulang (fresh)
      await fetchProfile();

      isEditing.value = false;
      showMessage("Profil berhasil diperbarui", "success");
    } catch (err) {
      console.error("saveProfile error:", err);
      showMessage("Gagal menyimpan profil", "error");
    }
  };

  const handlePhotoChange = async (file) => {
    if (!file || !profile.id) return;
    try {
      showMessage("Mengunggah foto...", "info");

      const fd = new FormData();
      fd.append("photo", file);

      const res = await VolunteerService.uploadPhoto(profile.id, fd);
      profile.photo_url = res.data.photo_url;
      previewImage.value = null;

      showMessage("Foto profil berhasil diubah", "success");
    } catch (e) {
      console.error("upload photo error:", e);
      showMessage("Gagal mengunggah foto", "error");
    }
  };

  const deletePhoto = async () => {
    if (!profile.id) return;
    try {
      await VolunteerService.update(profile.id, { photo_url: null });
      profile.photo_url = null;

      showMessage("Foto profil dihapus", "success");
    } catch (e) {
      console.error("delete photo error:", e);
      showMessage("Gagal menghapus foto", "error");
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
