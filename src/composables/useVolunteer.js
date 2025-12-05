import { ref } from "vue";
import { VolunteerService } from "../services/api/apiService.js";

export function useVolunteer() {
  const loading = ref(false);
  const error = ref(null);
  const volunteers = ref([]);
  const volunteer = ref(null);

  const fetchVolunteers = async () => {
    loading.value = true;
    error.value = null;

    try {
      const res = await VolunteerService.getAll();
      // backend returns { success:true, message, data: { items, meta } }
      volunteers.value = res.data?.data?.items || res.data?.data || res.data;
    } catch (err) {
      const errs = err.response?.data?.errors;
      error.value = Array.isArray(errs)
        ? errs.join(", ")
        : err.response?.data?.message || "Gagal mengambil data";
    } finally {
      loading.value = false;
    }
  };

  const fetchVolunteer = async (id) => {
    loading.value = true;
    error.value = null;

    try {
      const res = await VolunteerService.getById(id);
      volunteer.value = res.data?.data || res.data;
    } catch (err) {
      const errs = err.response?.data?.errors;
      error.value = Array.isArray(errs)
        ? errs.join(", ")
        : err.response?.data?.message || "Data tidak ditemukan";
    } finally {
      loading.value = false;
    }
  };

  const addVolunteer = async (form, onSuccess) => {
    loading.value = true;
    error.value = null;

    try {
      const payload = {
        user_id: form.user_id,
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        address: form.address || null,
      };

      await VolunteerService.create(payload);
      if (onSuccess) onSuccess();
    } catch (err) {
      const errs = err.response?.data?.errors;
      error.value = Array.isArray(errs)
        ? errs.join(", ")
        : err.response?.data?.message || "Gagal menambahkan volunteer";
    } finally {
      loading.value = false;
    }
  };

  const volunteerTemplate = {
    user_id: "",
    name: "",
    phone: "",
    address: "",
  };

  return {
    loading,
    error,
    volunteers,
    volunteer,
    volunteerTemplate,
    fetchVolunteers,
    fetchVolunteer,
    addVolunteer,
  };
}
