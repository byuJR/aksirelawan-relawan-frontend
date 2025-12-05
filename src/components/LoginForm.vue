<script setup>
import { ref } from "vue"

const props = defineProps({
  loading: Boolean,
  error: String
})

const emit = defineEmits(["submit"])

const form = ref({
  email: "",
  password: ""
})

const submitForm = () => {
  emit("submit", { ...form.value })
}
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-6">

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
      <input id="email" type="email" v-model="form.email" required
        class="mt-1 block w-full px-5 py-3 border border-black rounded-3xl shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-700 focus:border-indigo-700 transition-all"
        placeholder="email@contoh.com" />
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
      <input id="password" type="password" v-model="form.password" required
        class="mt-1 block w-full px-5 py-3 border border-black rounded-3xl shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-700 focus:border-indigo-700 transition-all"
        placeholder="••••••••" />
    </div>

    <div class="pt-2">
      <button type="submit" :disabled="loading" class="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-3xl shadow-lg
        text-base font-semibold text-white bg-indigo-900 hover:bg-indigo-800 focus:outline-none focus:ring-4
        focus:ring-offset-2 focus:ring-indigo-900 transition-colors">

        <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>

        <span>{{ loading ? "Memproses..." : "Masuk" }}</span>
      </button>
    </div>

    <div v-if="error" class="text-red-500 text-center text-sm py-2 px-3 bg-red-50 rounded-lg">
      {{ error }}
    </div>

  </form>
</template>
