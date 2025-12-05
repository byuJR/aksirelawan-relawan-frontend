<template>
  <div>

    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <h1 class="text-3xl font-bold text-center mb-8">Donasi</h1>

      <div class="bg-white p-6 rounded-lg shadow-md space-y-6 mb-12">
        <p class="text-gray-700 text-justify">
          Selain berperan sebagai relawan, Anda juga dapat mendukung program-program kami melalui donasi. Setiap
          kontribusi yang Anda berikan akan digunakan sepenuhnya untuk mendukung berbagai kegiatan sosial, termasuk
          penanggulangan bencana, pendidikan, kesehatan, dan pemberdayaan masyarakat. Dengan menjadi donatur, Anda
          membantu memperbesar dampak positif yang kami ciptakan serta memungkinkan lebih banyak aksi nyata untuk mereka
          yang membutuhkan.
        </p>

        <div class="flex justify-center">
          <button @click="goToDonasiSekarang"
            class="bg-indigo-900 text-white px-6 py-3 rounded-full font-semi hover:bg-indigo-800 transition-colors">
            Donasi Sekarang
          </button>
        </div>
        <div class="mt-6"></div>

        <div class="mt-12">
          <img src="/src/assets/images/Aksi3.jpg" alt="Donasi Aksi Relawan"
            class="w-full rounded-lg shadow-lg object-cover h-[400px]" />
        </div>
      </div>

      <!-- Impact Section -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-12">
        <h2 class="text-2xl font-semibold mb-6 text-center">Kami Telah Memberikan Dampak kepada :</h2>
        <div class="flex justify-center gap-6 text-center flex-col sm:flex-row">
          <div class="w-full sm-w-fit border border-gray-300 rounded-lg p-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-900" fill="currentColor"
              viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M6 20c0-3.31 5.33-5 6-5s6 1.69 6 5v1H6v-1z" />
            </svg>
            <div>
              <div class="text-4xl font-bold text-indigo-900">12.567</div>
              <div class="text-lg text-gray-700">Relawan</div>
            </div>
          </div>
          <div class="w-full sm-w-fit border border-gray-300 rounded-lg p-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-900" fill="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            <div>
              <div class="text-4xl font-bold text-indigo-900">5.220</div>
              <div class="text-lg text-gray-700">Organisasi</div>
            </div>
          </div>
          <div class="w-full sm-w-fit border border-gray-300 rounded-lg p-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-900" fill="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
            <div>
              <div class="text-4xl font-bold text-indigo-900">2.590</div>
              <div class="text-lg text-gray-700">Kegiatan</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Donatur Section -->
      <div class="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 class="text-2xl font-semibold mb-6 text-center">Donatur Aksi Relawan</h2>
        <p class="text-center text-gray-700 mb-6">Terima kasih kepada semua donatur yang telah berkontribusi dalam
          mendukung kegiatan kami.</p>
        <div class="flex justify-center space-x-12">
          <div class="border border-gray-300 rounded-lg p-4 flex items-center justify-center">
            <img src="/src/assets/images/Djarum.png" alt="Djarum" class="h-20 object-contain" />
          </div>
          <div class="border border-gray-300 rounded-lg p-4 flex items-center justify-center">
            <img src="/src/assets/images/Indika.png" alt="Indika" class="h-20 object-contain" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import NavBar from '../../../components/NavBar.vue';
import Footer from '../../../components/Footer.vue';

const router = useRouter();
const pageName = "DonasiPage"

console.log(`${pageName} dimuat`)


function goToDonasiSekarang() {
  router.push('/tentang/donasi/donasi-sekarang');
}
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
