<script setup>
import NavBar from '../components/NavBar.vue';
import Footer from '../components/Footer.vue';
</script>

<!-- MainLayout.vue -->
<template>
  <div>
    <header>
      <NavBar />
    </header>
    <main class="pt-16">
      <router-view />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>
