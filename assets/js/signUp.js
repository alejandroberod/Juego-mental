import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {auth} from "./firebase.js";

//Variables
const formulario = document.querySelector('#formulario');
const icon = document.querySelector('.campo .bi');

//Eventos
formulario.addEventListener("submit", registarUsuario);
icon.addEventListener('click', (e) => {
    icon.classList.toggle('bi-eye-fill');
    const inputPassword = formulario.querySelector('.password');
    if(inputPassword.type === 'password') {
        inputPassword.type = 'text';
    } else {
        inputPassword.type = 'password';
    }
})

//Funciones
async function registarUsuario(e) {
    e.preventDefault();
    const email = formulario.querySelector('input[type="text"]').value;
    const password = formulario.querySelector('input[type="password"]').value;
    
    try {
        const user = {email, password}
        if(!Object.values(user).every(user => user != '')) {
            imprimirAlerta('Debe rellenar todos los campos', 'error');
            return
        }
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userCredentials)
        imprimirAlerta('Registrado con éxito');
    } catch (error) {
        console.log(error)

        switch (error.code) {
            case 'auth/invalid-email':
                imprimirAlerta('El email proporcionado es inválido', 'error');
                break;

            case 'auth/weak-password':
                imprimirAlerta('Contraseña mín. 6 caracteres', 'error');
                break;
            
            case 'auth/email-already-in-use':
                imprimirAlerta('El email ya se encuentra registrado', 'error');
                break;
            
            default:
                break;
        }
    }
}

function imprimirAlerta(mensaje, tipo) {

    const alerta = document.querySelector('.alert-danger');

    if(!alerta) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('alert');
        tipo == 'error' ? divMensaje.classList.add('alert-danger') : divMensaje.classList.add('alert-success')
        divMensaje.textContent = mensaje;
        formulario.querySelector('.alert').appendChild(divMensaje);
    
        setTimeout(() => {
            divMensaje.remove()
        }, 2000);
    }

}