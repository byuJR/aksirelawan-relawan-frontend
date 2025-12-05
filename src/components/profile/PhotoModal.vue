<script setup>
import { ref } from "vue";
import defaultUserIcon from "../../assets/images/icons/iconuser.png";

const props = defineProps({
  visible: Boolean,
  photoUrl: String,
  previewImage: String
});

const emit = defineEmits(["close", "upload", "delete"]);

const triggerUpload = () => emit("upload");
const deletePhoto = () => emit("delete");
const closePopup = () => emit("close");
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="closePopup">
    <div class="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center gap-4">
      <img :src="previewImage || photoUrl || defaultUserIcon" alt="Foto Profil Besar"
        class="w-64 h-64 rounded-full object-cover border-4 border-indigo-500" />
      <div class="flex justify-center gap-4">
        <button @click="triggerUpload"
          class="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full transition duration-300">
          Unggah Foto
        </button>

        <button @click="deletePhoto"
          class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition duration-300">
          Hapus Foto
        </button>

        <button @click="closePopup"
          class="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition duration-300">
          Batal
        </button>
      </div>
    </div>
  </div>
</template>
