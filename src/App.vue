<template>
  <router-view />
</template>

<script setup>
defineOptions({
  name: "App",
});

import { useAuthStore } from "src/stores/authStore";
import { onMounted } from "vue";

const authStore = useAuthStore();
onMounted(() => {
  authStore.monitorAuthState();
  console.log(authStore.monitorAuthState());
});
</script>
