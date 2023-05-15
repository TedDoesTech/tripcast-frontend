import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAamgO3QTkYaAeX3At5xeBy9dhCZ487XZU",
  authDomain: "tripcast-52f65.firebaseapp.com",
  projectId: "tripcast-52f65",
  storageBucket: "tripcast-52f65.appspot.com",
  messagingSenderId: "85324388900",
  appId: "1:85324388900:web:9c26e4a16700997215d6b1",
  measurementId: "G-9K5SZB75SP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
