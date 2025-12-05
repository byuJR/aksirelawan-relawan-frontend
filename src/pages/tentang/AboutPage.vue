<template>
  <div>

    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <h1 class="text-3xl font-bold text-center mb-8" style="color: #000000;">Aksi Relawan</h1>

      <div class="bg-white p-6 rounded-lg shadow-md space-y-6">
        <p class="text-justify text-gray-700">
          Aksi Relawan adalah sebuah platform digital yang dirancang untuk menghubungkan para relawan dengan berbagai
          kegiatan sosial di seluruh Indonesia. Kami hadir dengan tujuan untuk mempermudah setiap individu, komunitas,
          dan
          organisasi yang ingin berkontribusi secara nyata dalam berbagai aksi sosial yang berdampak positif bagi
          masyarakat
          dan lingkungan.
        </p>

        <p class="text-justify text-gray-700">
          Sebagai wadah yang menyatukan semangat kepedulian, Aksi Relawan percaya bahwa setiap orang memiliki potensi
          untuk membawa perubahan. Melalui platform ini, kami memberikan akses yang lebih luas dan transparan bagi siapa
          pun yang ingin mengambil peran dalam membantu sesama. Dengan dukungan teknologi, kami berupaya menciptakan
          untuk memfasilitasi mendukung kolaborasi antara relawan, komunitas, dan organisasi sosial untuk menciptakan
          perubahan
          yang lebih baik.
        </p>

        <div class="text-center">
          <router-link :to="{ name: 'visiMisiProgram' }" class="text-indigo-900 hover:text-indigo-700 underline">
            Baca Lebih Lanjut Mengenai Misi Kami
          </router-link>
        </div>

        <div class="mt-8">
          <img src="/src/assets/images/background.png" alt="Tim Aksi Relawan beraksi"
            class="w-full rounded-lg shadow-lg object-cover h-[400px]" />
          <div class="text-center mt-4">
            <router-link :to="{ name: 'timAksiRelawan' }" class="text-indigo-900 hover:text-indigo-700 underline">
              Kenali Lebih Dekat dengan Tim Aksi Relawan
            </router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import NavBar from '../../components/NavBar.vue';
import Footer from '../../components/Footer.vue';

const pageName = "AboutPage"
console.log(`${pageName} dimuat`)

</script>

<style scoped>
/* Jika diperlukan untuk styling tambahan */
</style>
