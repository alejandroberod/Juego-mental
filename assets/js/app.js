//Variables
const url = 'https://api-9bd93-default-rtdb.firebaseio.com/api/users.json';
const content = document.querySelector('.content');
const formulario = document.querySelector('#form');

//Eventos
formulario.addEventListener('change', (e) => {
    ajustarGrid(e.target.value);
    limpiarHTML();
    ocultarCards()
})


//Funciones
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
            break;
        case 'medium':
            datos = 4
            break;
        case 'hard':
            datos = 8
            break;
        case 'legend':
            datos = 16
            break;
    }
    //Se agarra el arreglo y mediante sort se desordena para posteriormente, mediante slice, cortar el arreglo dependiendo el nivel de dificultad escogido por el usuario
    const randomCut = users.sort((a,b) => Math.random() - 0.5).slice(0, +datos);  
    const almacenUsuarios = [...randomCut];
    const usuarios = [...randomCut, ...almacenUsuarios].sort((a,b) => Math.random() - 0.5);
    usuarios.forEach(user => {
        const {id, nickname, nombre, valor} = user;
        const cards = document.createElement('div');
        cards.classList.add('col');
        cards.innerHTML += `
            <div class="card" id="${id}" style="width: 18rem;">
                <div class="card-body">
                    <img src="../assets/img/${id}.svg" alt="fruta" class="img">
                </div>
            </div>
        `
        content.appendChild(cards);
        
        cards.addEventListener('click', contarIntentos)
    });
}

function contarIntentos(e) {
    let id;
    if(e.target.classList.contains('img')) {
        id = +e.target.parentElement.parentElement.id;
    } else if(e.target.classList.contains('card-body')) {
        id = +e.target.parentElement.id;
    } else {
        id = +e.target.id;
    }
    leerId(id);
    contador >= 0 && contador <= 1 ? (console.log('click otro más'), contador += 1) : (console.log('ya no se puede clickear más'))
}

function ajustarGrid(nivel) {
    switch (nivel) {
        case 'easy':
            columnas = 2
            break;
        case 'medium':
            columnas = 4
            break;
        case 'hard':
            columnas = 4
            break;
        case 'legend':
            columnas = 4
            break; 
    }
    content.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    cargarJson(nivel);
}

function limpiarHTML() {
    content.innerHTML = '';
}


let array = [];
function leerId(id) {
    array.push(id);
    if (array.length == 2) {
        if (array.every((id, i, array) => id === array[0])) {
            console.log('correcto');
        } else {
            console.log('incorrecto');
            array = [];
        }
    }
}


function ocultarCards() {
    setTimeout(() => {
        document.querySelectorAll('.card-body img').forEach(img => {
            img.style.opacity = '0';
        });

    }, 3000);

}