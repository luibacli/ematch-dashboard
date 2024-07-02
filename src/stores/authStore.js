import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import { auth, db } from "src/boot/firebase";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loginForm: {
      email: "",
      password: "",
    },
    registerForm: {
      id: "",
      displayName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      balance: 0,
      wins: 0,
      loss: 0,
      matchAccepted: [],
      isAdmin: false,
      isHost: false,
      isChallenger: false,
      isAccepted: false,
    },
    userData: {},
    userId: "",
    userName: "",
    isAuthenticated: ref(false),
    isLoading: false,
  }),
  actions: {
    async login() {
      try {
        const data = this.loginForm;
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = userCredential.user;
        if (user) {
          this.userId = user.uid;
          const docRef = doc(db, "admins", this.userId);
          const docSnap = await getDoc(docRef);
          const userData = docSnap.data();
          if (!userData.isAdmin) {
            throw new Error("Invalid Credentials");
          } else {
            this.userData = userData || {};
            this.isAuthenticated = true;
            this.router.push("/");
            console.log("userData:", userData);
            console.log("user:", user);
          }
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        console.error(error);
      }
    },

    monitorAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("You are logged in");
          this.isAuthenticated = true;
          console.log("monitor auth", this.isAuthenticated);
          return true;
        } else {
          console.log("You are not logged in");
          return false;
        }
      });
    },

    async logout() {
      await signOut(auth);
      this.isAuthenticated = false;
      this.router.push("/login");
    },
  },
});
