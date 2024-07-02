<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Ematch Dashboard Management </q-toolbar-title>

        <!-- <q-btn flat label="Cashout" /> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-warning"
    >
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
        <q-item clickable @click="logout"
          ><q-item-section avatar><q-icon name="logout" /></q-item-section>
          <q-item-section><q-item-label>Logout</q-item-label></q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-secondary">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useAuthStore } from "src/stores/authStore";
import { storeToRefs } from "pinia";
const authStore = useAuthStore();
const { logout } = authStore;

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Dashboard",
    icon: "dashboard",
    link: "/",
  },
  {
    title: "Users",
    icon: "people",
    link: "/users",
  },
  {
    title: "Cashin",
    icon: "payments",
    link: "/cashin",
  },
  {
    title: "Cashout",
    icon: "shopping_cart_checkout",
    link: "/cashout",
  },
  {
    title: "Matches",
    icon: "games",
    link: "/matches",
  },
  {
    title: "Trades",
    icon: "handshake",
    link: "/trades",
  },
  {
    title: "Profile",
    icon: "person",
    link: "/admin",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
