<script setup>
import { ref } from "vue"
import LoginForm from "./LoginForm.vue"
import RegisterForm from "./RegisterForm.vue"
import { useAuth } from "../composables/useAuth"
import { useVolunteer } from "../composables/useVolunteer"

const { addVolunteer } = useVolunteer()

const props = defineProps({
  initialMode: { type: String, default: "login" }
})

const emit = defineEmits(["close", "login-success"])

const mode = ref(props.initialMode)

const {
  loading,
  error,
  handleLogin,
  handleRegister
} = useAuth()

const closeModal = () => emit("close")

// wrapper for login event
const submitLogin = (form) => {
  handleLogin(form.email, form.password, (user) => {
    emit("login-success", user)
    closeModal()
  })
}

// wrapper for register event
const submitRegister = (form) => {
  handleRegister(form, async (user) => {
    await addVolunteer({
      user_id: user.id,
      name: form.name,
      email: form.email
    })

    alert("Pendaftaran berhasil!")
    mode.value = "login"
  })
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

        <LoginForm v-if="mode === 'login'" :loading="loading" :error="error" @submit="submitLogin" />

        <RegisterForm v-else :loading="loading" :error="error" @submit="submitRegister" />

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
