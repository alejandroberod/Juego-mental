import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyB9RXhqNYu4CCvD5YNKr3f8Am2qERFRiMk",
  authDomain: "login-juego-b8d1f.firebaseapp.com",
  projectId: "login-juego-b8d1f",
  storageBucket: "login-juego-b8d1f.appspot.com",
  messagingSenderId: "198191493749",
  appId: "1:198191493749:web:87aecaec0b6aab5534fe3c"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


