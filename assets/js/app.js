//Variables
const url = 'http://127.0.0.1:5500/User.json';
const content = document.querySelector('.content');

//Eventos



//Funciones
cargarJson()
async function cargarJson() {
    const response = await fetch(url)
    const result = await response.json()
    insertarHTML(result);
}

let contador = 0;
function insertarHTML(users) {
    users.forEach(user => {
        const {id, nickname, nombre, valor} = user;
        const cards = document.createElement('div');
        cards.innerHTML += `
        <div class="col">
            <div class="card" id="${id}" style="width: 18rem;">
                <div class="card-body">
                    ?
                </div>
            </div>
        </div>
        `
        content.appendChild(cards);
        
        cards.addEventListener('click', leerNombre)
    });
}

function leerNombre(e) {
    console.log(e.target)
    contador >= 0 && contador < 2 ? (console.log('clickea otro más '), contador += 1) : (console.log('ya no se puede clickear más'))
}