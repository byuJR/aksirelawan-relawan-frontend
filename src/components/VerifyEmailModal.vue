<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const emit = defineEmits(['close'])
const route = useRoute()

const email = ref(route.query.email || '')
const verified = ref(route.query.verified === 'true')

const closeModal = () => emit('close')
</script>

<template>
  <Transition name="modal-fade">
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop with gradient blur -->
      <Transition name="backdrop-fade">
        <div class="fixed inset-0 bg-gradient-to-br from-black/60 via-purple-900/40 to-black/60 backdrop-blur-sm" @click="closeModal"></div>
      </Transition>

      <!-- Modal content -->
      <div class="relative min-h-screen flex items-center justify-center p-4">
        <Transition name="slide-up">
          <div class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform">
            <!-- Close button with smooth animation -->
            <button 
              @click="closeModal" 
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:rotate-90 hover:scale-110">
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

            <div class="text-center">
              <!-- Animated Icon -->
              <div class="mb-6 relative">
                <div v-if="verified" class="absolute inset-0 flex items-center justify-center">
                  <div class="w-20 h-20 bg-green-100 rounded-full animate-ping-slow"></div>
                </div>
                <div v-else class="absolute inset-0 flex items-center justify-center">
                  <div class="w-20 h-20 bg-blue-100 rounded-full animate-pulse"></div>
                </div>
                
                <svg v-if="verified" class="relative mx-auto h-20 w-20 text-green-500 animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg v-else class="relative mx-auto h-20 w-20 text-blue-500 animate-bounce-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>

              <!-- Title with gradient -->
              <h2 class="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-900 via-purple-700 to-indigo-900 bg-clip-text text-transparent">
                {{ verified ? '✓ Email Terverifikasi!' : '📧 Verifikasi Email Anda' }}
              </h2>

              <!-- Verified Message -->
              <div v-if="verified" class="text-gray-600 mb-6 text-sm space-y-3">
                <p class="leading-relaxed">
                  Email Anda telah berhasil diverifikasi. Sekarang Anda dapat login ke akun Anda.
                </p>
                <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl text-green-700 font-medium">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Akun Anda sudah aktif
                </div>
              </div>

              <!-- Unverified Message -->
              <div v-else class="text-gray-600 mb-6 text-sm space-y-4">
                <p class="leading-relaxed">
                  Kami telah mengirimkan link verifikasi ke email<span v-if="email"> <span class="font-semibold text-indigo-900">{{ email }}</span></span>.
                </p>
                <p class="text-gray-500">
                  Silakan cek inbox atau folder spam Anda dan klik link verifikasi untuk mengaktifkan akun.
                </p>
                
                <!-- Tips Card with animation -->
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 text-left transform hover:scale-[1.02] transition-transform duration-200">
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span class="text-white text-lg">💡</span>
                    </div>
                    <div>
                      <p class="text-blue-900 text-sm font-semibold mb-2">Tips Verifikasi:</p>
                      <ul class="text-blue-700 text-xs space-y-1.5">
                        <li class="flex items-start gap-2">
                          <span class="text-blue-500 mt-0.5">•</span>
                          <span>Cek folder spam jika tidak menerima email</span>
                        </li>
                        <li class="flex items-start gap-2">
                          <span class="text-blue-500 mt-0.5">•</span>
                          <span>Link verifikasi berlaku selama 24 jam</span>
                        </li>
                        <li class="flex items-start gap-2">
                          <span class="text-blue-500 mt-0.5">•</span>
                          <span>Pastikan email yang digunakan benar</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Button -->
              <button
                @click="closeModal"
                class="w-full py-3 px-6 border border-transparent rounded-2xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-indigo-900 to-indigo-700 hover:from-indigo-800 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200 transform hover:scale-[1.02]"
              >
                {{ verified ? '🚀 Login Sekarang' : '✓ Mengerti' }}
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

@keyframes scale-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes ping-slow {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-scale-in {
  animation: scale-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
