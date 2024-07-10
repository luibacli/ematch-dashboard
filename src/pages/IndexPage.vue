<template>
  <q-page>
    <div
      class="row justify-center text-h4 t text-bold text-warning bg-primary q-pa-md q-mt-md"
    >
      Total Data
    </div>
    <div class="q-pa-md col">
      <div class="row q-gutter-md justify-center">
        <q-card
          style="width: 20%; min-width: 200px; height: 10%; min-height: 100px"
          v-for="item in total"
          :key="item.id"
        >
          <q-card-section class="bg-warning"
            ><div class="text-h6 text-center">
              <q-icon :name="item.icon" />{{ item.name }}
            </div></q-card-section
          >
          <q-card-separator />
          <q-card-section class="bg-primary"
            ><div class="text-h5 text-warning text-center">
              {{ item.data }}
            </div></q-card-section
          >
        </q-card>
      </div>
    </div>
    <div
      class="row justify-center text-h4 text-bold text-warning bg-primary q-pa-md q-mt-md"
    >
      Data Analytics
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
const { users, matches, deposits, withdraws, earnings } =
  storeToRefs(dashboard);
const { getTotalUsers, getTotalMatches, getTotalDeposits, getTotalWithdraws } =
  dashboard;

const total = [
  {
    id: 0,
    icon: "people",
    name: "Users",
    data: users,
  },
  {
    id: 1,
    icon: "sports_esports",
    name: "Matches",
    data: matches,
  },
  {
    id: 2,
    name: "Deposits",
    icon: "payments",
    data: deposits,
  },
  {
    id: 3,
    icon: "shopping_cart_checkout",
    name: "Withdrawals",
    data: withdraws,
  },
  {
    id: 4,
    icon: "account_balance_wallet",
    name: "Earnings",

    data: earnings,
  },
  {
    id: 5,
    icon: "savings",
    name: " Referral",
    data: 20,
  },
];

onMounted(() => {
  getTotalUsers();
  getTotalMatches();
  getTotalDeposits();
  getTotalWithdraws();
});
</script>
