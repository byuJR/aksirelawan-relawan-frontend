<script setup>
defineProps({
  review: Object
})
</script>

<template>
  <div
    class="review-card border border-gray-300 rounded-2xl cursor-pointer bg-white text-black relative p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
    <!-- Image -->
    <img :src="review.image" :alt="review.title" class="w-16 h-16 object-contain mb-6" />

    <!-- Title -->
    <p class="font-bold text-lg mb-4 text-center tracking-wide text-black">
      {{ review.title }}
    </p>
    <hr class="border-t border-gray-700 w-16 mb-6" />
    <p class="text-base leading-relaxed text-justify text-inherit">
      {{ review.text }}
    </p>
  </div>
</template>

<style scoped>
.review-card {
  transform: translateY(0);
  will-change: transform, opacity, transform;
}

.review-card:hover {
  transform: scale(1.05) !important;
}
</style>
