<template>
  <div class="auth-callback-page">
    <div class="loading-container">
      <div class="spinner"></div>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../config/supabase';

const router = useRouter();
const message = ref('Memproses login...');

onMounted(async () => {
  try {
    // Get session from URL hash
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      message.value = 'Login gagal: ' + error.message;
      setTimeout(() => router.push('/'), 3000);
      return;
    }

    if (session) {
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(session.user));
      
      message.value = 'Login berhasil! Mengalihkan...';
      setTimeout(() => router.push('/dashboard'), 1000);
    } else {
      message.value = 'Session tidak ditemukan';
      setTimeout(() => router.push('/'), 3000);
    }
  } catch (err) {
    console.error('Auth callback error:', err);
    message.value = 'Terjadi kesalahan';
    setTimeout(() => router.push('/'), 3000);
  }
});
</script>

<style scoped>
.auth-callback-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.loading-container {
  text-align: center;
  color: white;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

p {
  font-size: 18px;
  margin: 0;
}
</style>
