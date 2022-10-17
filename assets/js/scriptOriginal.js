// variables
const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const elemento = document.querySelector('#elemento');
const input = document.querySelector('#input-tarea');
const botonEnter = document.querySelector('#boton-mas');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let LIST;
// para que inicie en 0 cada tarea tendra un id diferente
let id; 

//creacion de fecha actualizada 
const FECHA = new Date ();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month: 'short', day:'numeric'});


// funcion de agregar tarea
function agregarTarea(tarea, id, realizado, eliminado) {
    // si existe eliminado es true si no es false 
    if(eliminado) {return} 

    // si realizado es verdadero check si no uncheck
    const REALIZADO = realizado ? check : uncheck;

    const LINE = realizado ? lineThrough : '';

    const elemento = `
        <li id="elemento">
            <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
            <p class="text ${LINE}">${tarea}</p>
            <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
        </li>
    `;

    lista.insertAdjacentHTML("beforeend", elemento);
}


// funcion de Tarea Realizada 
function tareaRealizada(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true; //Si
   // console.log(LIST)
   // console.log(LIST[element.id])
   // console.log(LIST[element.id].realizado)
}

// funcion de Tarea Eliminada.
function tareaEliminada(element){
   // console.log(element.parentNode)
   // console.log(element.parentNode.parentNode)
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].eliminado = true;
    // console.log(LIST);
}

// crear un evento para escuchar el boton mas para agregar una tarea.
botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea, id, false, false);
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })

        localStorage.setItem('TODO',JSON.stringify(LIST));
        id++;
        input.value = '';
    }
})

// crear un evento para escuchar la tecla enter para agregar una tarea.
document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value;
        if(tarea) {
            agregarTarea(tarea, id, false, false)
            LIST.push({
                nombre : tarea,
                id : id,
                realizado : false,
                eliminado : false
            })

            localStorage.setItem('TODO',JSON.stringify(LIST));
            id++;
            input.value = '';
            //console.log(LIST)
        }
    }
})

// crear un evento para escuchar cuando se presione los iconos en cada tarea.
lista.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value
    console.log(elementData)
    
    if (elementData == 'realizado') {
        tareaRealizada(element)
        console.log("realizado.")
    } else if (elementData == 'eliminado') {
        tareaEliminada(element)
        console.log("elimnado.")
    }

    localStorage.setItem('TODO',JSON.stringify(LIST))
})


let data = localStorage.getItem('TODO')
if (data){
    LIST = JSON.parse(data);
    console.log(LIST);
    id = LIST.length;
    cargarLista(LIST)
    console.log(LIST)
} else {
    LIST = [];
    id = 0;
}

function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre, item.id, item.realizado, item.eliminado)
    })
}
console.log(LIST)