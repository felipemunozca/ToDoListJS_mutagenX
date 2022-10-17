/**
 * VARIABLES
 */
const dia = document.querySelector('#dia');
const fecha = document.querySelector('#fecha');
const inputTarea = document.querySelector('#input-tarea');
const botonMas = document.querySelector('#boton-mas');
const lista = document.querySelector('#lista');
const mensaje = document.querySelector('#mensaje')

const checkeado = 'fa-check-circle';
const noCheckeado = 'fa-circle';
const subrayar = 'subrayar';
const oscurecer = 'oscurecer-fondo';

let id = Date.now();
let arregloTareas = [];

/**
 * EVENTOS.
 */

// Evento al presionar el botón +.
botonMas.addEventListener('click', () => {
    const tarea = inputTarea.value;

    if (tarea == '') {
        alert('Debe agregar una tarea.');
    } else if (tarea) {
        agregarTarea(tarea, id, false);

        arregloTareas.push({
            nombre: tarea,
            id: id,
            realizado: false
        });

        localStorage.setItem('TAREAS', JSON.stringify(arregloTareas));

        inputTarea.value = '';
    }
});

// Evento al presionar los iconos check y basurero.
lista.addEventListener('click', (e) => {
    const elemento = e.target;
    

    if (elemento.classList.contains('real')) {
        completarTarea(elemento);
    }

    if (elemento.classList.contains('elim')) {
        eliminarTarea(elemento);
    }

    localStorage.setItem('TAREAS', JSON.stringify(arregloTareas));
});

/**
 * FUNCIONES.
 */

// Función para agregar la fecha.
const cargarFecha = () => {
    const rescatarFecha = new Date();
    fecha.innerHTML = rescatarFecha.toLocaleDateString('es-CL',{month: 'long', day:'numeric', year: 'numeric'});
    dia.innerHTML = rescatarFecha.toLocaleDateString('es-CL',{weekday: 'long'})
}

// Función para agregar una nueva tarea a la lista.
const agregarTarea = (tarea , id, realizado) => {

    const revisarCheck = realizado ? checkeado : noCheckeado;

    const revisarSubrayar = realizado ? subrayar : '';

    const revisarOscurecer = realizado ? oscurecer : '';

    const elemento = `
        <li class="prueba ${revisarOscurecer}">
            <i class="far ${revisarCheck} real" data="realizado" id="${id}"></i>
            <p class="text ${revisarSubrayar}">${tarea}</p>
            <i class="fas fa-trash de elim" data="eliminado" id="${id}"></i> 
        </li>
    `;

    lista.insertAdjacentHTML("beforeend", elemento);
}

// Función para validar la tarea completa y cambiar los estilos visuales.
const completarTarea = (elemento) => {

    elemento.classList.toggle(checkeado);
    elemento.classList.toggle(noCheckeado);

    elemento.parentNode.querySelector('.text').classList.toggle(subrayar);

    elemento.parentNode.classList.toggle(oscurecer);

}

// Función para eliminar una tarea.
const eliminarTarea = (elemento) => {
    elemento.parentNode.parentNode.removeChild(elemento.parentNode);
    arregloTareas.splice(elemento, 1);
    console.log('Tarea eliminada.')

    location.reload();
}

// Función para actualizar el listado de tareas.
const actualizarLista = () => {
    let data = localStorage.getItem('TAREAS');

    if (data) {
        arregloTareas = JSON.parse(data);
        cargarLista(arregloTareas);

        if ((arregloTareas.length - 1) < 0) {
            mensaje.style.display = "block";
        } else {
            mensaje.style.display = "none";
        }
    }
}

// Función para cargar la lista de tareas desde el localStorage.
const cargarLista = (recibirData) => {
    recibirData.forEach(item => {
        agregarTarea(item.nombre, item.id, item.realizado);
    });
}

/**
 * INICIALIZAR FUNCIONES.
 */

cargarFecha();
actualizarLista();