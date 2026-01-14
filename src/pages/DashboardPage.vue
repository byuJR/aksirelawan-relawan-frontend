<script setup>
import { ref, onMounted, computed } from "vue";
import { useProfile } from "../composables/useProfile.js";
import { useActivities } from "../composables/useActivities.js";
import { supabase } from "../config/supabase.js";

const { profile, fetchProfile, profileLoaded, meta: profileMeta } = useProfile();
const { activities, loading: activitiesLoading, fetchActivities, displayedActivities, meta: activitiesMeta } = useActivities();

const user = ref(null);

// Get fresh user from Supabase
const getCurrentUser = async () => {
  const { data: { user: supabaseUser } } = await supabase.auth.getUser();
  if (supabaseUser) {
    user.value = supabaseUser;
    localStorage.setItem("user", JSON.stringify(supabaseUser));
  }
};

const load = async () => {
  await getCurrentUser();
  await fetchProfile();
  await fetchActivities();
};

onMounted(load);

const skillsCount = computed(() => (profile.volunteer_skills || []).length);
const upcomingCount = computed(() => (activitiesMeta?.returned || activities.length));
</script>
<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Profile Card -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center gap-4">
            <img :src="profile.photo_url || '/src/assets/images/icons/iconuser.png'" alt="avatar"
              class="w-20 h-20 rounded-full object-cover border-2 border-indigo-800" />
            <div>
              <h2 class="text-xl font-semibold">{{ profile.name || user?.name || 'Relawan' }}</h2>
              <p class="text-sm text-gray-500">{{ profile.email || (user && user.email) }}</p>
            </div>
          </div>

          <div class="mt-4">
            <div class="flex gap-4">
              <div class="text-center">
                <div class="text-2xl font-bold">{{ skillsCount }}</div>
                <div class="text-xs text-gray-500">Skills</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold">{{ upcomingCount }}</div>
                <div class="text-xs text-gray-500">Upcoming</div>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <h3 class="text-sm font-semibold text-gray-600">Skill</h3>
            <div class="mt-2 flex flex-wrap gap-2">
              <span v-for="s in profile.volunteer_skills" :key="s.id"
                class="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">{{ s.name }}</span>
              <span v-if="!(profile.volunteer_skills && profile.volunteer_skills.length)"
                class="text-gray-400 italic">Belum ada skill</span>
            </div>
          </div>
        </div>

        <!-- Activities Summary -->
        <div class="md:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Kegiatan Mendatang</h2>

          <div v-if="activitiesLoading" class="text-center py-8">Memuat kegiatan...</div>

          <div v-else>
            <ul class="space-y-3">
              <li v-for="act in displayedActivities" :key="act.id" class="p-3 border rounded-md">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="font-semibold">{{ act.title }}</div>
                    <div class="text-sm text-gray-500">{{ act.location }} • {{ act.date }}</div>
                  </div>
                  <div class="text-sm text-indigo-800">{{ act.status || 'Terbuka' }}</div>
                </div>
              </li>
            </ul>

            <div class="mt-4 text-right text-sm text-gray-600">Menampilkan {{ activitiesMeta?.returned ||
              activities.length }} kegiatan</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
