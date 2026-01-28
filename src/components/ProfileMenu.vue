<template>
  <div class="absolute right-0 top-full w-64 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
    <!-- Header Profile -->
    <div class="flex flex-col items-center space-y-3 px-6 py-4 border-b border-gray-100">
      <div class="relative">
        <img 
          :src="user?.photo_url || defaultIcon" 
          alt="Profile Photo" 
          class="w-20 h-20 rounded-full object-cover border-4 border-indigo-100 shadow-md" 
        />
        <div class="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      <div class="text-center">
        <p class="font-bold text-gray-900">{{ user?.full_name || user?.username || 'User' }}</p>
        <p class="text-gray-500 text-sm truncate max-w-[200px]">{{ user?.email }}</p>
      </div>
    </div>
    
    <!-- Menu Items -->
    <div class="py-2">
      <router-link 
        to="/profile"
        class="flex items-center gap-3 px-6 py-3 hover:bg-indigo-50 transition-colors duration-200 group"
      >
        <svg class="w-5 h-5 text-gray-600 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-gray-700 group-hover:text-indigo-600 font-medium">Profil Saya</span>
      </router-link>
      
      <button 
        @click="onLogout" 
        class="flex items-center gap-3 w-full px-6 py-3 hover:bg-red-50 transition-colors duration-200 group"
      >
        <svg class="w-5 h-5 text-gray-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span class="text-gray-700 group-hover:text-red-600 font-medium">Keluar</span>
      </button>
    </div>
  </div>
</template>


<script setup>
import { defineEmits, defineProps } from 'vue';


const props = defineProps({ 
  user: Object, 
  defaultIcon: { type: String, default: '' } 
});
const emit = defineEmits(['logout']);


function onLogout() { 
  emit('logout'); 
}
</script>


<style scoped>
/* Smooth animations */
.router-link-active {
  background-color: rgb(238, 242, 255);
}
</style>
