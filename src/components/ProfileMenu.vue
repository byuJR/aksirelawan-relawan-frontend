<template>
  <div class="absolute right-0 top-full w-56 bg-white rounded-md shadow-lg py-4 px-4 z-50">
    <div class="flex flex-col items-center space-y-2 mb-4">
      <img :src="user?.profilePicture || defaultIcon" alt="Profile Photo" class="w-16 h-16 rounded-full" />
      <p class="font-semibold text-gray-800">{{ user?.username || 'User' }}</p>
      <p class="text-gray-600 text-sm">{{ user?.email }}</p>
    </div>
    <button @click="onLogout" class="w-full text-left text-red-600">Keluar</button>
  </div>
</template>


<script setup>
import { defineEmits, defineProps } from 'vue';


const props = defineProps({ user: Object, defaultIcon: { type: String, default: '' } });
const emit = defineEmits(['logout']);


function onLogout() { emit('logout'); }
</script>


<style scoped></style>
