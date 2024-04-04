//Variables
const formulario = document.querySelector('#form');

//Eventos
formulario.addEventListener('submit', validar);

//Funciones 
function validar(e) {
    e.preventDefault();
    const perfil = formulario.querySelector('input[type="text"]').value;

    if (perfil == '') {
        imprimirAlerta('El campo no puede estar vacío', 'error')
        return;
    }
    imprimirAlerta(`Bienvenido ${perfil}`)
    setStorage(perfil);

}


function imprimirAlerta(mensaje, tipo) {

    const alerta = document.querySelector('.alert-danger');

    if(!alerta) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('alert');
        divMensaje.style.width = '50%';
        divMensaje.style.margin = '20px auto';
        divMensaje.style.textAlign = 'center';
        tipo == 'error' ? divMensaje.classList.add('alert-danger') : divMensaje.classList.add('alert-success')
        divMensaje.textContent = mensaje;
        formulario.querySelector('.alert').appendChild(divMensaje);
    
        setTimeout(() => {
            divMensaje.remove()
        }, 2000);
    }

}

function setStorage(perfil) {
    const id = Date.now();
    const url = new URL('../views/game.html', window.location.href);
    console.log(url)
    url.searchParams.set('id', id);
    window.location.href = url.href;
    const jugador = {
        perfil,
        puntaje: 0
    }
    localStorage.setItem(`${id}`, JSON.stringify(jugador));
}