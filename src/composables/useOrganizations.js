import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { OrganizationService } from "../services/api/apiService.js";

export function useOrganizations() {
  const organizations = ref([]);
  const loading = ref(true);
  const error = ref(null);
  const meta = ref(null);
  const searchQuery = ref("");
  const localSearchInput = ref("");
  const showAll = ref(false);
  const showModal = ref(false);
  const selectedOrganization = ref(null);

  const route = useRoute();

  const fetchOrganizations = async () => {
    loading.value = true;
    error.value = null;

    try {
      const res = await OrganizationService.getAll();
      const payload = res.data?.data?.items || res.data?.data || res.data;

      organizations.value = (Array.isArray(payload) ? payload : []).map(
        (item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          category: item.category || "Umum",
          email: item.email || "Tidak diketahui",
          phone: item.phone || "Tidak diketahui",
          address: item.address || "Tidak diketahui",
          image: item.image_url || [],
        })
      );

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

  const applySearch = () => {
    searchQuery.value = localSearchInput.value.trim();
  };

  const openModal = (org) => {
    selectedOrganization.value = org;
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
    selectedOrganization.value = null;
  };

  const filteredOrganizations = computed(() => {
    const kategoriFilter = route.query.kategori
      ? route.query.kategori.toString().toLowerCase()
      : "";
    return organizations.value.filter((org) => {
      const matchesName = org.name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
      const matchesCategory = kategoriFilter
        ? org.kategori.toLowerCase().includes(kategoriFilter)
        : true;
      return matchesName && matchesCategory;
    });
  });

  const displayedOrganizations = computed(() => {
    return showAll.value
      ? filteredOrganizations.value
      : filteredOrganizations.value.slice(0, 3);
  });

  onMounted(() => {
    fetchOrganizations();
    window.scrollTo(0, 0);
  });

  return {
    organizations,
    loading,
    meta,
    searchQuery,
    localSearchInput,
    showAll,
    showModal,
    selectedOrganization,
    displayedOrganizations,
    filteredOrganizations,
    applySearch,
    openModal,
    closeModal,
  };
}
