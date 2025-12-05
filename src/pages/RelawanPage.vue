<script setup>
import { onMounted, ref } from 'vue'
import { useVolunteer } from '../composables/useVolunteer'
import Loader from '../components/Loader.vue'

const { volunteers, loading, error, fetchVolunteers } = useVolunteer()

// Lifecycle
onMounted(async () => {
  await fetchVolunteers()
})

const defaultUserIcon = new URL('../assets/images/icons/iconuser.png', import.meta.url).href
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <h1 class="text-4xl font-bold text-center mb-12 text-black">Data Relawan</h1>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-[400px]">
      <Loader />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-red-500 text-center bg-red-50 p-4 rounded-lg">
      {{ error }}
    </div>

    <!-- Volunteer Cards Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="volunteer in volunteers" :key="volunteer.id"
        class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200">
        <!-- Card Header -->
        <div class="bg-gradient-to-r from-indigo-600 to-indigo-800 h-2"></div>

        <!-- Card Body -->
        <div class="p-6">
          <!-- Profile Picture Placeholder -->
          <div class="flex justify-center mb-4">
            <div
              class="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-2 border-indigo-300">
              <img v-if="volunteer.photo_url" :src="volunteer.photo_url" alt="Foto"
                class="w-full h-full object-cover" />
              <img v-else :src="defaultUserIcon" alt="Default Icon" class="w-12 h-12" />
            </div>
          </div>

          <!-- Name -->
          <h3 class="text-xl font-bold text-center text-gray-800 mb-1">
            {{ volunteer.name || 'Nama Belum Diisi' }}
          </h3>

          <!-- Volunteer ID -->
          <p class="text-xs text-gray-500 text-center mb-4">ID: {{ volunteer.id }}</p>

          <!-- Info Fields -->
          <div class="space-y-3 mb-4 text-sm">
            <!-- Email -->
            <div class="flex items-start gap-2">
              <span class="font-semibold text-gray-600 min-w-fit">Email:</span>
              <span class="text-gray-700">{{ volunteer.email || '-' }}</span>
            </div>

            <!-- Phone -->
            <div class="flex items-start gap-2">
              <span class="font-semibold text-gray-600 min-w-fit">Telp:</span>
              <span class="text-gray-700">{{ volunteer.phone || '-' }}</span>
            </div>

            <!-- Address -->
            <div class="flex items-start gap-2">
              <span class="font-semibold text-gray-600 min-w-fit">Alamat:</span>
              <span class="text-gray-700 line-clamp-2">{{ volunteer.address || '-' }}</span>
            </div>

            <!-- Joined Date -->
            <div class="flex items-start gap-2">
              <span class="font-semibold text-gray-600 min-w-fit">Bergabung:</span>
              <span class="text-gray-700 text-xs">
                {{ new Date(volunteer.created_at).toLocaleDateString('id-ID') }}
              </span>
            </div>
          </div>

          <!-- Skills Section -->
          <div class="border-t border-gray-200 pt-4">
            <p class="text-xs font-semibold text-gray-600 mb-2">Keahlian</p>
            <div class="flex flex-wrap gap-2">
              <template v-if="volunteer.volunteer_skills && volunteer.volunteer_skills.length">
                <span v-for="skill in volunteer.volunteer_skills" :key="skill.id"
                  class="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">
                  {{ skill.name }}
                </span>
              </template>
              <span v-else class="text-gray-400 italic text-xs">Belum ada keahlian</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && !error && volunteers.length === 0" class="text-center py-12 text-gray-500">
      <p class="text-lg">Tidak ada data relawan</p>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
