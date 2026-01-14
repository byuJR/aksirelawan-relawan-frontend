<script setup>
import { ref } from "vue"
import LoginForm from "./LoginForm.vue"
import RegisterForm from "./RegisterForm.vue"
import ForgotPasswordModal from "./ForgotPasswordModal.vue"
import VerifyEmailModal from "./VerifyEmailModal.vue"
import { useAuth } from "../composables/useAuth"
import { useVolunteer } from "../composables/useVolunteer"

const { addVolunteer } = useVolunteer()

const props = defineProps({
  initialMode: { type: String, default: "login" }
})

const emit = defineEmits(["close", "login-success"])

const mode = ref(props.initialMode)
const showForgotPassword = ref(false)
const showVerifyEmail = ref(false)
const verifyEmailData = ref({ email: '', verified: false })

const {
  loading,
  error,
  handleLogin,
  handleRegister,
  handleGoogleLogin
} = useAuth()

const closeModal = () => emit("close")

// wrapper for login event
const submitLogin = (form) => {
  handleLogin(form.email, form.password, (user) => {
    emit("login-success", user)
    closeModal()
  })
}

// Handle forgot password - show modal instead of redirect
const handleForgotPassword = () => {
  showForgotPassword.value = true
}

const closeForgotPassword = () => {
  showForgotPassword.value = false
}

// wrapper for register event
const submitRegister = (form) => {
  handleRegister(form, (result) => {
    if (result.needsVerification) {
      // Save email untuk resend verification
      localStorage.setItem('pendingUser', JSON.stringify({ email: form.email }))
      // Show verify email modal instead of redirect
      verifyEmailData.value = { email: form.email, verified: false }
      showVerifyEmail.value = true
    } else {
      // Auto-confirmed, add volunteer profile
      addVolunteer({
        user_id: result.id,
        name: form.name,
        email: form.email
      })
      alert("Pendaftaran berhasil!")
      mode.value = "login"
    }
  })
}

const closeVerifyEmail = () => {
  showVerifyEmail.value = false
  closeModal()
}
</script>


<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="closeModal"></div>

    <!-- Modal content -->
    <div class="relative min-h-screen flex items-center justify-center p-4">
      <div class="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
        <!-- Close button -->
        <button @click="closeModal" class="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Logo -->
        <div class="flex justify-center mb-6">
          <img src="../assets/images/icons/AksiRelawan.png" alt="Aksi Relawan Logo" class="h-16 w-16" />
        </div>

        <!-- Title -->
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
          {{ mode === 'login' ? 'Masuk ke Akun Anda' : 'Daftar Akun Baru' }}
        </h2>

        <LoginForm v-if="mode === 'login'" :loading="loading" :error="error" @submit="submitLogin" @google-login="handleGoogleLogin" @forgot-password="handleForgotPassword" />

        <RegisterForm v-else :loading="loading" :error="error" @submit="submitRegister" @google-login="handleGoogleLogin" />

        <!-- TOGGLE LOGIN/REGISTER -->
        <div class="mt-6 text-center text-sm text-gray-600">
          <span v-if="mode === 'login'">
            Belum punya akun?
            <a href="#" @click.prevent="mode = 'register'"
              class="font-medium text-indigo-900 hover:text-indigo-800 transition-colors">
              Daftar di sini
            </a>
          </span>
          <span v-else>
            Sudah punya akun?
            <a href="#" @click.prevent="mode = 'login'"
              class="font-medium text-indigo-900 hover:text-indigo-800 transition-colors">
              Masuk di sini
            </a>
          </span>
        </div>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <ForgotPasswordModal v-if="showForgotPassword" @close="closeForgotPassword" />

    <!-- Verify Email Modal -->
    <VerifyEmailModal v-if="showVerifyEmail" @close="closeVerifyEmail" />
  </div>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
