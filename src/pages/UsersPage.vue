<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Users"
        :columns="userColumn"
        :rows="users"
        :pagination="pagination"
        class="bg-primary text-warning"
        row-key="name"
        separator="cell"
      ></q-table>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { useUserStore } from "src/stores/userStore";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { users, userColumn, pagination } = storeToRefs(userStore);
const { getUsers } = userStore;
onMounted(() => {
  getUsers();
});
</script>

<style lang="scss" scoped></style>
