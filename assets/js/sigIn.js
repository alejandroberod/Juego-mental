import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {auth} from "./firebase.js";

const formulario = document.querySelector('#formulario');

//Eventos
formulario.addEventListener("submit", registarUsuario);

//Funciones
async function registarUsuario(e) {
    e.preventDefault();
    const email = formulario.querySelector('input[type="text"]').value;
    const password = formulario.querySelector('input[type="password"]').value;

    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredentials)
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    }
}