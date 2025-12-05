<script setup>
import aksiImage from "../../assets/images/Aksi.png";

defineProps({
  activity: {
    type: Object,
    required: true
  }
});

function onImgError(e) {
  e.target.src = aksiImage;
}
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">

      <!-- Tombol close -->
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        aria-label="Close modal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Gambar -->
      <img :src="activity.image" @error="onImgError" :alt="activity.title"
        class="w-full h-48 object-cover rounded-md mb-4" />

      <!-- Judul -->
      <h2 class="text-2xl font-bold mb-1">{{ activity.title }}</h2>

      <!-- Organisasi -->
      <p class="text-sm text-gray-600 mb-3">
        {{ activity.organization || "Organisasi" }}
      </p>

      <!-- Kategori -->
      <div v-if="activity.categories?.length" class="flex flex-wrap gap-2 mb-4">
        <span v-for="(category, index) in activity.categories" :key="index"
          class="px-2 py-1 text-xs rounded-full font-medium" :class="category === 'Event' ? 'bg-indigo-100 text-indigo-600' :
            category === 'Mitigasi Bencana' ? 'bg-red-100 text-red-600' :
              category === 'Lingkungan' ? 'bg-green-100 text-green-600' :
                category === 'Pendidikan' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-gray-100 text-gray-600'
            ">
          {{ category }}
        </span>
      </div>

      <!-- Detail Informasi -->
      <div class="text-gray-700 text-sm space-y-2 mb-4">

        <!-- Tanggal -->
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>{{ activity.start_date }} → {{ activity.end_date }}</span>
        </div>

        <!-- Lokasi -->
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <span>{{ activity.location }}</span>
        </div>

        <!-- Status -->
        <div>
          <strong>Status:&nbsp;</strong>
          <span class="capitalize">{{ activity.status }}</span>
        </div>

        <!-- Peserta -->
        <div>
          <strong>Peserta:</strong>
          {{ activity.current_participants }} / {{ activity.max_participants }}
        </div>

        <!-- Dibuat pada -->
        <div v-if="activity.created_at">
          <strong>Dibuat:</strong> {{ activity.created_at.split("T")[0] }}
        </div>
      </div>

      <!-- Deskripsi -->
      <p v-if="activity.description" class="text-gray-700 text-sm whitespace-pre-line">
        {{ activity.description }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
