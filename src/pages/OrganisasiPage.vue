<script setup>
import OrganizationDetailModal from '../components/organisasi/OrganizationDetailModal.vue'
import Loader from '../components/Loader.vue'
import { useOrganizations } from '../composables/useOrganizations.js'

const {
  organizations,
  loading,
  localSearchInput,
  searchQuery,
  showAll,
  showModal,
  selectedOrganization,
  displayedOrganizations,
  filteredOrganizations,
  applySearch,
  openModal,
  closeModal,
} = useOrganizations()
</script>
<template>
  <div>
    <div class="container mx-auto py-16 px-4">
      <h1 class="text-3xl font-bold mb-4 text-center" style="color: #000000;">Cari Organisasi</h1>
      <p class="mb-8">Jelajahi berbagai organisasi yang membuka kesempatan bagi relawan untuk terlibat dalam
        program-program mereka. Dapatkan informasi mengenai visi, misi, dan fokus kegiatan dari setiap organisasi.
        Dengan bergabung bersama organisasi yang sejalan dengan nilai Anda, peran relawan dapat dijalankan secara lebih
        bermakna dan berkelanjutan.</p>
      <div class="max-w-4xl mx-auto mb-12 px-4">
        <form @submit.prevent="applySearch"
          class="flex flex-nowrap bg-white rounded-full p-2 gap-3 items-center w-full sm:w-3/4 lg:w-1/2 mx-auto duration-300 search-bar hover:cursor-text ease-in-out">
          <input v-model="localSearchInput" type="text" placeholder="Cari organisasi..."
            class="flex-row w-full px-4 py-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 text-sm" />
          <button type="submit"
            class="px-4 py-2 sm:px-6 bg-indigo-900 text-white font-medium rounded-full hover:bg-indigo-800 transition-colors text-sm w-fit">
            <span class="flex items-center justify-center w-fit">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span class="hidden sm:block">
                Cari
              </span>
            </span>
          </button>
        </form>
      </div>

      <div v-if="loading" class="text-center">
        <Loader />
      </div>
      <div v-if="!loading && organizations.length === 0" class="text-center">No organizations found.</div>
      <div v-if="!loading && organizations.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="org in displayedOrganizations" :key="org.id"
          class="bg-white border rounded p-4 flex flex-col items-center space-y-4 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
          @click="openModal(org)">
          <img :src="org.image" alt="Organization Logo"
            class="w-16 h-16 object-contain mb-2 bg-indigo-200 rounded-full" />
          <div>
            <h2 class="font-bold text-black">{{ org.name }}</h2>
            <p class="text-sm">{{ org.category }}</p>
            <p>Email: {{ org.email }}</p>
            <p>No Telepon: {{ org.phone }}</p>
          </div>
        </div>
        <div v-if="filteredOrganizations.length > 1" class="col-span-full text-center">
          <button
            class="show-all-button inline-flex items-center justify-center py-2 px-4 text-base h-auto w-auto text-indigo-900 hover:text-indigo-600 hover:scale-105 bg-none border-none cursor-pointer duration-300 ease-out whitespace-nowrap rounded-lg after:content-none"
            @click="showAll = !showAll">
            {{ showAll ? 'Show Less' : 'Show All' }}
          </button>
        </div>
      </div>
    </div>

    <OrganizationDetailModal v-if="showModal" :organization="selectedOrganization" @close="closeModal" />
  </div>
</template>

<style scoped>
.search-bar:hover {
  box-shadow: 0 0 10px rgba(37, 99, 235, 0.6);
}
</style>
