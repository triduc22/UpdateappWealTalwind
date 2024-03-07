// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Add yourshelft
import {getAuth} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxizco8zv3MQXKghO92z4uxUTleVFHlXE",
  authDomain: "login-react-native-8e4b1.firebaseapp.com",
  projectId: "login-react-native-8e4b1",
  storageBucket: "login-react-native-8e4b1.appspot.com",
  messagingSenderId: "1053790444081",
  appId: "1:1053790444081:web:14ffd5fcc4d7fa05921310"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Auth object for the default app
const auth = getAuth();
export { auth };

// export const auth = getAuth(app);