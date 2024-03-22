import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlPC7Mns1Iv5dwMvNWa9TsgMuSOc2jtm8",
  authDomain: "nekkhamma-login.firebaseapp.com",
  projectId: "nekkhamma-login",
  storageBucket: "nekkhamma-login.appspot.com",
  messagingSenderId: "528956750974",
  appId: "1:528956750974:web:03306cae92607eb8abac2f",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);