<template>
  <q-page>
    <div class="q-pa-md col">
      <div class="row q-gutter-md justify-center">
        <q-card style="width: 20%">
          <q-card-section class="bg-warning"
            ><div class="text-h6 text-center">
              <q-icon name="people" />Total Users
            </div></q-card-section
          >
          <q-card-separator />
          <q-card-section class="bg-primary"
            ><div class="text-h5 text-warning text-center">
              {{ users }}
            </div></q-card-section
          >
        </q-card>
        <q-card style="width: 20%">
          <q-card-section class="bg-warning"
            ><div class="text-h6 text-center">
              <q-icon name="sports_esports" />Total Matches
            </div></q-card-section
          >
          <q-card-separator />
          <q-card-section class="bg-primary"
            ><div class="text-h5 text-warning text-center">
              {{ matches }}
            </div></q-card-section
          >
        </q-card>
        <q-card style="width: 20%">
          <q-card-section class="bg-warning"
            ><div class="text-h6 text-center">
              <q-icon name="payments" />Total Deposits
            </div></q-card-section
          >
          <q-card-separator />
          <q-card-section class="bg-primary"
            ><div class="text-h5 text-warning text-center">
              {{ deposits }}
            </div></q-card-section
          >
        </q-card>
        <q-card style="width: 20%">
          <q-card-section class="bg-warning"
            ><div class="text-h6 text-center">
              <q-icon name="shopping_cart_checkout" />Total Withdraws
            </div></q-card-section
          >
          <q-card-separator />
          <q-card-section class="bg-primary"
            ><div class="text-h5 text-warning text-center">
              {{ withdraws }}
            </div></q-card-section
          >
        </q-card>
        <q-card style="width: 20%">
          <q-card-section class="bg-warning"
            ><div class="text-h6 text-center">
              <q-icon name="shopping_cart_checkout" />Total Earnings
            </div></q-card-section
          >
          <q-card-separator />
          <q-card-section class="bg-primary"
            ><div class="text-h5 text-warning text-center">
              1000
            </div></q-card-section
          >
        </q-card>
        <q-card style="width: 20%">
          <q-card-section class="bg-warning"
            ><div class="text-h6 text-center">
              <q-icon name="shopping_cart_checkout" />Total Referral Earnings
            </div></q-card-section
          >
          <q-card-separator />
          <q-card-section class="bg-primary"
            ><div class="text-h5 text-warning text-center">
              1000
            </div></q-card-section
          >
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: "IndexPage",
});
import { onMounted } from "vue";
import { useDashboardStore } from "../stores/dashboardStore";
import { storeToRefs } from "pinia";
const dashboard = useDashboardStore();
const { users, matches, deposits, withdraws } = storeToRefs(dashboard);
const { getTotalUsers, getTotalMatches, getTotalDeposits, getTotalWithdraws } =
  dashboard;

onMounted(() => {
  getTotalUsers();
  getTotalMatches();
  getTotalDeposits();
  getTotalWithdraws();
});
</script>
