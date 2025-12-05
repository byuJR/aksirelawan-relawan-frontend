import { ref, computed, onMounted } from "vue";
import { ActivityService } from "../services/api/apiService.js";

export function useActivities() {
  // Reactive state
  const localSearchInput = ref("");
  const searchQuery = ref("");
  const localLocationInput = ref("");
  const locationQuery = ref("");
  const showAll = ref(false);
  const selectedActivity = ref(null);
  const showModalActivity = ref(false);

  // State untuk menampung activities yang diambil dan status loading/error
  const activities = ref([]);
  const loading = ref(true);
  const error = ref(null);
  const meta = ref(null);

  // Dummy Data untuk activities (contoh data seolah-olah API)
  const fetchActivities = async () => {
    loading.value = true;
    error.value = null;

    try {
      const res = await ActivityService.getAll();
      const payload = res.data?.data?.items || res.data?.data || res.data;

      activities.value = (Array.isArray(payload) ? payload : []).map(
        (item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          location: item.location,
          date: `${item.start_date} - ${item.end_date}`,
          start_date: item.start_date,
          end_date: item.end_date,
          max_participants: item.max_participants,
          current_participants: item.current_participants,
          status: item.status,
          organization: item.organization_name || "Organisasi", // jika belum ada join
          image: item.image_url,
          categories: item.categories || [], // belum ada → kosong
        })
      );

      // populate meta if present
      meta.value = res.data?.data?.meta || null;
    } catch (err) {
      console.error("Fetch error:", err);
      const errs = err.response?.data?.errors;
      error.value = Array.isArray(errs)
        ? errs.join(", ")
        : err.response?.data?.message || err.message || "Gagal mengambil data";
    } finally {
      loading.value = false;
    }
  };

  // Method untuk apply pencarian
  const applySearch = () => {
    searchQuery.value = localSearchInput.value.trim();
    locationQuery.value = localLocationInput.value.trim();
    showAll.value = false; // reset showAll pada pencarian baru
  };

  // Fungsi untuk membuka modal
  const openModal = (activity) => {
    selectedActivity.value = activity; // Menyimpan data activity yang dipilih
    showModalActivity.value = true; // Menampilkan modal
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    showModalActivity.value = false; // Menutup modal
    selectedActivity.value = null; // Menghapus data activity yang dipilih
  };

  // Computed untuk filter activities berdasarkan query pencarian dan lokasi
  const filteredActivities = computed(() => {
    const query = searchQuery.value.toLowerCase();
    const location = locationQuery.value.toLowerCase();

    // Filter aktivitas berdasarkan pencarian (judul atau organisasi) dan lokasi
    return activities.value.filter((activity) => {
      const matchesSearch =
        !query ||
        activity.title.toLowerCase().includes(query) ||
        activity.organization.toLowerCase().includes(query);
      const matchesLocation =
        !location || activity.location.toLowerCase().includes(location);
      return matchesSearch && matchesLocation;
    });
  });

  // Computed untuk menampilkan activities berdasarkan jumlah yang diinginkan
  const displayedActivities = computed(() => {
    return showAll.value
      ? filteredActivities.value
      : filteredActivities.value.slice(0, 6);
  });

  // Memanggil fetchActivities saat komponen dimuat
  onMounted(() => {
    fetchActivities();
    window.scrollTo(0, 0); // Scroll ke atas setelah page dimuat
  });

  // Return semua state dan computed values
  return {
    activities,
    loading,
    meta,
    error,
    filteredActivities,
    displayedActivities,
    applySearch,
    openModal,
    closeModal,
    selectedActivity,
    showModalActivity,
    localSearchInput,
    localLocationInput,
    searchQuery,
    locationQuery,
    showAll,
  };
}
