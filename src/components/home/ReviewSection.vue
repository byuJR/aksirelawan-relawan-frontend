<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ReviewCard from './ReviewCard.vue'
import { reviews } from '../../composables/useReviews'

gsap.registerPlugin(ScrollTrigger)

const reviewsRef = ref(null)
const titleRef = ref(null)

onMounted(() => {
  // Title animation
  gsap.set(titleRef.value, { opacity: 0, y: 50 })
  ScrollTrigger.create({
    trigger: titleRef.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(titleRef.value, { duration: 0.3, y: 0, opacity: 1, ease: 'none' })
    }
  })

  // Reviews animation
  gsap.set('.review-card', { opacity: 0, y: 50 })
  ScrollTrigger.create({
    trigger: '.reviews-container',
    start: 'top 80%',
    onEnter: () => {
      gsap.to('.review-card', { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' })
    }
  })
})
</script>

<template>
  <section>
    <div
      class="review-section-bg p-12 before:content-none after:absolute after:bottom-[-1rem] after:left-0 after:w-full after:h-1 after:z-10 mb-16 relative bg-white overflow-hidden rounded-none transition-none">
      <h2 ref="titleRef" class="text-4xl font-bold mb-14 px-6 py-3 rounded-full bg-white"
        style="width: fit-content; margin-left: auto; margin-right: auto; text-align: center; color: black; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
        Review
      </h2>
      <div ref="reviewsRef" class="grid grid-cols-1 md:grid-cols-3 gap-8 reviews-container max-w-6xl mx-auto">
        <ReviewCard v-for="(review, index) in reviews" :key="index" :review="review" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.review-section-bg {
  animation: none;
}

.review-section-bg::after {
  content: "";
  background: repeating-linear-gradient(90deg,
      #1e3a8a,
      #1e3a8a 10px,
      #60a5fa 10px,
      #60a5fa 20px);
}
</style>
