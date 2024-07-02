<template>
  <div
    class="row bg-secondary absolute-center"
    style="width: 100%; height: 100%"
  >
    <div class="absolute-center q-pa-none">
      <q-card class="bg-primary" style="width: 100%"
        ><q-card-section>
          <div class="row justify-center text-bold text-subtitle1 text-warning">
            EMATCH DASHBOARD
          </div></q-card-section
        >
        <q-separator />
        <q-card-section
          ><div class="col q-gutter-md">
            <q-input
              v-model="loginForm.email"
              class="bg-warning"
              filled
              placeholder="Email"
              type="text"
            />
            <q-separator />
            <q-input
              v-model="loginForm.password"
              class="bg-warning"
              filled
              placeholder="Password"
              type="password"
            /></div
        ></q-card-section>
        <div class="row justify-center q-pa-md text-warning">
          <q-btn class="bg-positive" label="Signin" @click="login" /></div
      ></q-card>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "src/stores/authStore";
const authStore = useAuthStore();
const { loginForm } = storeToRefs(authStore);
const { login } = authStore;
</script>

<style lang="scss" scoped></style>
