import { data } from "autoprefixer";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "src/boot/firebase";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    users: 0,
    matches: 0,
    deposits: 0,
    withdraws: 0,
  }),
  actions: {
    async getTotalUsers() {
      try {
        const collectionRef = collection(db, "users");
        const docSnap = await getDocs(collectionRef);
        const usersData = [];
        docSnap.forEach((doc) => {
          return usersData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.users = usersData.length;
        console.log("number of users:", this.users);
      } catch (error) {
        console.error(error);
      }
    },

    async getTotalMatches() {
      try {
        const collectionRef = collection(db, "matches");
        const docSnap = await getDocs(collectionRef);
        const matchData = [];

        docSnap.forEach((doc) => {
          return matchData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.matches = matchData.length;
      } catch (error) {
        console.error(error);
      }
    },

    async getTotalDeposits() {
      try {
        const collectioRef = collection(db, "cashin");
        const q = query(collectioRef, where("status", "==", "approved"));

        const querySnapShot = await getDocs(q);

        const depositData = [];
        querySnapShot.forEach((doc) => {
          return depositData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        let getTotalDeposits = 0;
        depositData.forEach((doc) => {
          return (getTotalDeposits = doc.amount++);
        });
        this.deposits = getTotalDeposits;
      } catch (error) {
        console.error(error);
      }
    },

    async getTotalWithdraws() {
      try {
        const collectioRef = collection(db, "cashout");
        const q = query(collectioRef, where("status", "==", "approved"));

        const querySnapShot = await getDocs(q);

        const withdrawData = [];
        querySnapShot.forEach((doc) => {
          return withdrawData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        let getTotalWithdraw = 0;
        withdrawData.forEach((doc) => {
          return (getTotalWithdraw = doc.amount++);
        });
        this.withdraws = getTotalWithdraw;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
