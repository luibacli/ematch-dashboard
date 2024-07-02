import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
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
  },
});
