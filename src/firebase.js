import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvxufl4LGDPC1kHFaFDUBTN461EA1zCUE",
  authDomain: "clouddemo-2e42b.firebaseapp.com",
  projectId: "clouddemo-2e42b",
  storageBucket: "clouddemo-2e42b.appspot.com",
  messagingSenderId: "644022241974",
  appId: "1:644022241974:web:2b15ab8d7582462963b417",
  measurementId: "G-GVK1EF2WF5"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

