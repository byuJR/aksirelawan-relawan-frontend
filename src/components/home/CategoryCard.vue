<script setup>
import { defineProps, defineEmits } from 'vue'

// Define props
const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true, // Receive the index prop from the parent
  }
})

// Define emits
const emit = defineEmits(['lihat'])

// Method to check if the index is even
const isEvenCategory = (index) => {
  return index % 2 === 0
}
</script>

<template>
  <div :class="[
    'relative rounded-xl overflow-hidden flex-shrink-0 group cursor-pointer category-card w-full hover:w-full sm:w-[220px] sm:hover:w-[320px] h-[350px] sm:h-[400px] transition-all duration-500 ease-out hover:z-10 hover:shadow-lg',
    // Add condition for right alignment on mobile for even-indexed elements
    { 'justify-end text-right sm:justify-normal sm:text-left': !isEvenCategory(index) }
  ]">
    <!-- Background -->
    <div class="absolute inset-0 z-0">
      <img :src="category.image" class="w-full h-full object-cover" alt="Category background" />
      <div class="absolute inset-0 opacity-80 transition-opacity duration-300" :class="`${category.color}`"></div>
    </div>

    <!-- Default State -->
    <div class="absolute inset-0 flex flex-col justify-between p-6 z-20">
      <div class="text-white font-bold text-2xl" v-html="category.title"></div>
      <div
        class="text-[5rem] font-extrabold text-transparent opacity-0 sm:opacity-70 number-outline sm:group-hover:opacity-0 transition-opacity duration-300">
        {{ category.number }}
      </div>
    </div>

    <!-- Hover State -->
    <div
      class="absolute justify-between inset-0 z-30 flex flex-col p-6 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform sm:translate-y-8 sm:group-hover:translate-y-0">
      <div>
        <div class="text-white font-bold text-2xl mb-4" v-html="category.title"></div>
        <p class="text-white text-sm mb-6 max-h-48 overflow-hidden">{{ category.description }}</p>
      </div>
      <div>
        <button :class="['mt-auto px-6 py-3 rounded-full font-bold self-start bg-gradient-to-r from-white via-indigo-100 to-white text-indigo-900 hover:from-indigo-100 hover:via-indigo-200 hover:to-indigo-100 transition-colors shadow-md',
          { 'justify-end text-right sm:justify-normal sm:text-left': !isEvenCategory(index) }]"
          @click="emit('lihat', category.title)">
          Lihat Organisasi
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.number-outline {
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
}
</style>
