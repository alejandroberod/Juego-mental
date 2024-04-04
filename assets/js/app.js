//Variables
const url = 'https://api-9bd93-default-rtdb.firebaseio.com/api/users.json';
const content = document.querySelector('.content');
const formulario = document.querySelector('#form');
const count = document.querySelector('.contador');
const infoLocalStorage = localStorage.getItem('id') || [];
let regresiva; //La declaro aquí para poder borrar el setInterval con 'resetContador'

//Eventos
formulario.addEventListener('change', (e) => {
    ajustarGrid(e.target.value);
    resetContador();
    limpiarHTML();
})


//Funciones

function ajustarGrid(nivel) {
    switch (nivel) {
        case 'easy':
            columnas = 2;
            tiempo = 10;
            break;
        case 'medium':
            columnas = 4;
            tiempo = 60;
            break;
        case 'hard':
            columnas = 4;
            tiempo = 120;
            break;
        case 'legend':
            columnas = 4
            tiempo = 180;
            break; 
    }
    content.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    cargarJson(nivel);
    
}

async function cargarJson(nivel) {
    const response = await fetch(url)
    const result = await response.json()
    insertarHTML(result, nivel);
}


let contador = 0;
function insertarHTML(users, nivel) {
    switch (nivel) {
        case 'easy':
            datos = 2
            tiempo = 30
            break;
        case 'medium':
            datos = 4
            tiempo = 60
            break;
        case 'hard':
            datos = 8
            tiempo = 120
            break;
        case 'legend':
            datos = 16
            tiempo = 180
            break;
    }
    //Se agarra el arreglo y mediante sort se desordena para posteriormente, mediante slice, cortar el arreglo dependiendo el nivel de dificultad escogido por el usuario
    const randomCut = users.sort((a,b) => Math.random() - 0.5).slice(0, +datos);  
    const almacenUsuarios = [...randomCut];
    const usuarios = [...randomCut, ...almacenUsuarios].sort((a,b) => Math.random() - 0.5);
    usuarios.forEach(user => {
        const {id, nickname, nombre, valor} = user;
        const cartas = document.createElement('div');
        cartas.classList.add('cartas', 'cartas-before');
        cartas.dataset.id = id;
        cartas.innerHTML += `
        <div class="carta carta-front">
            <img src="../assets/img/${id}.svg" data-id="${id}" alt="Emoji" class="img-emoji">
        </div>
        <div class="carta carta-back">
            <img src="../assets/img/Rectangle 3.svg" data-id="${id}" alt="Imagen Carta" class="img-rectangle">
        </div>
        `
        content.appendChild(cartas);
        
        cartas.addEventListener('click', validarAll)
    });
    voltearCartas(tiempo);
}

function voltearCartas(tiempo) {
    const cara = document.querySelectorAll('.carta');
    const cartas = document.querySelectorAll('.cartas');//Selecciono las cartas

    //Bloqueo las caras
    cartas.forEach(carta => {
        carta.style.pointerEvents = 'none';
    })
    setTimeout(() => {
        cartas.forEach(carta => {
            carta.style.pointerEvents = 'auto';
        })
        cuentaRegresiva(tiempo);
    }, 4000);

    //Se dan vuelta las caras
    cara.forEach(cara => {
        cara.classList.toggle('carta-back');
        cara.classList.toggle('carta-front');
    })

    setTimeout(() => {
        cara.forEach(cara => {
            cara.classList.toggle('carta-back');
            cara.classList.toggle('carta-front');
        })

    }, 1000);
    setTimeout(() => {
        cara.forEach(cara => {
            cara.classList.toggle('carta-back');
            cara.classList.toggle('carta-front');
        })

    }, 3000);

}


function validarAll(e) {
    let carta;
    if(e.target.classList.contains('cartas')){
        carta = e.target;
    } else if(e.target.classList.contains('img-rectangle') || e.target.classList.contains('img-emoji')) {
        carta = e.target.parentElement.parentElement
    }
    const cara = carta.querySelectorAll('.carta');
    voltearCarta(cara);  
    verificarId(carta);
}

function voltearCarta(cara) {
    
    cara.forEach(carta => {
        carta.classList.toggle('carta-back');
        carta.classList.toggle('carta-front');
    })

}

let cartasV = []
let array = []
function verificarId(carta) {
     cartasV.push(carta);
    const id = +carta.dataset.id;
    array.push(id);
    if (array.length == 2) {
        if (array.every((id, i, array) => id === array[0])) {
            validar('correcto', cartasV);
            array = [];
            cartasV = []
        } else {
            validar('incorrecto', cartasV);
            array = [];
            cartasV = []
        }
    } else {
        carta.style.pointerEvents = 'none'
    }
    
}

function validar(tipo, cartasV) {
    if (tipo == 'correcto') {
        cartasV.forEach(carta => {
            setTimeout(() => {
                carta.classList.add('correcto');
                
            }, 1000);
            carta.style.pointerEvents = 'none'
        })
    } else {
        cartasV.forEach(carta => {
            carta.style.pointerEvents = 'auto'
            const cara = carta.querySelectorAll('.carta');
            setTimeout(() => {
                carta.classList.add('incorrecto');
                
            }, 1000);
            setTimeout(() => {
                carta.classList.remove('incorrecto');
                voltearCarta(cara);
            }, 1500);
        })
    }
}

function limpiarHTML() {
    content.innerHTML = '';
}

function cuentaRegresiva(tiempo) {
    
    
    regresiva = setInterval(() => {
        tiempo--
        // console.log(tiempo)
        
        let minutos = Math.floor(tiempo/60);
        let segundos = tiempo%60;

        if (minutos == 0 && segundos == 0) {
            clearInterval(regresiva);
        }
        minutos < 10 ? minutos = '0' + minutos : null
        segundos < 10 ? segundos = '0' + segundos : null
        
        count.textContent = `${minutos}:${segundos}`
    }, 1000);

}

function resetContador() {
    clearInterval(regresiva)
    count.textContent = '00:00'
}


console.log(userLocalStorage)
localStorage.setItem('user', 'Luis')


localStorage.setItem('user', 'Alejandro')


