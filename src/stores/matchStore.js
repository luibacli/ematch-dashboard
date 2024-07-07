import {
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { Notify } from "quasar";
import { db } from "src/boot/firebase";

export const useMatchStore = defineStore("match", {
  state: () => ({
    matchColumn: [
      {
        name: "id",
        align: "center",
        label: "Match ID",
        field: "id",
      },
      {
        name: "host",
        align: "center",
        label: "Host",
        field: "host",
      },
      {
        name: "challenger",
        align: "center",
        label: "Challenger",
        field: "challenger",
      },
      {
        name: "bet",
        align: "center",
        label: "Bet",
        field: "bet",
      },
      {
        name: "status",
        align: "center",
        label: "status",
        field: "status",
      },
      {
        name: "actions",
        field: "actions",
        label: "ACTIONS",
        align: "center",
        style: "width: 100px",
      },
    ],
    pagination: {
      page: 1,
      rowsPerPage: 15,
    },
    matchList: [],
    matchLoading: false,
    matchDialog: false,
    winHostDialog: false,
    winChallengerDialog: false,
    matchData: {},
    matchId: "",
  }),

  actions: {
    async getMatchPending() {
      try {
        const collectionRef = collection(db, "matches");
        const q = query(collectionRef, where("status", "==", "Pending"));

        const querySnapshot = await getDocs(q);
        const matchData = [];
        querySnapshot.forEach((doc) => {
          return matchData.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        this.matchList = matchData;
        console.log("match data:", matchData);
        console.log("match list:", this.matchList);
      } catch (error) {
        console.error(error);
      }
    },
    async openMatchPendingData(item) {
      try {
        this.matchDialog = true;
        this.matchData = item || {};
        if (!this.matchData) {
          throw new Error("Match data not found");
        } else {
          console.log(this.matchData);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async confirmHostWin() {
      this.matchLoading = true;
      try {
        const docRef = doc(db, "matches", this.matchData.id);
        const userRef = doc(db, "users", this.matchData.userRef);
        const challengerRef = doc(db, "users", this.matchData.challengerRef);
        const userSnap = await getDoc(userRef);
        const data = userSnap.data();
        const matchBet = Number(this.matchData.totalBet);
        const playerBalance = Number(data.balance);
        const newBalance = matchBet + playerBalance;
        await updateDoc(docRef, {
          status: "Closed",
          winner: `${this.matchData.host}`,
          winnerId: `${this.matchData.userRef}`,
        });
        await updateDoc(userRef, {
          isHost: false,
          currentMatchId: "",
          balance: newBalance,
          hasPendingMatch: false,
        });
        await updateDoc(challengerRef, {
          isChallenger: false,
          currentMatchId: "",
          hasPendingMatch: false,
        });
        Notify.create({
          color: "positive",
          message: "Sucessfully set winner to Host!",
          position: "top",
        });
        this.winHostDialog = false;
        this.matchDialog = false;
        this.matchLoading = false;
      } catch (error) {
        console.error(error);
      }
    },

    async confirmChallengerWin() {
      this.matchLoading = true;
      try {
        const docRef = doc(db, "matches", this.matchData.id);
        const userRef = doc(db, "users", this.matchData.userRef);
        const challengerRef = doc(db, "users", this.matchData.challengerRef);
        const userSnap = await getDoc(userRef);
        const data = userSnap.data();
        const matchBet = Number(this.matchData.totalBet);
        const playerBalance = Number(data.balance);
        const newBalance = matchBet + playerBalance;
        await updateDoc(docRef, {
          status: "Closed",
          winner: `${this.matchData.challenger}`,
          winnerId: `${this.matchData.challengerRef}`,
        });
        await updateDoc(challengerRef, {
          isChallenger: false,
          currentMatchId: "",
          balance: newBalance,
          hasPendingMatch: false,
        });

        await updateDoc(userRef, {
          isHost: false,
          currentMatchId: "",
          hasPendingMatch: false,
        });
        Notify.create({
          color: "positive",
          message: "Sucessfully set winner to Challenger!",
          position: "top",
        });
        this.winChallengerDialog = false;
        this.matchDialog = false;
        this.matchLoading = false;
      } catch (error) {
        console.error(error);
      }
    },

    openHostWinDialog() {
      this.winHostDialog = true;
    },
    openChallengerWinDialog() {
      this.winChallengerDialog = true;
    },
  },
});
