<script setup>
import { useRouter } from 'vue-router';
import Aksi2 from '../../assets/images/Aksi2.png';
import Aksi3 from '../../assets/images/Aksi3.jpg';
import Aksi4 from '../../assets/images/Aksi4.jpg';

const router = useRouter();

const pageName = "VisiMisiPage"
console.log(`Halaman ${pageName} dimuat`)

function handleClick() {
  // Navigasi ke halaman organisasi tanpa reload
  router.push('/organisasi');
}
</script>
<template>
  <div>
    <div class="container mx-auto px-4 py-8 max-w-4xl space-y-8">
      <h1 class="text-3xl font-bold text-center mb-8" style="color: #000000;">Visi Misi & Program</h1>

      <section class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4 text-center" style="color: #000000;">Visi</h2>
        <img :src="Aksi2" alt="Visi" class="mb-4 rounded-lg shadow-md w-full h-64 object-cover" />
        <p class="text-center">
          Menjadi platform terdepan yang mempertemukan relawan dengan berbagai kesempatan aksi sosial di seluruh
          Indonesia, serta mendorong terciptanya perubahan positif dan berkelanjutan bagi masyarakat dan lingkungan.
        </p>
      </section>

      <section class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4 text-center" style="color: #000000;">Misi</h2>
        <img :src="Aksi3" alt="Misi" class="mb-4 rounded-lg shadow-md w-full h-64 object-cover" />
        <ul class="list-disc list-inside mb-4 text-left space-y-2">
          <li>Menginspirasi lebih banyak orang untuk terlibat dalam aksi relawan melalui penyediaan informasi yang mudah
            diakses.</li>
          <li>Lebih banyak orang untuk terlibat dalam aksi relawan melalui penyediaan informasi yang mudah diakses.</li>
          <li>Menyediakan akses yang transparan dan efisien bagi relawan untuk menemukan kegiatan sosial yang sesuai
            dengan minat dan kemampuan mereka.</li>
          <li>Mendukung organisasi sosial dan komunitas dalam mencari, mengelola, serta memberdayakan relawan dengan
            lebih efektif.</li>
          <li>Membangun jaringan kolaboratif antara berbagai pihak yang memiliki tujuan yang sama dalam menciptakan
            dampak sosial yang positif.</li>
          <li>Mengedukasi masyarakat mengenai pentingnya berpartisipasi dalam aksi sosial dan keberlanjutan lingkungan.
          </li>
        </ul>
      </section>

      <section class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4 text-center" style="color: #000000;">Program Aksi Relawan</h2>
        <img :src="Aksi4" alt="Program" class="mb-4 rounded-lg shadow-md w-full h-64 object-cover" />
        <ul class="list-disc list-inside mb-4 text-left space-y-2">
          <p>
            Kami memiliki berbagai program yang dapat diikuti oleh relawan dan organisasi sosial, antara lain:
          </p>
          <li>Mitigasi Bencana & Lingkungan: Mengajak relawan untuk terlibat dalam kegiatan penanganan bencana alam,
            pemulihan lingkungan, penanaman pohon, pengelolaan sampah, dan kampanye sadar lingkungan.</li>
          <li>Pendidikan & Seni Budaya: Membantu peningkatan kualitas pendidikan bagi anak-anak yang membutuhkan melalui
            kegiatan mengajar, penyediaan buku, pelatihan keterampilan, serta mendukung pelestarian seni dan budaya
            lokal.</li>
          <li>Sosial & Kemanusiaan: Menyediakan bantuan dalam situasi darurat seperti bencana alam, mendukung
            pemberdayaan masyarakat kurang mampu, serta kegiatan sosial lainnya yang berfokus pada kesejahteraan
            masyarakat.</li>
          <li>Kesehatan: Berkontribusi dalam program kesehatan masyarakat seperti donor darah, edukasi kesehatan,
            pelayanan kesehatan gratis bagi masyarakat terpencil, serta penyuluhan mengenai pentingnya pola hidup
            sehat.:</li>
        </ul>
        <div class="flex justify-center">
          <button @click.prevent="handleClick"
            class="px-6 py-3 bg-indigo-900 text-white rounded-full hover:bg-indigo-800 transition-colors">
            Cari Organisasi
          </button>
        </div>
      </section>
    </div>

  </div>
</template>

<style scoped>
/* .container {
  font-family: Arial, sans-serif;
} */
</style>
