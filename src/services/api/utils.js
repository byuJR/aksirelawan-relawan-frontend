import router from "../../router";

export const withAuth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  router.push("/");
};
