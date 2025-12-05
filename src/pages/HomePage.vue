<script setup>
import { onMounted, ref } from 'vue';
import HeroSection from '../components/home/HeroSection.vue';
import CategorySection from '../components/home/CategorySection.vue';
import ActivitySection from '../components/home/ActivitySection.vue';
import ReviewSection from '../components/home/ReviewSection.vue';

// const healthStatus = ref('unknown')
// onMounted(async () => {
//   try {
//     const res = await fetch('http://localhost:3001/health')
//     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
//     const data = await res.json()
//     console.log('Backend health:', data)
//     healthStatus.value = data.message
//   } catch (err) {
//     console.error('Gagal memanggil /health:', err)
//     healthStatus.value = 'error'
//   }
// })
</script>

<template>
  <div class="container mx-auto">
    <HeroSection />
    <CategorySection />
    <ActivitySection />
    <ReviewSection />
  </div>
</template>
