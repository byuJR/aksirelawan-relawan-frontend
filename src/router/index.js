import { createRouter, createWebHistory } from "vue-router";
import AboutPage from "../pages/tentang/AboutPage.vue";
import VisiMisiPage from "../pages/tentang/VisiMisiPage.vue";
// Donation pages - disabled for now
// import DonasiSekarangPage from "../pages/tentang/donasi/DonasiSekarangPage.vue";
// import DonationPage from "../pages/tentang/donasi/DonationPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import ContactPage from "../pages/tentang/ContactPage.vue";
import LiputanPage from "../pages/LiputanPage.vue";
import OrganisasiPage from "../pages/OrganisasiPage.vue";
import SponsorPage from "../pages/SponsorPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import ActivityPage from "../pages/ActivityPage.vue";
import HomePage from "../pages/HomePage.vue";
import AuthCallback from "../pages/AuthCallback.vue";
import VerifyEmail from "../pages/VerifyEmail.vue";
import ForgotPassword from "../pages/ForgotPassword.vue";
import ResetPassword from "../pages/ResetPassword.vue";
import MainLayout from "../layouts/MainLayout.vue";
import { useHead } from "@vueuse/head";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "/",
          name: "home",
          component: HomePage,
          meta: {
            title: "Home - Aksi Relawan",
            description: "Selamat datang di halaman utama Aksi Relawan",
          },
        },
        {
          path: "/tentang",
          name: "about",
          component: AboutPage,
          meta: {
            title: "Tentang - Aksi Relawan",
            description: "Pelajari lebih lanjut tentang aplikasi ini.",
          },
        },
        {
          path: "/tentang/visi-misi-program",
          name: "visiMisiProgram",
          component: VisiMisiPage,
          meta: {
            title: "Visi Misi Program - Aksi Relawan",
            description: "Visi dan misi program Aksi Relawan.",
          },
        },
        // DONATION ROUTES - DISABLED (Keep for future use)
        // {
        //   path: "/tentang/donasi",
        //   name: "donasi",
        //   component: DonationPage,
        //   meta: {
        //     title: "Donasi - Aksi Relawan",
        //     description: "Donasi untuk mendukung Aksi Relawan.",
        //   },
        // },
        // {
        //   path: "/tentang/donasi/donasi-sekarang",
        //   name: "donasiSekarang",
        //   component: DonasiSekarangPage,
        //   meta: {
        //     title: "Donasi Sekarang - Aksi Relawan",
        //     description: "Donasi sekarang untuk mendukung aksi relawan.",
        //   },
        // },
        {
          path: "/tentang/tim-aksi-relawan",
          name: "timAksiRelawan",
          component: TeamPage,
          meta: {
            title: "Tim Aksi Relawan - Aksi Relawan",
            description: "Kenali tim Aksi Relawan yang mendukung program ini.",
          },
        },
        {
          path: "/tentang/kontak-kami",
          name: "kontakKami",
          component: ContactPage,
          meta: {
            title: "Kontak Kami - Aksi Relawan",
            description: "Hubungi kami untuk informasi lebih lanjut.",
          },
        },
        {
          path: "/liputan-media",
          name: "liputanMedia",
          component: LiputanPage,
          meta: {
            title: "Liputan Media - Aksi Relawan",
            description: "Lihat liputan media tentang Aksi Relawan.",
          },
        },
        {
          path: "/sponsor",
          name: "sponsor",
          component: SponsorPage,
          meta: {
            title: "Sponsor - Aksi Relawan",
            description: "Jadilah sponsor untuk mendukung Aksi Relawan.",
          },
        },
        {
          path: "/organisasi",
          name: "cariOrganisasi",
          component: OrganisasiPage,
          meta: {
            title: "Cari Organisasi - Aksi Relawan",
            description: "Cari organisasi yang terlibat dalam Aksi Relawan.",
          },
        },
        {
          path: "/profile",
          name: "profile",
          component: ProfilePage,
          meta: {
            title: "Profile - Aksi Relawan",
            description: "Lihat dan edit profil Anda.",
            // requiresAuth: true,
          },
        },
        {
          path: "/aktivitas",
          name: "aktivitas",
          component: ActivityPage,
          meta: {
            title: "Aktivitas - Aksi Relawan",
            description:
              "Lihat aktivitas yang telah dilakukan oleh Aksi Relawan.",
          },
        },
      ],
    },
    // Auth callback routes (outside MainLayout)
    {
      path: "/auth/callback",
      name: "authCallback",
      component: AuthCallback,
      meta: {
        title: "Login - Aksi Relawan",
        description: "Processing login...",
      },
    },
    {
      path: "/verify-email",
      name: "verifyEmail",
      component: VerifyEmail,
      meta: {
        title: "Verifikasi Email - Aksi Relawan",
        description: "Verifikasi akun email Anda",
      },
    },
    {
      path: "/forgot-password",
      name: "forgotPassword",
      component: ForgotPassword,
      meta: {
        title: "Lupa Password - Aksi Relawan",
        description: "Reset password akun Anda",
      },
    },
    {
      path: "/reset-password",
      name: "resetPassword",
      component: ResetPassword,
      meta: {
        title: "Reset Password - Aksi Relawan",
        description: "Buat password baru",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");

  const { title, description } = to.meta;
  if (title) useHead({ title });
  if (description)
    useHead({ meta: [{ name: "description", content: description }] });

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/");
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
