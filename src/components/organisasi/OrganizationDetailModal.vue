<script setup>
defineProps({
  organization: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
      <button @click="$emit('close')" class="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        aria-label="Close modal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <img v-if="organization.image" :src="organization.image" alt="Organization Logo"
        class="w-32 h-32 object-contain rounded-md mx-auto mb-4" />
      <h2 class="text-2xl font-bold mb-2 text-center">{{ organization.name }}</h2>
      <p class="text-center text-gray-600 mb-4">{{ organization.category }}</p>
      <div class="text-gray-700 text-sm space-y-2">
        <p><strong>Email:</strong> {{ organization.email }}</p>
        <p><strong>No Telepon:</strong> {{ organization.phone }}</p>
      </div>
      <div class="flex items-center">
        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>{{ organization.address }}</span>
      </div>
      <p v-if="organization.description" class="text-gray-700 text-sm whitespace-pre-line">
        {{ organization.description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styling if needed */
</style>
