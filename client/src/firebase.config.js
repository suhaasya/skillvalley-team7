import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIX3D-AVFiRt9t5-dQ9A-M3GWN82W_R9c",
  authDomain: "svt7-b533b.firebaseapp.com",
  projectId: "svt7-b533b",
  storageBucket: "svt7-b533b.appspot.com",
  messagingSenderId: "976546716350",
  appId: "1:976546716350:web:0ff64d8c895509810edcef",
  measurementId: "G-NH2RG6CQ5T",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
