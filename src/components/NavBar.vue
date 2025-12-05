<script setup>
import { ref, computed, onMounted } from 'vue';
import { gsap } from 'gsap';
import AuthModal from './AuthModal.vue';
import AboutPopup from './AboutPopup.vue';
import { useRouter } from 'vue-router';
import AksiRelawanIcon from '../assets/images/icons/AksiRelawan.png';
import UserIcon from '../assets/images/icons/iconuser.png';
import MenuIcon from './icons/MenuIcon.vue';
import XIcon from './icons/XIcon.vue';
import { useNavbar } from '../composables/useNavbar.js';

const {
  isMenuOpen,
  showAuthModal,
  authMode,
  showAboutPopup,
  showProfilePopup,
  openLogin,
  openRegister,
  openAboutPopup,
  closeAuth,
  closeAboutPopup,
} = useNavbar()

const router = useRouter();

const user = ref(JSON.parse(localStorage.getItem('user')) || null);



function handleLoginSuccess(mockUser) {
  localStorage.setItem('user', JSON.stringify(mockUser));
  user.value = mockUser;

  showAuthModal.value = false;
}

function handleLogout() {
  localStorage.removeItem('user');
  user.value = null;
  showProfilePopup.value = false;
  router.push('/');
}

function handleNavItemClick(item) {
  isMenuOpen.value = false;
  if (item.path) router.push(item.path);
}

function toggleProfilePopup() {
  showProfilePopup.value = !showProfilePopup.value;
}

const isLoggedIn = computed(() => !!user.value);

const isActive = (item) => {
  return router.currentRoute.value.path === item.path;
};

const isSubMenuActive = (item) => {
  return item.hasPopup && router.currentRoute.value.path.startsWith('/tentang');
};

const navItems = [
  { name: 'Beranda', path: '/' },
  { name: 'Cari Aktivitas', path: '/aktivitas' },
  { name: 'Cari Organisasi', path: '/organisasi' },
  { name: 'Tentang Kami', hasPopup: true }
];

const handleMenuStatusChange = (newStatus) => {
  isMenuOpen.value = newStatus
}
onMounted(() => {
  gsap.from('.nav-logo-content', {
    duration: 1,
    x: -50,
    opacity: 0,
    ease: 'power3.out'
  });
  gsap.from('.auth-button', {
    duration: 1,
    x: 50,
    opacity: 0,
    ease: 'power3.out'
  });
  gsap.from('.nav-item', {
    duration: 0.8,
    y: 20,
    opacity: 0,
    stagger: 0.1,
    ease: 'power3.out'
  });
});
</script>

<template>
  <nav class="bg-white shadow-md py-4 fixed w-full top-0 z-50">
    <div class="container mx-auto px-4 flex items-center relative">

      <!-- Logo -->
      <div class="flex items-center nav-logo">
        <button class="md:hidden px-2" @click="isMenuOpen = !isMenuOpen" aria-label="Toggle Menu">
          <MenuIcon v-if="!isMenuOpen" />
          <XIcon v-else />
        </button>

        <a href="#" @click.prevent="handleNavItemClick({ path: '/' })" class="nav-logo-content flex items-center">
          <img :src="AksiRelawanIcon" alt="Logo Aksi Relawan" class="h-11 mr-2 w-11" />
          <p class="font-bold text-xl">Aksi Relawan</p>
        </a>
      </div>

      <!-- Desktop Nav -->
      <div class="hidden md:flex space-x-8 absolute left-1/2 -translate-x-1/2 nav-links">
        <div v-for="item in navItems" :key="item.name" class="relative nav-item">

          <!-- Normal nav -->
          <template v-if="!item.hasPopup">
            <a href="#" @click.prevent="handleNavItemClick(item)" :class="{ active: isActive(item) }"
              class="text-gray-900 hover:text-gray-900 truncate">
              {{ item.name }}
            </a>
          </template>

          <!-- Tentang Kami -->
          <template v-else>
            <div class="relative" @mouseenter="openAboutPopup" @mouseleave="closeAboutPopup">
              <a href="#" :class="{ active: isSubMenuActive(item) }" class="text-gray-900 truncate">
                {{ item.name }}
              </a>
              <AboutPopup v-if="showAboutPopup" class="absolute left-0 mt-1 z-50" />
            </div>
          </template>

        </div>
      </div>

      <!-- Auth Buttons OR Profile -->
      <div v-if="!isLoggedIn" class="auth-button ml-auto flex space-x-4">
        <button @click="openLogin" class="text-indigo-900 font-bold">Masuk</button>
        <button @click="openRegister" class="bg-indigo-900 text-white px-4 py-2 rounded-full font-bold">Daftar</button>
      </div>

      <div v-else class="relative ml-auto auth-button">
        <div class="flex flex-nowrap items-center gap-2">
          <a href="#" @click.prevent="handleNavItemClick({ path: '/dashboard' })"
            class="rounded-lg hover:bg-gray-100 py-1 px-2">Dashboard</a>
          <img :src="user.profilePicture || UserIcon" class="w-10 h-10 rounded-full cursor-pointer"
            @click="toggleProfilePopup" />
        </div>

        <div v-if="showProfilePopup" class="absolute right-0 mt-2 bg-white shadow-lg w-48 p-2 rounded-md">
          <div class="flex flex-col space-y-1">
            <!-- <img :src="user.profilePicture || UserIcon" class="w-16 h-16 rounded-full cursor-pointer" /> -->
            <p class="font-semibold">{{ user.name }}</p>
            <p class="text-sm text-gray-600">{{ user.email }}</p>
            <hr />
            <a href="#" @click.prevent="handleNavItemClick({ path: '/profile' })"
              class="hover:bg-gray-100 p-1 rounded">Profile</a>
            <hr />
            <button @click="handleLogout"
              class="text-red-600 hover:text-red-800 w-full text-center hover:bg-red-100 rounded py-1">
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="mt-4 md:hidden bg-white border-t shadow-sm">
      <div v-for="item in navItems" :key="item.name">
        <template v-if="!item.hasPopup">
          <button @click.prevent="handleNavItemClick(item)" class="w-full text-left px-4 py-3 font-medium text-gray-900
          hover:bg-gray-100 transition-colors duration-150
             border-b border-gray-200">
            {{ item.name }}
          </button>
        </template>
        <template v-else>
          <AboutPopup class="mt-2 mx-4 overflow-hidden rounded" @updateMenuStatus="handleMenuStatusChange" />
        </template>
      </div>
    </div>
  </nav>
  <!-- Auth Modal -->
  <AuthModal v-if="showAuthModal" :initial-mode="authMode" @close="showAuthModal = false"
    @login-success="handleLoginSuccess" />
</template>

<style scoped>
.nav-item a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  background-color: black;
  transition: width 0.3s ease;
}

.nav-item a:hover::after {
  width: 100%;
}

.nav-item a.active::after {
  width: 100%;
}

img.w-10.h-10.rounded-full.cursor-pointer.ml-2,
img.w-16.h-16.rounded-full.cursor-pointer {
  transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}

img.w-10.h-10.rounded-full.cursor-pointer.ml-2:active,
img.w-16.h-16.rounded-full.cursor-pointer:active {
  transform: scale(0.92);
}
</style>
