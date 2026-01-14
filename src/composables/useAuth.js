import { ref } from "vue";
import { useRouter } from "vue-router";
import { AuthService } from "../services/api/apiService.js";
import { supabase } from "../config/supabase.js";

export function useAuth() {
  const loading = ref(false);
  const error = ref(null);
  const router = useRouter();

  const handleLogin = async (email, password, onSuccess) => {
    loading.value = true;
    error.value = null;

    try {
      // Clear localStorage sebelum login baru
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("access_token");
      
      const { session, user } = await AuthService.login(email, password);

      if (!session) {
        error.value = "Login gagal, session tidak ditemukan";
        return;
      }

      // Simpan user info baru ke localStorage
      localStorage.setItem("user", JSON.stringify(user));

      if (onSuccess) onSuccess(user);

      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      error.value = err.message || "Login gagal";
    } finally {
      loading.value = false;
    }
  };

  const handleRegister = async (payload, onSuccess) => {
    loading.value = true;
    error.value = null;

    const { name, email, password, password_confirmation } = payload;

    if (password !== password_confirmation) {
      error.value = "Password dan konfirmasi tidak sama.";
      loading.value = false;
      return;
    }

    try {
      // Register dengan Supabase
      const { user } = await AuthService.register(email, password, name);

      // Berhasil register, tampilkan pesan untuk cek email
      if (user && !user.email_confirmed_at) {
        error.value = null;
        if (onSuccess) {
          onSuccess({
            message: "Registrasi berhasil! Silakan cek email untuk verifikasi akun Anda.",
            needsVerification: true,
            user
          });
        }
      } else {
        // Jika auto-confirm enabled di Supabase
        localStorage.setItem("user", JSON.stringify(user));
        if (onSuccess) onSuccess(user);
        router.push("/");
      }
    } catch (err) {
      console.error("Register error:", err);
      error.value = err.message || "Pendaftaran gagal";
    } finally {
      loading.value = false;
    }
  };

  const handleGoogleLogin = async (onSuccess) => {
    loading.value = true;
    error.value = null;

    try {
      await AuthService.loginWithGoogle();
      // Redirect handled by Supabase
    } catch (err) {
      console.error("Google login error:", err);
      error.value = err.message || "Login dengan Google gagal";
      loading.value = false;
    }
  };

  const handleLogout = async () => {
    try {
      // Logout dari Supabase (clear session di Supabase)
      await AuthService.logout();
      
      // Hapus semua data dari localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("access_token");
      localStorage.removeItem("pendingUser");
      
      // Clear semua localStorage yang berkaitan dengan auth (optional: clear all)
      // localStorage.clear(); // Uncomment jika ingin hapus semua
      
      // Redirect ke home
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return {
    loading,
    error,
    handleLogin,
    handleRegister,
    handleGoogleLogin,
    handleLogout,
  };
}
