<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRouter } from 'vue-router'
import { categories } from '../../composables/useCategories.js'

import CategoryCard from './CategoryCard.vue'
import WaveBackground from './WaveBackground.vue'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter()
const sectionRef = ref(null)

const goToOrganisasi = (categoryTitle) => {
  const plain = categoryTitle.replace(/<br>/g, ' ').replace(/<\/?[^>]+(>|$)/g, '').trim()
  router.push({ name: 'cariOrganisasi', query: { kategori: plain } })
}

onMounted(() => {
  gsap.set('.section-title', { y: 50, opacity: 0 })
  gsap.set('.category-card', { y: 100, opacity: 0 })

  ScrollTrigger.create({
    trigger: '.section-title',
    start: 'top 80%',
    onEnter: () => {
      gsap.to('.section-title', { duration: 0.3, y: 0, opacity: 1 })
    },
  })

  ScrollTrigger.create({
    trigger: '.categories-container',
    start: 'top 70%',
    onEnter: () => {
      gsap.to('.category-card', {
        duration: 0.3,
        y: 0,
        opacity: 1,
        stagger: 0.1,
      })
    },
  })
})
</script>

<template>
  <section ref="sectionRef" class="mt-24 mb-16 py-12 px-8 category-section-bg relative overflow-hidden rounded-3xl">
    <h2
      class="section-title text-4xl font-bold mb-8 px-6 py-3 rounded-full bg-gradient-to-r from-white via-indigo-100 to-white backdrop-blur-sm text-center text-indigo-900 mx-auto">
      Kategori Kegiatan
    </h2>

    <WaveBackground />

    <div class="px-2 relative z-10">
      <div class="flex justify-center flex-wrap gap-8 categories-container overflow-hidden"
        style="scrollbar-width: none; -ms-overflow-style: none;">
        <CategoryCard v-for="(category, index) in categories" :key="category.id" :category="category" :index="index"
          @lihat="goToOrganisasi" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.category-section-bg {
  background: linear-gradient(135deg, #134e4a 0%, #4f46e5 50%, #312e81 100%);
  background-size: 200% 200%;
  animation: gradientShift 10s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
</style>
