<script setup>
import { ref } from 'vue'
import BackgroundEffect from '../components/BackgroundEffect.vue'

const teamMembers = [
  {
    name: 'Mahardika Bayu Rahmadi',
    role: 'Founder & Lead Developer',
    description: 'Visioner di balik Aksi Relawan, memimpin pengembangan platform dan merancang arsitektur sistem.',
    image: null,
    social: {
      github: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Muhammad Surya Saputro',
    role: 'Full Stack Developer',
    description: 'Ahli dalam pengembangan backend dan integrasi sistem, memastikan platform berjalan dengan optimal.',
    image: null,
    social: {
      github: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Amanda Diva Oktaviani',
    role: 'UI/UX Designer',
    description: 'Merancang pengalaman pengguna yang intuitif dan desain antarmuka yang menarik untuk platform.',
    image: null,
    social: {
      github: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Vaniamelia',
    role: 'Frontend Developer',
    description: 'Mengimplementasikan desain menjadi kode dan menciptakan pengalaman interaktif yang responsif.',
    image: null,
    social: {
      github: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Muhamad Safiul Rifki',
    role: 'Backend Developer',
    description: 'Mengembangkan API dan logika bisnis untuk mendukung fitur-fitur platform Aksi Relawan.',
    image: null,
    social: {
      github: '#',
      linkedin: '#'
    }
  },
  {
    name: 'Dika Elsaputra',
    role: 'DevOps Engineer',
    description: 'Mengelola infrastruktur dan deployment, memastikan platform selalu up dan berjalan dengan baik.',
    image: null,
    social: {
      github: '#',
      linkedin: '#'
    }
  }
]
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="relative overflow-hidden min-h-screen">
      <BackgroundEffect />

      <div class="container mx-auto px-4 py-16 relative z-10">
      <!-- Header Section -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">Tim Aksi Relawan</h1>
        <div class="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Kenali orang-orang hebat di balik Aksi Relawan yang berdedikasi untuk membangun platform 
          yang menghubungkan relawan dengan organisasi sosial di seluruh Indonesia.
        </p>
      </div>

      <!-- Mission Statement -->
      <div class="bg-indigo-900 text-white rounded-2xl p-8 mb-16 shadow-xl">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold mb-4">Visi Kami</h2>
          <p class="text-lg leading-relaxed">
            Membangun ekosistem digital yang memberdayakan gerakan sosial di Indonesia melalui teknologi. 
            Kami percaya bahwa setiap orang memiliki potensi untuk membuat perubahan positif, dan platform 
            kami hadir untuk memfasilitasi kolaborasi antara relawan dan organisasi dalam menciptakan 
            dampak yang lebih besar bagi masyarakat.
          </p>
        </div>
      </div>

      <!-- Team Members Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div
          v-for="member in teamMembers"
          :key="member.name"
          class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
        >
          <!-- Avatar -->
          <div class="bg-gradient-to-br from-indigo-800 to-indigo-900 h-48 flex items-center justify-center relative overflow-hidden">
            <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div class="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-xl z-10">
              <span class="text-5xl font-bold text-indigo-900">
                {{ member.name.charAt(0) }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ member.name }}</h3>
            <div class="inline-block bg-indigo-100 text-indigo-900 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {{ member.role }}
            </div>
            <p class="text-gray-600 leading-relaxed mb-4">
              {{ member.description }}
            </p>

            <!-- Social Links -->
            <div class="flex space-x-3 pt-4 border-t border-gray-200">
              <a
                :href="member.social.github"
                class="w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-900 hover:text-white flex items-center justify-center transition-colors duration-300"
                target="_blank"
              >
                <i class="fab fa-github text-lg"></i>
              </a>
              <a
                :href="member.social.linkedin"
                class="w-10 h-10 rounded-full bg-gray-100 hover:bg-indigo-900 hover:text-white flex items-center justify-center transition-colors duration-300"
                target="_blank"
              >
                <i class="fab fa-linkedin-in text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-indigo-800 to-indigo-900 rounded-2xl p-12 text-center text-white shadow-2xl">
        <h2 class="text-4xl font-bold mb-4">Ingin Bergabung dengan Kami?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Kami selalu terbuka untuk kolaborasi dengan individu yang passionate dalam membuat dampak sosial positif.
        </p>
        <a
          href="mailto:aksi.relawan@aksirelawan.web.id"
          class="inline-block bg-white text-indigo-900 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Hubungi Kami
        </a>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
/* Card animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container > div {
  animation: fadeInUp 0.6s ease-out;
}

/* Override BackgroundEffect to use absolute positioning */
:deep(.background-effect) {
  position: absolute;
  height: 100%;
}
</style>
