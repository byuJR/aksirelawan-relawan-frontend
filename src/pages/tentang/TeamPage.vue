<template>
  <div>

    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <h1 class="text-3xl font-bold text-center mb-8" style="color: #000000;">Tim Aksi Relawan</h1>
      <div class="bg-white p-6 rounded-lg shadow-md space-y-6">
        <p class="text-gray-700 text-justify">
          Tim Aksi Relawan terdiri dari individu-individu berdedikasi yang berkomitmen untuk menjalankan berbagai
          kegiatan sosial dan kemanusiaan. Kami bekerja sama dengan komunitas dan organisasi untuk menciptakan dampak
          positif yang nyata di masyarakat.
        </p>
        <p class="text-gray-700 text-justify">
          Dengan semangat kolaborasi dan kepedulian, tim kami terus berupaya mengembangkan program-program yang inovatif
          dan berkelanjutan demi kesejahteraan bersama.
        </p>
        <div class="flex justify-center mt-6">
          <button @click="goToVisiMisi"
            class="px-4 py-2 bg-indigo-900 text-white rounded hover:bg-indigo-800 transition-colors">
            Baca Lebih Lanjut
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import NavBar from '../../components/NavBar.vue';
import Footer from '../../components/Footer.vue';

const pageName = "TeamPage"
console.log(`Halaman ${pageName} dimuat`)
</script>

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
