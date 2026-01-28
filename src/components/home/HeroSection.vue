<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import backgroundImage from '../../assets/images/background.png'
import FeatureCards from './FeatureCards.vue'
import OrganisasiIcon from '../icons/OrganisasiIcon.vue';
import AktivitasIcon from '../icons/AktivitasIcon.vue';

const infoItems = [
  { label: 'Organisasi', icon: OrganisasiIcon, to: '/organisasi' },
  { label: 'Aktivitas', icon: AktivitasIcon, to: '/aktivitas' },
]
const typingText = ref('')

onMounted(() => {
  gsap.from('.hero-title', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
  });
  gsap.from('.hero-description', {
    duration: 1,
    y: 30,
    opacity: 0,
    delay: 0.3,
    ease: 'power3.out'
  });
  gsap.from('.hero-button', {
    duration: 1,
    y: 20,
    opacity: 0,
    delay: 0.6,
    ease: 'power3.out'
  });
  // gsap.from('.hero-image', {
  //   duration: 1,
  //   x: 50,
  //   opacity: 0,
  //   delay: 0.9,
  //   ease: 'power3.out'
  // });

  const text = '"Saatnya Bertindak!"'
  let i = 0
  const typeWriter = () => {
    if (i < text.length) {
      typingText.value += text.charAt(i)
      i++
      setTimeout(typeWriter, 100)
    }
  }
  setTimeout(typeWriter, 1000)
});
</script>

<template>
  <div class="relative rounded-3xl overflow-hidden mx-4 mt-8 hero-container md:h-[80vh] h-[70vh]">
    <!-- Background with overlay -->
    <div class="absolute inset-0">
      <img :src="backgroundImage" fetchpriority="high" class="w-full h-full object-cover brightness-50"
        alt="Background" />
    </div>

    <!-- Content -->
    <div class="relative z-10 w-full flex flex-col items-center justify-center py-20 px-4">
      <!-- Main Heading -->
      <h1 class="md:text-[3.5rem] font-bold text-white text-center mb-6 hero-title text-[2.5rem] mt-8 sm:mt-4 md:mt-0">
        Mulai Aksi Kebaikanmu<br>Sekarang!
      </h1>

      <!-- Subheading -->
      <h2
        class="md:text-3xl font-[650] relative inline-block min-h-10 text-indigo-900 text-center mb-3 typing-text text-2xl">
        {{ typingText }}
      </h2>

      <!-- Description -->
      <p
        class="text-white font-semibold md:text-xl text-center my-0 mx-auto max-w-2xl mb-8 sm:mb-12 md:mb-16 hero-description text-base">
        Jangan cuma peduli, tunjukkan aksi nyata dengan<br>
        menjadi bagian dari perubahan!
      </p>

      <!-- Search Bar Group -->
      <div
        class="flex w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto mt-0 md:mt-8 mb-24 justify-center px-4 scale-100 lg:scale-110">
        <button @click="$router.push('/aktivitas')"
          class="px-4 py-2 bg-white text-indigo-900 rounded-full flex items-center hero-button shadow-md hover:bg-gray-100 transition-colors text-lg"
          aria-label="Cari Aktivitas">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p class="truncate w-fit max-w-72 sm:max-w-max">
            Temukan Tempat di Mana Kepedulian Anda Dibutuhkan
          </p>
        </button>
      </div>
    </div>
  </div>
  <FeatureCards :items="infoItems" />
</template>

<style scoped>
.hero-container>div:nth-child(2) {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.hero-title {
  text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.2);
  line-height: 1.1;
}

.typing-text {
  text-shadow:
    -1px -1px 0 #ffffff,
    1px -1px 0 #ffffff,
    -1px 1px 0 #ffffff,
    1px 1px 0 #ffffff,
    1px 1px 3px rgba(0, 0, 0, 0.3);
}

.hero-button {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-button:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  transform: scale(1.1) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.flex.w-full.max-w-xl.mx-auto.mt-8.mb-24.justify-center {
  transition: transform 0.3s ease;
}

/* Removed hover scale transform on parent container to avoid conflict */
/* .flex.w-full.max-w-xl.mx-auto.mt-8.mb-24.justify-center:hover {
  transform: scale(1.1);
} */
</style>
