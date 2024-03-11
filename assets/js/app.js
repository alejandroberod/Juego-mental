//Variables
const url = 'http://127.0.0.1:5500/User.json';
const content = document.querySelector('.content');
const formulario = document.querySelector('#form');

//Eventos
formulario.addEventListener('change', (e) => {
    ajustarGrid(e.target.value)
})


//Funciones
async function cargarJson(datos) {
    const response = await fetch(url)
    const result = await response.json()
    insertarHTML(result, datos);
}

let contador = 0;
function insertarHTML(users, datos) {
    const random = users.sort((a,b) => Math.random() - 0.5);
    const num = +datos + 1;
    const usuarios = random.slice(0, +datos)
    console.log(usuarios)
    usuarios.forEach(user => {
        const {id, nickname, nombre, valor} = user;
        const cards = document.createElement('div');
        cards.classList.add('col');
        cards.innerHTML += `
            <div class="card" id="${id}" style="width: 18rem;">
                <div class="card-body">
                    <img src="./assets/img/${id}.jpg" alt="fruta">
                </div>
            </div>
        `
        content.appendChild(cards);
        
        cards.addEventListener('click', leerNombre)
    });
}

function leerNombre(e) {
    console.log(e.target)
    contador >= 0 && contador < 1 ? (console.log('clickea otro más '), contador += 1) : (console.log('ya no se puede clickear más'))
}

function ajustarGrid(columnas) {
    content.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
    cargarJson(columnas);
}