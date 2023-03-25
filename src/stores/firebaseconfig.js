
//Firebase
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD9zX8JwSCNLssHnB1kzM4ckGhaTbEv84",
  authDomain: "eventie-d9847.firebaseapp.com",
  projectId: "eventie-d9847",
  storageBucket: "eventie-d9847.appspot.com",
  messagingSenderId: "493374462570",
  appId: "1:493374462570:web:3f03c690425971d3458813",
  measurementId: "G-4S81RGK1ZB"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export {auth}