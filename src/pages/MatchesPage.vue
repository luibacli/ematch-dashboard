<template>
  <q-page>
    <div v-if="matchLoading" class="row justify-center text-warning">
      <q-spinner-puff size="5.5em" />
    </div>

    <div v-else class="q-pa-md">
      <div class="q-pa-md bg-primary">
        <q-tabs class="bg-warning text-warning" align="justify">
          <q-tab
            label="Pending Matches"
            class="bg-secondary"
            @click="getMatchPending"
          />
          <q-tab
            label="Closed Matches"
            class="bg-secondary"
            @click="getMatchClosed"
          />
          <q-tab
            label="Open Matches"
            class="bg-secondary"
            @click="getMatchOpen"
          />
        </q-tabs>
      </div>
      <q-table
        title="Pending Matches"
        :columns="matchColumn"
        :rows="matchList"
        :pagination="pagination"
        row-key="id"
        class="bg-primary text-warning q-mt-md"
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
                @click="openMatchPendingData(props.row)"
              >
                <q-tooltip>Update</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>

    <!-- match data dialog -->
    <q-dialog v-model="matchDialog">
      <div
        class="row q-pa-md q-gutter-sm"
        style="width: 100%; min-width: 100px; height: 100%; min-width: 50%"
      >
        <div class="col">
          <q-card class="bg-warning" style="width: 100%"
            ><q-section
              ><div
                class="row justify-center rounded-borders text-bold bg-primary text-warning"
              >
                Match Evaluation
              </div></q-section
            >
            <q-separator />
            <q-card-section>
              <div class="row bg-primary text-warning rounded-borders q-pa-md">
                <div class="col">Host: {{ matchData.host }}</div>
              </div>
            </q-card-section>
            <q-card-section
              ><div
                class="row bg-primary rounded-borders text-warning justify-center"
              >
                Host Proof:
              </div>
              <div class="q-pa-sm"><q-img :src="matchData.hostProof" /></div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div
                class="bg-primary rounded-borders row q-pa-sm q-gutter-sm justify-center"
              >
                <q-btn
                  label="Host Wins"
                  class="bg-positive"
                  @click="openHostWinDialog"
                />
              </div> </q-card-section
          ></q-card>
        </div>
        <div class="col">
          <q-card class="bg-warning" style="width: 100%"
            ><q-section
              ><div
                class="row justify-center rounded-borders text-bold bg-primary text-warning"
              >
                Match Evaluation
              </div></q-section
            >
            <q-separator />
            <q-card-section>
              <div class="row bg-primary text-warning rounded-borders q-pa-md">
                <div class="col">Challenger: {{ matchData.challenger }}</div>
              </div>
            </q-card-section>
            <q-card-section
              ><div
                class="row bg-primary rounded-borders text-warning justify-center"
              >
                Challenger Proof:
              </div>
              <div class="q-pa-sm">
                <q-img :src="matchData.challengerProof" />
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div
                class="bg-primary rounded-borders row q-pa-sm q-gutter-sm justify-center"
              >
                <q-btn
                  label="Challenger Wins"
                  class="bg-blue"
                  @click="openChallengerWinDialog"
                />
              </div> </q-card-section
          ></q-card>
        </div>
      </div>
    </q-dialog>

    <!-- Host Win Dialog -->
    <q-dialog v-model="winHostDialog">
      <q-card class="bg-warning"
        ><q-card-section class="bg-primary text-warning"
          ><div class="row justify-center text-bold text-subtitle1">
            Host Win Confirmation:
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="q-pa-md row justify-center text-subtitle1">
            Are you sure you want to set host the winner?
          </div>
        </q-card-section>
        <q-separator />
        <div class="row q-pa-sm q-gutter-md justify-center bg-primary">
          <q-btn
            flat
            label="Confirm"
            class="bg-positive"
            @click="confirmHostWin"
          />
          <q-btn flat label="Cancel" class="bg-red" v-close-popup />
        </div>
      </q-card>
    </q-dialog>

    <!-- Challenger Win Dialog -->
    <q-dialog v-model="winChallengerDialog">
      <q-card class="bg-warning"
        ><q-card-section class="bg-primary text-warning"
          ><div class="row justify-center text-bold text-subtitle1">
            Challenger Win Confirmation:
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="q-pa-md row justify-center text-subtitle1">
            Are you sure you want to set challenger the winner?
          </div>
        </q-card-section>
        <q-separator />
        <div class="row q-pa-sm q-gutter-md justify-center bg-primary">
          <q-btn
            flat
            label="Confirm"
            class="bg-positive"
            @click="confirmChallengerWin"
          />
          <q-btn flat label="Cancel" class="bg-red" v-close-popup />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { useMatchStore } from "src/stores/matchStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const matchStore = useMatchStore();
const {
  matchList,
  matchColumn,
  pagination,
  matchData,
  matchDialog,
  winChallengerDialog,
  winHostDialog,
  matchLoading,
} = storeToRefs(matchStore);
const {
  getMatchPending,
  getMatchClosed,
  getMatchOpen,
  openMatchPendingData,
  confirmChallengerWin,
  confirmHostWin,
  openChallengerWinDialog,
  openHostWinDialog,
} = matchStore;

onMounted(() => {
  getMatchPending();
});
</script>

<style lang="scss" scoped></style>
