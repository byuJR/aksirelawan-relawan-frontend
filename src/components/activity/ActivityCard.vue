<script setup>
import { computed, defineProps } from 'vue'
import aksiImage from "../../assets/images/Aksi.png";

function onImgError(e) {
  e.target.src = aksiImage;
}

// Mendefinisikan props untuk menerima data activity
const props = defineProps({
  activity: {
    type: Object,
    required: true
  },
  openModal: {
    type: Function,
    required: true
  },
  cardClass: String
})

// Computed property for image with fallback
const imageUrl = computed(() => props.activity.image || aksiImage)

// Fungsi untuk menentukan class kategori berdasarkan nilai kategori
const getCategoryClass = (category) => {
  switch (category) {
    case 'Event': return 'bg-indigo-100 text-indigo-600'
    case 'Mitigasi Bencana': return 'bg-indigo-100 text-indigo-600'
    case 'Lingkungan': return 'bg-green-100 text-green-600'
    case 'Pendidikan': return 'bg-yellow-100 text-yellow-600'
    default: return 'bg-gray-100 text-gray-600'
  }
}
</script>

<template>
  <div :class="['action-card', cardClass]"
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer transform-gpu transition-transform duration-300 ease-in-out min-w-[340px] md:min-w-[280px] lg:min-w-[300px] w-full mx-auto hover:scale-[1.02] flex-shrink-0 snap-start max-w-96">

    <!-- Gambar -->
    <div class="h-44 overflow-hidden">
      <img :src="imageUrl" @error="onImgError" class="w-full h-full object-cover" :alt="activity.title" />
    </div>

    <!-- Konten -->
    <div class="p-5 flex flex-col">
      <!-- Kategori -->
      <!-- <div class="flex flex-wrap gap-2 mb-2">
        <span v-for="(category, index) in activity.categories" :key="index"
          class="px-2 py-0.5 text-xs rounded-full font-medium" :class="getCategoryClass(category)">
          {{ category }}
        </span>
      </div> -->

      <!-- Judul -->
      <h3 class="text-base font-semibold mb-1.5">{{ activity.title }}</h3>

      <!-- Organisasi -->
      <p class="text-gray-700 mb-2 text-xs">{{ activity.organization }}</p>

      <!-- Tanggal dan Lokasi -->
      <div class="space-y-1 text-gray-700 text-xs">
        <div class="flex items-center">
          <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>{{ activity.date }}</span>
        </div>
        <div class="flex items-center">
          <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <span>{{ activity.location }}</span>
        </div>
      </div>

      <!-- Tombol untuk Lihat Detail -->
      <button
        class="mt-6 w-full py-2 bg-indigo-900 text-white rounded-full hover:bg-indigo-800 transition-colors text-sm"
        @click="openModal(activity)">
        Lihat Detail
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add custom styles for your component */
.action-card {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.action-card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
