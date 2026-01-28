<script setup>
import { ref, onMounted, computed } from "vue";
import { useProfile } from "../../composables/useProfile.js";
import defaultUserIcon from "../../assets/images/icons/iconuser.png";
import Loader from "../Loader.vue";
import PenIcon from "../icons/PenIcon.vue";
import PhotoModal from "./PhotoModal.vue";
import { uploadFile, getPublicUrl, deleteFile } from "../../services/storageService.js";
import { supabase } from "../../config/supabase";

const fileInput = ref(null);
const showPhotoPopup = ref(false);
const uploadingAvatar = ref(false);

const {
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
  handlePhotoChange,
  deletePhoto,
  fetchSkills,
  removeSkillLocal,
} = useProfile();
const originalSkills = ref([]);

const skillsOptions = ref([]);
const selectedSkillId = ref("");
const avatarTimestamp = ref(Date.now());

// Computed property for avatar with cache busting
const avatarUrl = computed(() => {
  if (previewImage.value) {
    return previewImage.value;
  }
  if (profile.photo_url && profile.photo_url.trim()) {
    // Always add timestamp for cache busting
    return `${profile.photo_url}?t=${avatarTimestamp.value}`;
  }
  return defaultUserIcon;
});

const triggerFileInput = () => fileInput.value.click();

const onFileChange = async (e) => {
  console.log('onFileChange called!', e);
  const file = e.target.files[0];
  console.log('Selected file:', file);
  if (!file) return;

  // Validate file size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    message.value = 'Ukuran file maksimal 5MB';
    messageType.value = 'error';
    setTimeout(() => { message.value = ''; }, 3000);
    return;
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    message.value = 'Format file harus JPEG, PNG, WebP, atau GIF';
    messageType.value = 'error';
    setTimeout(() => { message.value = ''; }, 3000);
    return;
  }

  try {
    uploadingAvatar.value = true;
    
    // Get current user from Supabase
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    
    // IMPORTANT: Use auth user id for RLS policy (not profile.id)
    const authUserId = currentUser.id;
    
    // Use original file extension
    const fileExt = file.name.split('.').pop().toLowerCase();
    const filePath = `${authUserId}/avatar.${fileExt}`;

    console.log('Auth User ID:', authUserId);
    console.log('Upload path:', filePath);

    // Delete all old avatars in user folder (any extension)
    try {
      const { data: existingFiles } = await supabase.storage
        .from('user-avatars')
        .list(authUserId);
      
      console.log('Existing files:', existingFiles);
      
      if (existingFiles && existingFiles.length > 0) {
        const filesToDelete = existingFiles.map(f => `${authUserId}/${f.name}`);
        console.log('Deleting old files:', filesToDelete);
        
        const { error: deleteError } = await supabase.storage
          .from('user-avatars')
          .remove(filesToDelete);
        
        if (deleteError) {
          console.warn('Failed to delete old files:', deleteError);
        } else {
          console.log('Old files deleted successfully');
        }
      }
    } catch (err) {
      console.log('Error checking/deleting old files:', err);
    }

    // Upload new avatar to Supabase Storage
    const { error: uploadError } = await uploadFile(
      'user-avatars',
      filePath,
      file,
      { upsert: true }
    );

    if (uploadError) throw uploadError;

    console.log('Upload success! Getting public URL...');

    // Get public URL with cache busting
    const baseUrl = await getPublicUrl('user-avatars', filePath);
    const newAvatarUrl = `${baseUrl}?t=${Date.now()}`; // Add timestamp for cache busting
    
    console.log('Public URL:', newAvatarUrl);
    console.log('Updating database for user id:', profile.id);

    // Update user record in database (use profile.id)
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        photo_url: baseUrl, // Save without timestamp in DB
        updated_at: new Date().toISOString()
      })
      .eq('id', profile.id);

    console.log('Database update error:', updateError);

    if (updateError) throw updateError;

    console.log('Database updated successfully!');

    // Update local state with cache busting URL
    profile.photo_url = baseUrl;
    previewImage.value = newAvatarUrl; // Use timestamp version for immediate display
    
    // Update timestamp to force image reload
    avatarTimestamp.value = Date.now();

    // Refresh profile to get latest data
    await fetchProfile();

    message.value = 'Foto profil berhasil diupdate!';
    messageType.value = 'success';
    setTimeout(() => { message.value = ''; }, 3000);

    showPhotoPopup.value = false;
  } catch (error) {
    console.error('Avatar upload error:', error);
    message.value = 'Gagal upload foto: ' + error.message;
    messageType.value = 'error';
    setTimeout(() => { message.value = ''; }, 3000);
  } finally {
    uploadingAvatar.value = false;
    // Force reload image
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  }
};

const removeSkillById = (id) => {
  removeSkillLocal(id);
};

const enterEdit = () => {
  // snapshot skills so we can restore on cancel
  originalSkills.value = (profile.volunteer_skills || []).slice();
  toggleEdit();
};

const cancelEdit = () => {
  // restore skills from snapshot
  profile.volunteer_skills = (originalSkills.value || []).slice();
  toggleEdit();
};

const fields = [
  { key: 'full_name', label: 'Nama Lengkap' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Telepon' },
  { key: 'date_of_birth', label: 'Tanggal Lahir', inputType: 'date' },
  { key: 'gender', label: 'Jenis Kelamin', type: 'select', options: [
    { value: '', label: 'Pilih Jenis Kelamin' },
    { value: 'male', label: 'Laki-laki' },
    { value: 'female', label: 'Perempuan' },
    { value: 'other', label: 'Lainnya' },
    { value: 'prefer_not_to_say', label: 'Lebih Baik Tidak Disebutkan' }
  ]},
  { key: 'address', label: 'Alamat', type: 'textarea' },
];

const genderLabel = computed(() => {
  if (!profile || !profile.gender) return 'Belum diisi';
  const genderMap = {
    'male': 'Laki-laki',
    'female': 'Perempuan',
    'other': 'Lainnya',
    'prefer_not_to_say': 'Lebih Baik Tidak Disebutkan'
  };
  return genderMap[profile.gender] || profile.gender;
});

const formatDate = (dateString) => {
  if (!dateString) return 'Belum diisi';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
};

onMounted(async () => {
  try {
    const list = await fetchSkills();
    skillsOptions.value = Array.isArray(list) ? list : [];
  } catch (e) {
    console.error("Failed to load skills list:", e);
    skillsOptions.value = [];
  }

  fetchProfile();
});

const addSelectedSkill = () => {
  if (!selectedSkillId.value) return;
  const id = selectedSkillId.value;
  const found = skillsOptions.value.find((s) => String(s.id) === String(id));
  if (!found) return;
  if (!profile.volunteer_skills.find((s) => String(s.id) === String(found.id))) {
    profile.volunteer_skills.push(found);
  }
  // reset select
  selectedSkillId.value = "";
};

</script>

<template>
  <transition name="fade-slide">
    <div class="container mx-auto px-4 py-2 max-w-3xl" v-if="profileLoaded">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-black mb-0">Profil Pengguna</h1>
      </div>

      <div
        class="flex flex-col md:flex-row items-start md:items-start gap-8 bg-white p-6 rounded-lg shadow-md min-h-[260px]">
        <!-- Foto Profil -->
        <div
          class="flex-shrink-0 w-56 h-56 mx-auto md:mx-0 cursor-pointer relative mb-4 md:mb-0 transition-all duration-300 profile-photo-container"
          @click="showPhotoPopup = true">
          <img :src="avatarUrl" alt="Foto Profil"
            class="w-full h-full rounded-full object-cover border-4 border-indigo-800" />
          <div
            class="absolute inset-0 rounded-full bg-black opacity-0 hover:opacity-25 transition-opacity flex items-center justify-center">
            <PenIcon />
          </div>
        </div>

        <!-- Data Profil dengan Transisi -->
        <transition name="fade" mode="out-in">
          <!-- Display Profil -->
          <div v-if="!isEditing" key="display"
            class="flex-grow w-full max-w-full overflow-hidden relative z-10 flex flex-col space-y-4 h-full justify-between">
            <div v-for="field in fields" :key="field.key"
              class="border-b border-gray-200 pb-2 max-w-full overflow-hidden">
              <h3 class="text-sm font-semibold text-gray-600 mb-2">{{ field.label }}</h3>
              <p class="text-gray-800 break-words overflow-wrap break-word max-w-full overflow-hidden">
                <template v-if="field.key === 'date_of_birth'">
                  <span>{{ formatDate(profile[field.key]) }}</span>
                </template>
                <template v-else-if="field.key === 'gender'">
                  <span>{{ genderLabel }}</span>
                </template>
                <template v-else>
                  <span v-if="profileLoaded && (!profile[field.key] || profile[field.key].trim() === '')"
                    class="text-gray-400 italic">Belum diisi</span>
                  <span v-else>{{ profile[field.key] }}</span>
                </template>
              </p>
            </div>
            <!-- Summary -->
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div class="p-3 bg-gray-50 rounded-md text-center">
                <div class="text-lg font-bold">{{ profile.volunteer_skills?.length || 0 }}</div>
                <div class="text-xs text-gray-500">Skills</div>
              </div>
              <div class="p-3 bg-gray-50 rounded-md text-center">
                <div class="text-lg font-bold">{{ profile.id ? 'Terdaftar' : 'Belum' }}</div>
                <div class="text-xs text-gray-500">Status Relawan</div>
              </div>
            </div>

            <div class="mt-4">
              <h3 class="text-sm font-semibold text-gray-600">Skill</h3>
              <div class="mt-2 flex flex-wrap gap-2">
                <template v-if="profile.volunteer_skills && profile.volunteer_skills.length">
                  <span v-for="s in profile.volunteer_skills" :key="s.id"
                    class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                    <span>{{ s.name }}</span>
                  </span>
                </template>
                <span v-else class="text-gray-400 italic">Belum ada skill</span>
              </div>
            </div>
            <div class="flex justify-end">
              <button @click="enterEdit"
                class="mt-2 bg-indigo-800 hover:bg-indigo-900 text-white font-bold py-2 px-8 rounded-full transition duration-300">
                Edit Profil
              </button>
            </div>
          </div>

          <!-- Edit Profil -->
          <div v-else key="edit" class="flex-grow w-full max-w-full overflow-hidden relative z-10">
            <form @submit.prevent="saveProfile" class="space-y-4">
              <div v-for="field in fields" :key="field.key" class="form-group">
                <label :for="field.key" class="block text-sm font-semibold text-gray-600">{{ field.label }}</label>
                <template v-if="field.type === 'textarea'">
                  <textarea :id="field.key" v-model="form[field.key]" rows="3"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </template>
                <template v-else-if="field.type === 'select'">
                  <select :id="field.key" v-model="form[field.key]"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
                      {{ opt.label }}
                    </option>
                  </select>
                </template>
                <template v-else>
                  <input :id="field.key" v-model="form[field.key]" :type="field.inputType || 'text'"
                    :disabled="field.key === 'email'"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                </template>
              </div>

              <!-- Kelola Skill -->
              <div>
                <h4 class="text-sm font-semibold text-gray-600">Kelola Skill</h4>

                <!-- Dropdown pilih skill -->
                <div class="mt-2 flex gap-3 items-center">
                  <select v-model="selectedSkillId"
                    class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                    <option disabled value="">Pilih skill...</option>
                    <option v-for="s in skillsOptions" :key="s.id" :value="s.id">
                      {{ s.name }}
                    </option>
                  </select>

                  <button @click.prevent="addSelectedSkill"
                    class="px-4 py-2 bg-indigo-700 text-white rounded-full hover:bg-indigo-800">
                    Tambah
                  </button>
                </div>

                <!-- Daftar skill user -->
                <div class="mt-3 flex flex-wrap gap-2">
                  <template v-if="profile.volunteer_skills?.length">
                    <span v-for="s in profile.volunteer_skills" :key="s.id"
                      class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                      <span>{{ s.name }}</span>
                      <button @click.prevent="removeSkillById(s.id)"
                        class="text-xs text-indigo-700 hover:text-indigo-900">
                        ✕
                      </button>
                    </span>
                  </template>

                  <span v-else class="text-gray-400 italic">Belum ada skill</span>
                </div>

              </div>

              <div class="flex justify-end gap-4">
                <button type="button" @click="cancelEdit"
                  class="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition duration-300">
                  Batal
                </button>
                <button type="submit"
                  class="px-6 py-2 bg-indigo-800 hover:bg-indigo-900 text-white font-bold rounded-full transition duration-300">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </transition>

      </div>

      <!-- Pop Up Foto -->
      <transition name="fade">
        <PhotoModal :visible="showPhotoPopup" :photoUrl="fullPhotoUrl" :previewImage="previewImage"
          @close="showPhotoPopup = false" @upload="triggerFileInput" @delete="deletePhoto" />
      </transition>

      <input type="file" ref="fileInput" @change="onFileChange" accept="image/jpeg,image/png,image/webp,image/jpg,image/gif"
        style="display: none" />

      <!-- Message Notification -->
      <transition name="slide-fade">
        <div v-if="message" :class="{
          'bg-green-500': messageType === 'success',
          'bg-red-500': messageType === 'error',
          'bg-indigo-500': messageType === 'info',
        }" class="fixed bottom-4 right-4 text-white px-6 py-3 rounded-md shadow-lg z-50">
          {{ message }}
        </div>
      </transition>

    </div>
    <div v-else class="flex items-center justify-center min-h-[400px]">
      <!-- Spinner Loading -->
      <Loader text="Memuat profil..." />
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.fade-slide-enter-active {
  transition: all 0.5s cubic-bezier(.55, 0, .1, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Menggunakan animasi fade yang sudah ada */
.button-fade-slide-enter-active,
.button-fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(.55, 0, .1, 1);
}

.button-fade-slide-enter-from,
.button-fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.button-fade-slide-enter-to,
.button-fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.profile-photo-container {
  margin-top: 70px;
  transition: margin 0.3s;
}

@media (min-width: 768px) {
  .profile-photo-container {
    margin-bottom: 0;
  }
}
</style>
