import { ref } from "vue";

export function useNavbar() {
  const isMenuOpen = ref(false);
  const showAuthModal = ref(false);
  const authMode = ref("login");
  const showAboutPopup = ref(false);
  const showProfilePopup = ref(false);

  function openLogin() {
    authMode.value = "login";
    showAuthModal.value = true;
  }
  function openRegister() {
    authMode.value = "register";
    showAuthModal.value = true;
  }
  function openAboutPopup() {
    showAboutPopup.value = true;
  }
  function closeAuth() {
    showAuthModal.value = false;
  }
  function closeAboutPopup() {
    showAboutPopup.value = false;
  }

  return {
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
  };
}
