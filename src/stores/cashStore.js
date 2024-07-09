import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "src/boot/firebase";
import { Notify } from "quasar";
import { data } from "autoprefixer";

export const useCashStore = defineStore("cash", {
  state: () => ({
    cashinColumn: [
      {
        name: "sender",
        align: "center",
        label: "Sender",
        field: "sender",
      },
      {
        name: "balance",
        align: "center",
        label: "balance",
        field: "balance",
      },
      {
        name: "amount",
        align: "center",
        label: "Request Amount",
        field: "amount",
      },
      {
        name: "receiver",
        align: "center",
        label: "Receiver",
        field: "receiver",
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
    cashinList: [],
    cashinLoading: false,
    cashinDialog: false,
    cashinApproveDialog: false,
    cashinDeclineDialog: false,
    cashinData: {},
    cashinId: "",

    cashoutColumn: [
      {
        name: "sender",
        align: "center",
        label: "Sender",
        field: "sender",
      },
      {
        name: "balance",
        align: "center",
        label: "balance",
        field: "balance",
      },
      {
        name: "amount",
        align: "center",
        label: "Request Amount",
        field: "amount",
      },
      {
        name: "channel",
        align: "center",
        label: "Channel",
        field: "channel",
      },
      {
        name: "receiver",
        align: "center",
        label: "Receiver",
        field: "receiver",
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

    cashoutPagination: {
      page: 1,
      rowsPerPage: 15,
    },
    cashoutList: [],
    cashoutLoading: false,
    cashoutDialog: false,
    cashoutApproveDialog: false,
    cashoutDeclineDialog: false,
    cashoutData: {},
    cashoutId: "",
  }),

  actions: {
    async getCashinRequests() {
      try {
        const collectionRef = collection(db, "cashin");
        const querySnapShot = await getDocs(collectionRef);
        const cashinData = [];
        querySnapShot.forEach((doc) => {
          return cashinData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.cashinList = cashinData;
      } catch (error) {
        console.log(error);
      }
    },
    async getPendingDeposits() {
      this.cashinLoading = true;
      try {
        const collectionRef = collection(db, "cashin");
        const q = query(collectionRef, where("status", "==", "pending"));

        const pendingData = [];
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
          return pendingData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.cashinList = pendingData;
        this.cashinLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    async getApprovedDeposits() {
      this.cashinLoading = true;
      try {
        const collectionRef = collection(db, "cashin");
        const q = query(collectionRef, where("status", "==", "approved"));

        const pendingData = [];
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
          return pendingData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.cashinList = pendingData;
        console.log(this.cashinList);
        this.cashinLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    async getDeclinedDeposits() {
      this.cashinLoading = true;
      try {
        const collectionRef = collection(db, "cashin");
        const q = query(collectionRef, where("status", "==", "declined"));

        const pendingData = [];
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
          return pendingData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.cashinList = pendingData;
        this.cashinLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    openCashinRequest(item) {
      try {
        this.cashinDialog = true;
        this.cashinData = item || {};
        if (!this.cashinData) {
          console.log("Cashin Data not found");
        } else {
          console.log(this.cashinData);
        }
      } catch (error) {
        console.error(error);
      }
    },
    openApproveCashinRequest() {
      this.cashinApproveDialog = true;
    },
    openDeclineCashinRequest() {
      this.cashinDeclineDialog = true;
    },
    async approveCashinRequest() {
      this.cashinLoading = true;
      try {
        const docRef = doc(db, "cashin", this.cashinData.id);
        const userRef = doc(db, "users", this.cashinData.userRef);
        const userSnap = await getDoc(userRef);
        const data = userSnap.data();
        const currentBalance = Number(data.balance);
        const cashinAmount = Number(this.cashinData.amount);
        const newBalance = currentBalance + cashinAmount;
        await updateDoc(docRef, {
          status: "approved",
        });
        await updateDoc(userRef, {
          hasPendingCashin: false,
          balance: newBalance,
        });
        this.cashinApproveDialog = false;
        this.cashinDialog = false;
        Notify.create({
          color: "positive",
          message: "Successfully approved cashin request ",
        });
        this.cashinLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    async declineCashinRequest() {
      try {
        const docRef = doc(db, "cashin", this.cashinId);
        const userRef = doc(db, "users", this.cashinData.userRef);
        await updateDoc(docRef, {
          status: "declined",
        });
        await updateDoc(userRef, {
          hasPendingCashin: false,
        });
        this.cashinApproveDialog = true;
        Notify.create({
          color: "positive",
          message: "Successfully declined cashin request ",
        });
      } catch (error) {
        console.error(error);
      }
    },
    async getCashoutRequests() {
      try {
        const collectionRef = collection(db, "cashout");
        const querySnapShot = await getDocs(collectionRef);
        const cashoutData = [];
        querySnapShot.forEach((doc) => {
          return cashoutData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        this.cashoutList = cashoutData;
      } catch (error) {
        console.log(error);
      }
    },

    async getPendingWithraws() {
      this.cashoutLoading = true;
      try {
        const collectionRef = collection(db, "cashout");
        const q = query(collectionRef, where("status", "==", "pending"));

        const querySnapShot = await getDocs(q);

        const docSnap = [];
        querySnapShot.forEach((doc) => {
          return docSnap.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        this.cashoutList = docSnap;
        this.cashoutLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    async getApprovedWithraws() {
      this.cashoutLoading = true;
      try {
        const collectionRef = collection(db, "cashout");
        const q = query(collectionRef, where("status", "==", "approved"));

        const querySnapShot = await getDocs(q);

        const docSnap = [];
        querySnapShot.forEach((doc) => {
          return docSnap.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        this.cashoutList = docSnap;
        this.cashoutLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    async getDeclinedWithraws() {
      this.cashoutLoading = true;
      try {
        const collectionRef = collection(db, "cashout");
        const q = query(collectionRef, where("status", "==", "declined"));

        const querySnapShot = await getDocs(q);

        const docSnap = [];
        querySnapShot.forEach((doc) => {
          return docSnap.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        this.cashoutList = docSnap;
        this.cashoutLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    openCashoutRequest(item) {
      try {
        this.cashoutDialog = true;
        this.cashoutData = item || {};
        if (!this.cashoutData) {
          console.log("Cashin Data not found");
        } else {
          console.log(this.cashoutData);
        }
      } catch (error) {
        console.error(error);
      }
    },
    openApproveCashoutRequest() {
      this.cashoutApproveDialog = true;
    },
    openDeclineCashoutRequest() {
      this.cashoutDeclineDialog = true;
    },
    async approveCashoutRequest() {
      this.cashoutLoading = true;
      try {
        const docRef = doc(db, "cashout", this.cashoutData.id);
        const userRef = doc(db, "users", this.cashoutData.userRef);
        const userSnap = await getDoc(userRef);
        const data = userSnap.data();

        await updateDoc(docRef, {
          status: "approved",
        });
        await updateDoc(userRef, {
          hasPendingCashout: false,
        });
        this.cashoutApproveDialog = false;
        this.cashoutDialog = false;
        Notify.create({
          color: "positive",
          message: "Successfully approved cashout request ",
        });
        this.cashoutLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
    async declineCashoutRequest() {
      try {
        const docRef = doc(db, "cashin", this.cashoutData.id);
        const userRef = doc(db, "users", this.cashoutData.userRef);
        await updateDoc(docRef, {
          status: "declined",
        });
        await updateDoc(userRef, {
          hasPendingCashout: false,
        });
        this.cashoutApproveDialog = true;
        Notify.create({
          color: "positive",
          message: "Successfully declined cashout request ",
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
