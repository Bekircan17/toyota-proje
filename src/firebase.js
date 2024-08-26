import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCh0j_v7F1jAUhc7HwBiW1y2eSG3N4pncQ",
  authDomain: "toyota-7f3cf.firebaseapp.com",
  projectId: "toyota-7f3cf",
  storageBucket: "toyota-7f3cf.appspot.com",
  messagingSenderId: "659964922938",
  appId: "1:659964922938:web:50488705b5e2e531c6f903"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;