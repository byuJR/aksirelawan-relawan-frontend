<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { nextTick } from 'vue'
import IconCube from '../icons/IconCube.vue'
import IconPerson from '../icons/IconPerson.vue'
import IconHeart from '../icons/IconHeart.vue'
import IconGlobe from '../icons/IconGlobe.vue'
import IconGroup from '../icons/IconGroup.vue'
import IconOfficeBuilding from '../icons/IconOfficeBuilding.vue'
import IconPhone from '../icons/IconPhone.vue'
import IconMapPin from '../icons/IconMapPin.vue'
import IconBadge from '../icons/IconBadge.vue'
import IconStar from '../icons/IconStar.vue'
import IconPresentationChart from '../icons/IconPresentationChart.vue'
import IconCalendarCheck from '../icons/IconCalendarCheck.vue'
import IconGift from '../icons/IconGift.vue'
import ArrowLeftIcon from '../icons/ArrowLeftIcon.vue'
import ArrowRightIcon from '../icons/ArrowRightIcon.vue'
import ActivityCard from '../activity/ActivityCard.vue'
import ActivityDetailModal from '../activity/ActivityDetailModal.vue'
import { useActivities } from '../../composables/useActivities.js'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const {
  activities,
  filteredActivities,
  displayedActivities,
  applySearch,
  openModal,
  closeModal,
  selectedActivity,
  showModalActivity,
  localSearchInput,
  localLocationInput,
  searchQuery,
  locationQuery,
  showAll,
  loading,
  error,
} = useActivities();

const sectionRef = ref(null)
const actionsContainer = ref(null)
const titleRef = ref(null)

onMounted(async () => {
  await nextTick(); // Tunggu hingga DOM selesai dirender

  // Pastikan .action-card ada di DOM
  const actionCards = document.querySelectorAll('.action-card');
  if (actionCards.length === 0) {
    console.error('No .action-card elements found in DOM');
    return;
  }
  // Set initial state for section title
  gsap.set(titleRef.value, {
    y: 50,
    opacity: 0
  })

  // Create ScrollTrigger for section title with fade and slide animation
  ScrollTrigger.create({
    trigger: titleRef.value,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(titleRef.value, {
        duration: 0.3,
        y: 0,
        opacity: 1,
        ease: 'none'
      })
    }
  })

  setTimeout(() => {
    gsap.set('.action-card', { opacity: 0 });

    ScrollTrigger.create({
      trigger: '.actions-container',
      start: 'top 80%',
      onEnter: () => {
        gsap.to('.action-card', {
          duration: 0.5,
          opacity: 1,
          stagger: 0.05,
          ease: 'none'
        });
      }
    });
  }, 100);
  window.scrollTo(0, 0);
})

// Navigation functions
const scrollLeft = () => {
  const container = actionsContainer.value
  if (container) {
    const cardWidth = 300 // Width of each card + gap
    const scrollAmount = cardWidth

    gsap.to(container, {
      scrollLeft: container.scrollLeft - scrollAmount,
      duration: 0.5,
      ease: 'power2.out'
    })
  }
}

const scrollRight = () => {
  const container = actionsContainer.value
  if (container) {
    const cardWidth = 300 // Width of each card + gap
    const scrollAmount = cardWidth

    gsap.to(container, {
      scrollLeft: container.scrollLeft + scrollAmount,
      duration: 0.5,
      ease: 'power2.out'
    })
  }
}
</script>

<template>
  <div ref="sectionRef" class="relative overflow-hidden rounded-3xl py-2 px-4 my-16 bg-transparent z-0">
    <!-- Floating volunteer-related icons background -->
    <div
      class="floating-icons-background absolute top-0 left-0 w-full h-full pointer-events-none z-0 text-indigo-900 rounded-3xl overflow-hidden bg-white"
      aria-hidden="true">
      <IconCube />
      <IconPerson />
      <IconHeart />
      <IconGlobe />
      <IconGroup />
      <IconCalendarCheck />
      <IconOfficeBuilding />
      <IconPresentationChart />
      <IconStar />
      <IconGift />
      <IconBadge />
      <IconMapPin />
      <IconPhone />
    </div>

    <div class="container mx-auto py-10 relative z-10">
      <h2 ref="titleRef"
        class="text-4xl font-bold mb-8 px-6 py-3 rounded-full bg-white shadow-lg w-fit mx-auto mt-0 text-center text-black">
        Peluang Bagi Anda untuk Membantu
      </h2>
      <!-- Scrollable Container -->
      <div class="relative px-4 pt-3 pb-5">
        <!-- Navigation Buttons -->
        <button @click="scrollLeft"
          class="absolute -left-6 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 z-10 hover:scale-110"
          aria-label="Arrow Kiri">
          <ArrowLeftIcon />
        </button>

        <button @click="scrollRight"
          class="absolute -right-6 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 z-10 hover:scale-110"
          aria-label="Arrow Kanan">
          <ArrowRightIcon />
        </button>

        <!-- Hint for scrolling on mobile -->
        <div class="text-center text-gray-500 mb-4 md:hidden">
          <span>← Geser untuk melihat lebih banyak →</span>
        </div>

        <!-- Actions Container -->
        <div ref="actionsContainer" class="flex overflow-x-auto actions-container hide-scrollbar snap-x snap-mandatory">
          <!-- Action Cards -->
          <div class="flex space-x-6 flex-grow">
            <div v-for="activity in (filteredActivities ? filteredActivities.slice(0, 4) : [])" :key="activity.id">
              <ActivityCard :activity="activity" :openModal="openModal" cardClass="action-card" />
            </div>
          </div>
          <button @click="$router.push('/aktivitas')"
            class="inline-flex items-center justify-center py-2 px-4 text-base h-auto w-auto text-indigo-900 bg-none border-none cursor-pointer transition-all duration-300 ease-out whitespace-nowrap hover:text-indigo-800 hover:scale-105 after:content-none"
            aria-label="Show All">
            Show All
          </button>
        </div>
      </div>
    </div>
  </div>
  <ActivityDetailModal v-if="showModalActivity" :activity="selectedActivity" @close="closeModal" />
</template>

<style scoped>
h2 span {
  background-size: 200% auto;
  animation: shine 2s linear infinite;
}

/* Hide scrollbar but allow scrolling */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Ensure smooth scrolling with gestures */
.actions-container {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 0.5rem 1rem;
  /* Added horizontal padding to prevent clipping on hover */
  overflow-x: visible;
  /* Allow horizontal overflow visible to prevent clipping */
  overflow-y: hidden;
  /* Hide vertical overflow */
}

/* Media queries for responsive design */
@media (max-width: 1024px) {
  button {
    display: none;
  }
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}

.floating-icons-background .icon {
  position: absolute;
  opacity: 0.6;
  /* Slightly reduced opacity for subtle effect */
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  fill: none;
  /* Remove fill color */
  stroke: #1e3a8a;
  /* Set stroke color for border */
  stroke-width: 1.5;
  filter: drop-shadow(0 0 2px rgba(30, 58, 138, 0.3));
  /* Add subtle shadow for depth */
}

.floating-icons-background .icon-cube {
  width: 60px;
  height: 60px;
  top: 95%;
  left: 95%;
  animation-name: float1;
  animation-duration: 15s;
}

.floating-icons-background .icon-arrows {
  display: none;
}

.floating-icons-background .icon-person {
  width: 55px;
  height: 55px;
  top: 15%;
  left: 80%;
  animation-name: float3;
  animation-duration: 20s;
}

.floating-icons-background .icon-heart {
  width: 55px;
  height: 55px;
  top: 40%;
  left: 60%;
  animation-name: float1;
  animation-duration: 16s;
}

.floating-icons-background .icon-globe {
  width: 60px;
  height: 60px;
  top: 40%;
  left: 90%;
  animation-name: float2;
  animation-duration: 22s;
}

.floating-icons-background .icon-cube {
  width: 60px;
  height: 60px;
  top: 17%;
  left: 45%;
  animation-name: float1;
  animation-duration: 15s;
}

.floating-icons-background .icon-group {
  width: 60px;
  height: 60px;
  top: 70%;
  left: 25%;
  animation-name: float2;
  animation-duration: 18s;
}

.floating-icons-background .icon-calendar-check {
  width: 55px;
  height: 55px;
  top: 5%;
  left: 5%;
  animation-name: float3;
  animation-duration: 20s;
}

.floating-icons-background .icon-office-building {
  width: 50px;
  height: 50px;
  top: 89%;
  left: 7%;
  animation-name: float1;
  animation-duration: 16s;
}

.floating-icons-background .icon-presentation-chart {
  width: 55px;
  height: 55px;
  top: 5%;
  left: 90%;
  animation-name: float2;
  animation-duration: 20s;
}

.floating-icons-background .icon-star {
  width: 55px;
  height: 55px;
  top: 15%;
  left: 15%;
  animation-name: float3;
  animation-duration: 22s;
}

.floating-icons-background .icon-gift {
  width: 60px;
  height: 55px;
  top: 88%;
  left: 90%;
  animation-name: float1;
  animation-duration: 18s;
}

.floating-icons-background .icon-badge {
  width: 50px;
  height: 60px;
  top: 40%;
  left: 20%;
  animation-name: float2;
  animation-duration: 18s;
}

.floating-icons-background .icon-map-pin {
  width: 45px;
  height: 60px;
  top: 65%;
  left: 40%;
  animation-name: float3;
  animation-duration: 20s;
}

.floating-icons-background .icon-phone {
  width: 52px;
  height: 52px;
  top: 75%;
  left: 60%;
  animation-name: float3;
  animation-duration: 22s;
  stroke-width: 2.5;
}

@keyframes float1 {
  0% {
    transform: translateY(0) translateX(0);
  }

  50% {
    transform: translateY(-20px) translateX(15px);
  }

  100% {
    transform: translateY(0) translateX(0);
  }
}

@keyframes float2 {
  0% {
    transform: translateY(0) translateX(0);
  }

  50% {
    transform: translateY(15px) translateX(-10px);
  }

  100% {
    transform: translateY(0) translateX(0);
  }
}

@keyframes float3 {
  0% {
    transform: translateY(0) translateX(0);
  }

  50% {
    transform: translateY(-10px) translateX(-15px);
  }

  100% {
    transform: translateY(0) translateX(0);
  }
}
</style>
