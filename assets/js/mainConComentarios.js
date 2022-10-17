/**
 * Declaración de las variables que se rescatan desde el index.html
 */
const dia = document.querySelector('#dia');
const fecha = document.querySelector('#fecha');
const inputTarea = document.querySelector('#input-tarea');
const botonMas = document.querySelector('#boton-mas');
const lista = document.querySelector('#lista');
const mensaje = document.querySelector('#mensaje')

/**
 * Declaración de variables que se utilizaran para cambiar los estilos CSS.
 */
const checkeado = 'fa-check-circle';
const noCheckeado = 'fa-circle';
const subrayar = 'subrayar';
const oscurecer = 'oscurecer-fondo';

/**
 * Declaración de variables que se utilizaran dentro de JS.
 * id sera igual al valor de la fecha y hora en el momento justo en que se agregue una nueva tarea, de esta forma se evita
 *      que se comiencen a agregar nuevamente id repetidos.
 */
let id = Date.now();
let arregloTareas = [];

/**
 * EVENTOS.
 */

/**
 * Evento al presionar el botón +.
 * Se crea una constante llamada "tarea" la que tendrá el valor que se escriba en el input.
 * Si se presiona el botón + y no se ha escrito nada, aparecerá una alerta indicándole al usuario que debe hacerlo.
 * Si dentro del input viene una tarea, se llama a la función agregarTarea, la cual envía 3 valores.
 * Se quita el parametro eliminado, ya que en el codigo original en vez de eliminar solo ocultaba la informacion, por
 *      lo que al llamar al arreglo desde la consola, se podian ver las tareas que se suponian eliminadas.
 * Luego se llama al arregloTareas y mediante el método push que significa "empujar o meter" elemento a un arreglo,
 *      se pasan los valores que tendrá cada elemento, por defecto, realizado sera false.
 * Para guardar la información de los arreglos de forma local, se puede hacer mediante:
 *      sessionStorage: almacenamiento solo en la sesión.
 *      localStorage: almacenamiento incluso si se cierra la sesión.
 * LocalStorage tiene dos métodos distintos de uso:
 *      setItem: para agregar información.
 *      getItem: para obtener información.
 * En este caso, setItem recibe dos parámetros:
 *      el primero será el nombre que le asignare (puede ser cualquiera), 
 *      el segundo JSON.stringify()
 * JSON: es una forma de crear un archivo en formato texto para almacenar información.
 * stringify: método para convertir la información a formato JSON.
 * Dentro del paréntesis, debe ir el arreglo desde donde se leerá la data.
 * Finalmente, se limpia el texto escrito en el valor igualándolo a vacío.
 */
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

/**
 * Evento al presionar los iconos check y basurero.
 * Al presionar uno de los iconos, la constante elemento recibe todo el valor de la etiqueta <i>.
 * En la primera validación, si existe una clase que contenga la palabra "real", 
 *      se ejecutará la función completarTarea a la que se le pasa elemento como atributo.
 * En la segunda validación, si existe una clase que contenga la palabra "elim", 
 *      se ejecutará la función eliminarTarea a la que se le pasa elemento como atributo.
 * Se llama a TAREAS para actualizar la información que existe en localStorage.
 */
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

/**
 * Función para agregar la fecha.
 * La propiedad new Date() se utiliza para llamar a la función date que viene integrada al navegador.
 * La propiedad innerHTML() es el espacio de código dentro de un elemento.
 * El método toLocaleDateString() recibe dos parámetros iniciales:
 * El primero es el lenguaje, para este caso español chile. El segundo es el formato de la fecha.
 */
const cargarFecha = () => {
    const rescatarFecha = new Date();
    fecha.innerHTML = rescatarFecha.toLocaleDateString('es-CL',{month: 'long', day:'numeric', year: 'numeric'});
    dia.innerHTML = rescatarFecha.toLocaleDateString('es-CL',{weekday: 'long'})
}

/**
 * Función para agregar una nueva tarea a la lista.
 * La tarea deberá tener como parámetros: la tarea, el id de identificación, si esta o no realizada.
 * Creo la constante "revisarCheck" la cual se encarga de revisar si el botón check esta presionado o no,
 *      para ello se puede usar un if-else, pero se recomienda hacerlo de una forma mas eficiente utilizando un operador ternario,
 *      con este operador, el valor luego de ? equivale a "true", mientras que luego de : equivale a "false".
 * Creo la constante "revisarSubrayar", la cual se encarga de revisar si el valor de "realizado" es "true", le agrega la clase 
 *      subrayar a la etiqueta <p>, en caso contrario, si "realizado" es "false", quita la clase.
 * Creo la constante "revisarOscurecer", la cual se encarga de revisar si el valor de "realizado" es "true", le agrega la clase 
 *      oscurecer a la etiqueta <li>, en caso contrario, si "realizado" es "false", quita la clase.
 * Creo la constante "elemento" en la que se crea el código html de la etiqueta <li>.
 * Para agregar el código html a la lista, se utilizara insertAdjacentHTML(), el cual es un método que tiene 4 parámetros posibles:
 *      afterbegin, afterend, beforebegin, beforeend. Con esta instrucción, se puede agregar código html antes o después,
 *      que termine un elemento (etiqueta).
 */
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

/**
 * Función para validar la tarea completa y cambiar los estilos visuales.
 * La función recibe un elemento como parámetro, el cual se utilizará con classList y la propiedad toogle.
 * toogle se utiliza para verificar la visibilidad de los elementos seleccionados, para cambiar entre hide() y show().
 * La propiedad parentNode se utiliza para ver los elementos padres de una estructura de código. Ya que se esta recibiendo un 
 *      "elemento" desde el evento "click" en lista al presionar el botón check, se utiliza parentNode para indicarle que
 *      busque dentro de la etiqueta padre <li> si es que existe alguna etiqueta que tenga la clase "text" (la cual seria la
 *      etiqueta <p>) y que cuando la encuentre, utilizando la propiedad "toogle" para que agregue la clase "subrayar" a la
 *      etiqueta <p>. Una forma de probar si estoy obteniendo alguna respuesta de esta consulta, es imprimir por consola la misma
 *      instrucción, la respuesta debería ser true o false.
 * Finalmente, la última instrucción utiliza toogle para agregar o quitar la clase oscurecer para cambiar el color de fondo de cada
 *      tarea que este siendo seleccionada como "realizada".
 */
const completarTarea = (elemento) => {

    elemento.classList.toggle(checkeado);
    elemento.classList.toggle(noCheckeado);

    elemento.parentNode.querySelector('.text').classList.toggle(subrayar);

    elemento.parentNode.classList.toggle(oscurecer);

}

/**
 * Función para eliminar una tarea.
 * Cuando se presiona el icono de basurero, se debe indicar al código que elimine la etiqueta <li> completa con el detalle de la 
 *      tarea. Para esto se deben utilizar dos parentNode para salir de la <i> hacia la etiqueta <li> hacia la etiqueta <ul>.
 *      La etiqueta <ul> será el padre de todo el código donde se imprime la tarea.
 * Con la propiedad removeChild() la que literalmente, significa "remover hijo" la que borrara todo el código de la etiqueta <li>.
 * Se utiliza el método splice() para eliminar un elemento existente en un arreglo, pasándole el id de la tarea y la cantidad
 *      de filas que se verán comprometidas, para este caso solo 1.
 * Se utiliza location.reload() para recargar la pagina, en caso que solo quede una tarea y se elimine, asi aparecera el mensaje
 *      indicando que no hay tareas pendientes.
 */
const eliminarTarea = (elemento) => {
    elemento.parentNode.parentNode.removeChild(elemento.parentNode);
    arregloTareas.splice(elemento, 1);
    console.log('Tarea eliminada.')

    location.reload();
}

/**
 * Función para actualizar el listado de tareas.
 * Se crea una validación para saber si existe o no data guardada en el localStorage.
 * Si existe, se carga el arreglo con la data utilizando JSON.parse().
 * El método parse se utiliza para convertir el JSON en información.
 * Se crea una validacion para determinar si el arreglo tiene un valor menor a cero. Ya que los arreglos comienzan a contar
 *      desde cero, no puede ser == o =< por lo que tiene que ser menor, para poder mostrar un mensaje cuando el arreglo este vacio.
 *      Si el valor es menor a cero, se cambia la clase de la etiqueta <p> a visible, en caso contrario, se deja no visible.
 */
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

/**
 * Función para cargar la lista de tareas desde el localStorage.
 * El método forEach se utiliza para recorrer cada uno de los elementos de un arreglo.
 * El valor de ítem es la variable que se utiliza para iterar cada valor por separado del arreglo.
 */
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