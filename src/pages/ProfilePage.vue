<script setup>
import Profile from '../components/profile/Profile.vue';
</script>

<template>
  <div class="profile-page-container">
    <Profile />
  </div>
</template>

<style scoped>
.profile-page-container {
  min-height: calc(100vh - 200px);
  padding: 40px 0;
  background-color: #f8f9fa;
}
</style>
