<template>
  <q-page>
    <div v-if="cashoutLoading" class="row justify-center text-warning">
      <q-spinner-puff size="5.5em" />
    </div>
    <div v-else>
      <div class="q-pa-md">
        <q-table
          :columns="cashoutColumn"
          :rows="cashoutList"
          :pagination="cashoutPagination"
          row-key="id"
          class="bg-primary text-warning"
          separator="cell"
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <div class="row q-gutter-sm justify-center">
                <q-btn
                  flat
                  icon="edit"
                  dense
                  size="sm"
                  color="green-5"
                  @click="openCashoutRequest(props.row)"
                >
                  <q-tooltip>Update</q-tooltip>
                </q-btn>
              </div>
            </q-td>
          </template></q-table
        >
      </div>

      <!-- cashin dialog-->
      <q-dialog v-model="cashoutDialog"
        ><q-card class="bg-warning" style="width: 100%"
          ><q-section
            ><div
              class="row justify-center rounded-borders text-bold bg-primary text-warning"
            >
              Cashout Request
            </div></q-section
          >
          <q-separator />
          <q-card-section>
            <div class="row bg-primary text-warning rounded-borders q-pa-md">
              <div class="col">Sender: {{ cashoutData.sender }}</div>
              <div class="col text-right">
                Requested Amount: {{ cashoutData.amount }}
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div
              class="bg-primary rounded-borders row q-pa-sm q-gutter-sm justify-center"
            >
              <q-btn
                label="Aprrove"
                class="bg-positive"
                @click="openApproveCashoutRequest"
              />
              <q-btn label="Decline" class="bg-red" />
            </div> </q-card-section></q-card
      ></q-dialog>

      <!-- cashin approve dialog -->
      <q-dialog v-model="cashoutApproveDialog">
        <q-card class="bg-warning"
          ><q-card-section class="bg-primary text-warning"
            ><div class="row justify-center text-bold text-subtitle1">
              Aprrove Request Confirmation:
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="q-pa-md row justify-center text-subtitle1">
              Are you sure you want to approve this cashout request?
            </div>
          </q-card-section>
          <q-separator />
          <div class="row q-pa-sm q-gutter-md justify-center bg-primary">
            <q-btn
              flat
              label="Confirm"
              class="bg-positive"
              @click="approveCashoutRequest"
            />
            <q-btn flat label="Cancel" class="bg-red" v-close-popup />
          </div>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { useCashStore } from "src/stores/cashStore";
import { storeToRefs } from "pinia";
const cashStore = useCashStore();
const {
  cashoutColumn,
  cashoutList,
  cashoutPagination,
  cashoutDialog,
  cashoutData,
  cashoutLoading,
  cashoutApproveDialog,
} = storeToRefs(cashStore);
const {
  getCashoutRequests,
  openCashoutRequest,
  approveCashoutRequest,
  openApproveCashoutRequest,
} = cashStore;

onMounted(() => {
  getCashoutRequests();
});
</script>

<style lang="scss" scoped></style>
