<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isMenuOpen = ref(false);
const router = useRouter();
const emit = defineEmits(['close', 'updateMenuStatus']);

const menuItems = [
  { label: 'Tentang Aksi Relawan', path: '/tentang' },
  { label: 'Visi Misi & Program', path: '/tentang/visi-misi-program' },
  { label: 'Tim Aksi Relawan', path: '/tentang/tim-aksi-relawan' },
  { label: 'Kontak Kami', path: '/tentang/kontak-kami' }
  // { label: 'Donasi', path: '/tentang/donasi' }, // Disabled for now
];

function handleNavItemClick(item) {
  isMenuOpen.value = false;
  emit('updateMenuStatus', isMenuOpen.value)
  if (item.path) router.push(item.path);
}
</script>

<template>
  <div class="bg-gray-100 rounded-xl shadow overflow-hidden min-w-36" @mouseleave="$emit('close')" @click.stop>
    <a v-for="item in menuItems" :key="item.path" :href="item.path"
      class="block px-4 py-3 text-sm text-gray-900 hover:bg-gray-300 duration-150 border-b border-b-gray-300"
      @click.prevent="handleNavItemClick(item)">
      {{ item.label }}
    </a>
  </div>
</template>

<style scoped>
/*  */
</style>
