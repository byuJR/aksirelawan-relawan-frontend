<script setup>
import { ref } from "vue"

const props = defineProps({
  loading: Boolean,
  error: String
})

const emit = defineEmits(["submit"])

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
})

const submitForm = () => {
  emit("submit", { ...form.value })
}
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-6">

    <div>
      <label class="block text-sm font-semibold text-gray-800 mb-2">Nama Lengkap</label>
      <input type="text" v-model="form.name" required class="mt-1 block w-full px-5 py-3 border border-black rounded-3xl shadow-md focus:outline-none
        focus:ring-4 focus:ring-indigo-700 focus:border-indigo-700 transition-all" placeholder="Nama Anda" />
    </div>

    <div>
      <label class="block text-sm font-semibold text-gray-800 mb-2">Email</label>
      <input type="email" v-model="form.email" required class="mt-1 block w-full px-5 py-3 border border-black rounded-3xl shadow-md focus:outline-none
        focus:ring-4 focus:ring-indigo-700 focus:border-indigo-700 transition-all" placeholder="email@contoh.com" />
    </div>

    <div>
      <label class="block text-sm font-semibold text-gray-800 mb-2">Password</label>
      <input type="password" v-model="form.password" required class="mt-1 block w-full px-5 py-3 border border-black rounded-3xl shadow-md focus:outline-none
        focus:ring-4 focus:ring-indigo-700 focus:border-indigo-700 transition-all" placeholder="••••••••" />
    </div>

    <div>
      <label class="block text-sm font-semibold text-gray-800 mb-2">Konfirmasi Password</label>
      <input type="password" v-model="form.password_confirmation" required class="mt-1 block w-full px-5 py-3 border border-black rounded-3xl shadow-md focus:outline-none
        focus:ring-4 focus:ring-indigo-700 focus:border-indigo-700 transition-all" placeholder="••••••••" />
    </div>

    <div class="pt-3">
      <button type="submit" :disabled="loading" class="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-3xl shadow-lg
        text-base font-semibold text-white bg-indigo-900 hover:bg-indigo-800 focus:outline-none focus:ring-4
        focus:ring-offset-2 focus:ring-indigo-900 transition-colors">

        <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>

        <span>{{ loading ? "Memproses..." : "Daftar Sekarang" }}</span>
      </button>
    </div>

    <div v-if="error" class="text-red-600 text-center text-sm py-2 px-3 bg-red-100 rounded-xl">
      {{ error }}
    </div>

  </form>
</template>
