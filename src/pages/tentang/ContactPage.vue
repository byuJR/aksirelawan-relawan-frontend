<template>
  <div>

    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <h1 class="text-3xl font-bold text-center mb-8" style="color: #000000; mb-8">Kontak dengan Kami</h1>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label for="name" class="block text-gray-800 font-medium mb-2">Nama </label>
            <input id="name" v-model="form.name" type="text" required
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label for="email" class="block text-gray-800 font-medium mb-2">Alamat Email </label>
            <input id="email" v-model="form.email" type="email" required
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label for="subject" class="block text-gray-800 font-medium mb-2">Subjek </label>
            <input id="subject" v-model="form.subject" type="text" required
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label for="message" class="block text-gray-800 font-medium mb-2">Isi Pesan </label>
            <textarea id="message" v-model="form.message" rows="5" required
              class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
          </div>
          <div class="flex justify-end">
            <button type="submit"
              class="bg-indigo-900 text-white px-6 py-2 rounded-full hover:bg-indigo-800 transition-colors">
              Kirim
            </button>
          </div>
        </form>
      </div>

      <!-- Info Section -->
      <div class="bg-white p-6 rounded-lg shadow-md mt-8 flex justify-center">
        <div>
          <ul class="flex space-x-2 sm:justify-center text-gray-700 flex-col sm:flex-row w-full">
            <li class="flex items-center space-x-2 px-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-gray-700" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Volunteer Hub Magelang, Jl. Panglima Polim V No. 60, Magelang Utara 12160</span>
            </li>
            <li class="flex items-center space-x-2 px-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-gray-700" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="truncate">+62 1122 3341 40</span>
            </li>
            <li class="flex items-center space-x-2 px-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-gray-700" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
                <path d="M3 5h18a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2z" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <span class="truncate">kontak@aksirelawan.org</span>
            </li>
          </ul>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from '../../components/NavBar.vue';
import Footer from '../../components/Footer.vue';

// import pinIcon from '../../assets/images/icons/pin.png';
// import whatsappIcon from '../../assets/images/icons/whatsapp.png';
// import mailIcon from '../../assets/images/icons/mail.png';

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const submitForm = () => {
  alert(`Terima kasih, ${form.value.name}! Pesan Anda telah terkirim.`);
  form.value.name = '';
  form.value.email = '';
  form.value.subject = '';
  form.value.message = '';
};

const pageName = "ContactPage"
console.log(`${pageName} dimuat`)
</script>

<style scoped>
/* Add any additional styling if needed */
</style>
