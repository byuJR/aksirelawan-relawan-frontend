<script setup>
import { ref } from 'vue'
import { supabase } from '../config/supabase'

const emit = defineEmits(['close', 'success'])

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

const closeModal = () => emit('close')
</script>

<template>
  <Transition name="modal-fade">
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop with blur -->
      <Transition name="backdrop-fade">
        <div class="fixed inset-0 bg-gradient-to-br from-black/60 via-indigo-900/40 to-black/60 backdrop-blur-sm" @click="closeModal"></div>
      </Transition>

      <!-- Modal content -->
      <div class="relative min-h-screen flex items-center justify-center p-4">
        <Transition name="slide-up">
          <div class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform">
            <!-- Close button with hover effect -->
            <button 
              @click="closeModal" 
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:rotate-90 hover:scale-110 group">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            <!-- Animated Logo -->
            <div class="flex justify-center mb-6">
              <div class="relative">
                <div class="absolute inset-0 bg-indigo-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <img src="../assets/images/icons/AksiRelawan.png" alt="Aksi Relawan Logo" class="relative h-20 w-20 animate-float" />
              </div>
            </div>

            <div v-if="!success">
              <!-- Title with gradient -->
              <h2 class="text-3xl font-bold text-center bg-gradient-to-r from-indigo-900 via-purple-700 to-indigo-900 bg-clip-text text-transparent mb-2">
                Lupa Password?
              </h2>
              <p class="text-center text-gray-600 mb-6 text-sm">
                Masukkan email Anda dan kami akan mengirimkan link untuk reset password
              </p>

              <form @submit.prevent="handleResetPassword" class="space-y-5">
                <div class="relative">
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    📧 Email
                  </label>
                  <div class="relative">
                    <input
                      id="email"
                      type="email"
                      v-model="email"
                      required
                      class="block w-full px-4 py-3 pl-4 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-indigo-300"
                      placeholder="email@contoh.com"
                    />
                  </div>
                </div>

                <div v-if="error" class="text-red-600 text-center text-sm py-3 px-4 bg-red-50 rounded-xl border border-red-200 animate-shake">
                  ⚠️ {{ error }}
                </div>

                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-2xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-indigo-900 to-indigo-700 hover:from-indigo-800 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>{{ loading ? 'Mengirim...' : '✉️ Kirim Link Reset' }}</span>
                </button>
              </form>
            </div>

            <!-- Success Message with animation -->
            <div v-else class="text-center">
              <div class="mb-6 relative">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-20 h-20 bg-green-100 rounded-full animate-ping"></div>
                </div>
                <svg class="relative mx-auto h-20 w-20 text-green-500 animate-bounce-once" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              
              <h3 class="text-2xl font-bold text-gray-800 mb-3">
                📬 Email Terkirim!
              </h3>
              
              <p class="text-gray-600 mb-2 text-sm leading-relaxed">
                Kami telah mengirimkan link reset password ke
              </p>
              <p class="text-indigo-900 font-semibold mb-4 break-all">
                {{ email }}
              </p>
              <p class="text-gray-500 text-xs mb-6">
                Silakan cek inbox atau folder spam Anda
              </p>

              <button
                @click="closeModal"
                class="w-full py-3 px-6 border border-transparent rounded-2xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-indigo-900 to-indigo-700 hover:from-indigo-800 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200 transform hover:scale-[1.02]"
              >
                ✓ Mengerti
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.backdrop-fade-enter-active,
.backdrop-fade-leave-active {
  transition: opacity 0.4s ease;
}

.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes bounce-once {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-bounce-once {
  animation: bounce-once 0.6s ease-out;
}

.animate-shake {
  animation: shake 0.3s ease-in-out;
}
</style>
