<template>
  <div class="verify-email-page">
    <div class="container">
      <div class="card">
        <div class="icon">📧</div>
        <h1>{{ title }}</h1>
        <p>{{ message }}</p>
        <button v-if="showResendButton" @click="resendVerification" :disabled="loading">
          {{ loading ? 'Mengirim...' : 'Kirim Ulang Email Verifikasi' }}
        </button>
        <router-link to="/" class="back-link">Kembali ke Beranda</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { supabase } from '../config/supabase';
import { AuthService } from '../services/api/apiService';

const router = useRouter();
const route = useRoute();
const title = ref('Verifikasi Email');
const message = ref('Sedang memverifikasi email Anda...');
const showResendButton = ref(false);
const loading = ref(false);
const userEmail = ref('');

onMounted(async () => {
  // Check if this is a verification callback
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (session && session.user.email_confirmed_at) {
    title.value = 'Email Terverifikasi! ✅';
    message.value = 'Akun Anda telah berhasil diverifikasi. Anda akan dialihkan ke dashboard...';
    localStorage.setItem('user', JSON.stringify(session.user));
    setTimeout(() => router.push('/'), 2000);
  } else if (error || !session) {
    title.value = 'Verifikasi Email Diperlukan';
    message.value = 'Silakan cek email Anda dan klik link verifikasi yang telah kami kirimkan.';
    showResendButton.value = true;
    
    // Try to get email from route query or localStorage
    userEmail.value = route.query.email || JSON.parse(localStorage.getItem('pendingUser') || '{}').email || '';
  }
});

const resendVerification = async () => {
  if (!userEmail.value) {
    alert('Email tidak ditemukan. Silakan register ulang.');
    return;
  }

  loading.value = true;
  try {
    await AuthService.resendVerification(userEmail.value);
    message.value = `Email verifikasi telah dikirim ulang ke ${userEmail.value}`;
    showResendButton.value = false;
  } catch (err) {
    alert(err.message || 'Gagal mengirim email verifikasi');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.verify-email-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 500px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.icon {
  font-size: 64px;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
}

p {
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
  line-height: 1.5;
}

button {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 16px;
}

button:hover:not(:disabled) {
  background: #5568d3;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.back-link {
  display: inline-block;
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
