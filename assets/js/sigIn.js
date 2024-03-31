import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {auth} from "./firebase.js";

const formulario = document.querySelector('#formulario');
const icon = document.querySelector('.campo .bi');

//Eventos
formulario.addEventListener("submit", registarUsuario);
icon.addEventListener('click', (e) => {
    console.log('hola')
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
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredentials)
        imprimirAlerta('Inicio de sesión exitoso, bienvenido');

        setTimeout(() => {
            window.location.href = '../views/game.html'
        }, 2000);
    } catch (error) {
        console.log(error)

        switch (error.code) {
            case 'auth/invalid-email':
                imprimirAlerta('El email proporcionado es inválido', 'error');
                break;

            case 'auth/invalid-credential':
                imprimirAlerta('El email o contraseña no son válidos', 'error');
                break;
            
            case 'auth/too-many-requests':
                imprimirAlerta('Su cuenta ha sido desabilitada por cuestiones de seguridad intentelo más tarde o cambie su contraseña', 'error');
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