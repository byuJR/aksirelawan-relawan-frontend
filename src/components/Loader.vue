<!-- Loader.vue -->
<template>
  <div class="flex flex-col items-center justify-center py-8">
    <svg class="animate-spin h-12 w-12 text-indigo-800 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
    <span class="text-indigo-800 font-semibold">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: 'Memuat...'
  }
})
</script>

<style scoped>
/* optional: bisa ditambahkan styling tambahan jika perlu */
</style>
