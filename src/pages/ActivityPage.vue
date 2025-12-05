<script setup>
import { useActivities } from '../composables/useActivities.js';
import ActivityDetailModal from '../components/activity/ActivityDetailModal.vue';
import ActivityCard from '../components/activity/ActivityCard.vue';
import SearchIcon from '../components/icons/SearchIcon.vue';
import Loader from '../components/Loader.vue';

const {
  activities,
  filteredActivities,
  displayedActivities,
  applySearch,
  openModal,
  closeModal,
  selectedActivity,
  showModalActivity,
  localSearchInput,
  localLocationInput,
  searchQuery,
  locationQuery,
  showAll,
  loading,
  error,
} = useActivities();
</script>

<template>
  <!-- Container for the activities -->
  <div class="container mx-auto px-4 py-16">
    <!-- Header Section -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-4 text-center text-black">Cari Aktivitas</h1>
      <p class="mb-8">Temukan berbagai aktivitas relawan yang sesuai dengan minat, waktu luang, dan lokasi Anda.
        Gunakan fitur pencarian dan filter untuk menelusuri kegiatan sosial, lingkungan, pendidikan, hingga
        kemanusiaan. Pilih aktivitas yang paling relevan, dan berkontribusilah secara langsung untuk menciptakan
        perubahan positif di masyarakat.</p>
    </div>

    <!-- Search Form -->
    <div class="max-w-4xl mx-auto mb-12">
      <form @submit.prevent="applySearch"
        class="flex bg-white rounded-3xl sm:rounded-full flex-col sm:flex-row w-full shadow-sm p-2 gap-3 items-center sm:w-3/4 mx-auto h-full search-bar">
        <input v-model="localSearchInput" type="text" placeholder="Cari aktivitas..."
          class="w-full flex-grow px-4 py-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black text-sm" />
        <input v-model="localLocationInput" type="text" placeholder="Cari lokasi..."
          class="w-full flex-grow px-4 py-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black text-sm" />
        <!-- Search Button -->
        <button type="submit"
          class="px-6 py-2 bg-indigo-900 text-white font-medium rounded-full hover:bg-indigo-800 transition-colors text-sm w-full sm:w-auto flex items-center justify-center">
          <SearchIcon />
          <span>Cari</span>
        </button>
      </form>
    </div>

    <!-- Loading and Error States -->
    <div v-if="loading" class="text-center mb-8">
      <Loader />
    </div>
    <div v-if="error" class="text-center mb-8 text-red-600">
      <p>Error: {{ error }}</p>
    </div>

    <!-- Activities Grid -->
    <div class="w-full flex flex-col items-center" v-if="!loading && !error">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-fit justify-items-center">
        <div v-for="activity in displayedActivities" :key="activity.id">
          <ActivityCard :activity="activity" :openModal="openModal" />
        </div>
      </div>

      <!-- Show All Button -->
      <div class="text-center mt-6" v-if="!showAll && filteredActivities.length > 6">
        <button class="show-all-button" @click="showAll = true">Show All</button>
      </div>
      <div class="text-center mt-6" v-else-if="showAll">
        <button class="show-all-button" @click="showAll = false">Show Less</button>
      </div>
    </div>

  </div>
  <!-- Modal untuk Detail Aktivitas -->
  <ActivityDetailModal v-if="showModalActivity" :activity="selectedActivity" @close="closeModal" />
</template>


<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.show-all-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1;
  height: auto;
  width: auto;
  color: #1e3a8a;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  white-space: nowrap;
}

.show-all-button:hover {
  color: #2563eb;
  transform: scale(1.05);
}

.show-all-button::after {
  content: none;
}

.search-bar:hover {
  box-shadow: 0 0 10px rgba(37, 99, 235, 0.6);
  transition: box-shadow 0.3s ease-in-out;
  cursor: text;
}
</style>
