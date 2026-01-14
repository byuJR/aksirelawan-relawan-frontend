<script setup>
import { ref } from 'vue'
import { supabase } from '../config/supabase'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const handleResetPassword = async () => {
  if (!email.value) {
    error.value = 'Email harus diisi'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${window.location.origin}/reset-password`
    })

    if (resetError) throw resetError

    success.value = true
  } catch (err) {
    error.value = err.message || 'Gagal mengirim email reset password'
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
      <!-- Logo -->
      <div class="flex justify-center mb-6">
        <img src="../assets/images/icons/AksiRelawan.png" alt="Aksi Relawan Logo" class="h-16 w-16" />
      </div>

      <div v-if="!success">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">
          Lupa Password?
        </h2>
        <p class="text-center text-gray-600 mb-6 text-sm">
          Masukkan email Anda dan kami akan mengirimkan link untuk reset password
        </p>

        <form @submit.prevent="handleResetPassword" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              v-model="email"
              required
              class="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-700 focus:border-indigo-700 transition-all"
              placeholder="email@contoh.com"
            />
          </div>

          <div v-if="error" class="text-red-600 text-center text-sm py-2 px-3 bg-red-100 rounded-xl">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-3xl shadow-lg text-base font-semibold text-white bg-indigo-900 hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-900 transition-colors disabled:opacity-50"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>{{ loading ? 'Mengirim...' : 'Kirim Link Reset' }}</span>
          </button>

          <div class="text-center mt-4">
            <a href="#" @click.prevent="goBack" class="text-sm text-indigo-900 hover:text-indigo-800 font-medium">
              Kembali ke Login
            </a>
          </div>
        </form>
      </div>

      <!-- Success Message -->
      <div v-else class="text-center">
        <div class="mb-6">
          <svg class="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        
        <h3 class="text-xl font-bold text-gray-800 mb-3">
          Email Terkirim!
        </h3>
        
        <p class="text-gray-600 mb-6">
          Kami telah mengirimkan link reset password ke <strong>{{ email }}</strong>. 
          Silakan cek inbox atau folder spam Anda.
        </p>

        <button
          @click="goBack"
          class="w-full py-3 px-6 border border-transparent rounded-3xl shadow-lg text-base font-semibold text-white bg-indigo-900 hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-900 transition-colors"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  </div>
</template>
