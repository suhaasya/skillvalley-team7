// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
