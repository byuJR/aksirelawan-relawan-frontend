<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BackgroundEffect from './components/BackgroundEffect.vue';
import { AuthService } from './services/api/apiService.js';
import { useHead } from '@vueuse/head';

export default {
  name: 'App',
  components: {
    BackgroundEffect
  },
  setup() {
    const router = useRouter();
    const isAuthenticated = ref(false);

    // Menggunakan useHead untuk mengatur metadata (Title dan Meta)
    useHead({
      title: 'Aksi Relawan',
      meta: [
        {
          name: 'description',
          content: 'This is a dynamic description for Aksi Relawan.'
        }
      ]
    });

    onMounted(() => {
      isAuthenticated.value = !!localStorage.getItem('token');
    });

    const handleLogout = async () => {
      try {
        await AuthService.logout();
        localStorage.removeItem('token');
        isAuthenticated.value = false;
        router.push('/');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    return {
      isAuthenticated,
      handleLogout,
    };
  },
};
</script>

<template>
  <div class="min-h-screen relative">
    <BackgroundEffect />
    <!-- Main Content -->
    <main class="relative z-10">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
/* Global styles can go here */
body {
  font-family: 'Inter', sans-serif;
  color: #333;
  line-height: 1.5;
}

.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}
</style>
