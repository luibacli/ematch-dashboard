import { collection, doc, getDocs } from "firebase/firestore";
import { defineStore } from "pinia";
import { db } from "src/boot/firebase";

export const useUserStore = defineStore("user", {
  state: () => ({
    userColumn: [
      {
        name: "displayName",
        align: "center",
        label: "Users",
        field: "displayName",
      },
      {
        name: "email",
        align: "center",
        label: "Email",
        field: "email",
      },
      {
        name: "balance",
        align: "center",
        label: "Balance",
        field: "balance",
      },
      {
        name: "phoneNumber",
        align: "center",
        label: "Mobile",
        field: "phoneNumber",
      },
    ],
    users: [],
    pagination: {
      page: 1,
      rowsPerPage: 15,
    },
  }),
  actions: {
    async getUsers() {
      try {
        const usersRef = collection(db, "users");
        const userData = [];
        const querySnapshot = await getDocs(usersRef);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          userData.push(data);
        });
        this.users = userData;
        console.log(this.users);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
