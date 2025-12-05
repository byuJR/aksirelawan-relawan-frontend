import { ref } from "vue";
import { useRouter } from "vue-router";
import { AuthService } from "../services/api/apiService.js";

export function useAuth() {
  const loading = ref(false);
  const error = ref(null);
  const router = useRouter();

  const handleLogin = async (email, password, onSuccess) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await AuthService.login(email, password);
      // login may return flat access_token or wrapped under data
      const token = res.data?.access_token || res.data?.data?.access_token;
      const user = res.data?.user || res.data?.data?.user || res.data?.data;

      if (!token) {
        error.value = "Token tidak ditemukan dalam response";
        return;
      }

      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (onSuccess) onSuccess(user);

      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      const errs = err.response?.data?.errors;
      error.value = Array.isArray(errs)
        ? errs.join(", ")
        : err.response?.data?.message || "Login gagal";
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
      // Register User
      await AuthService.register(email, password, name);

      // Auto Login
      const loginRes = await AuthService.login(email, password);
      const token =
        loginRes.data?.access_token || loginRes.data?.data?.access_token;
      const user =
        loginRes.data?.user || loginRes.data?.data?.user || loginRes.data?.data;

      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Kembalikan data user ke parent
      if (onSuccess) onSuccess(user);
    } catch (err) {
      console.error("Register error:", err);
      const errs = err.response?.data?.errors;
      error.value = Array.isArray(errs)
        ? errs.join(", ")
        : err.response?.data?.message || "Pendaftaran gagal";
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    handleLogin,
    handleRegister,
  };
}
