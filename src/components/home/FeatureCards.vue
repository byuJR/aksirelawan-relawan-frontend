<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="rounded-3xl overflow-hidden w-5/6 sm:max-w-md md:max-w-xl mx-auto -mt-24 relative z-20 shadow-lg">
    <div class="flex justify-around sm:justify-between items-center">
      <div v-for="(item, i) in items" :key="i"
        class="bg-white text-indigo-900 flex flex-col items-center cursor-pointer transition py-6 w-full hover:bg-gray-100 hover:text-indigo-950"
        @click="$router.push(item.to)">
        <div class="w-14 h-14 mb-2">
          <component :is="item.icon" />
        </div>
        <span class="font-medium">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* */
</style>
