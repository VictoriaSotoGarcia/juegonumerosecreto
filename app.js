//let titulo = document.querySelector('h1');
//Retorna el elemento h1 que tenemos en el html, en este caso
// el titulo. Necesitamos tomar el valor y asignarlo a la variable
//titulo.innerHTML = 'Juego del número secreto'
//innerHTML sirve para definir un titulo

//let parrafo = document.querySelector('p');
//parrafo.innerHTML = 'Indica un número del 1 al 10';
//se quitaron cuando use asignarTextoElemento en la linea 22 y 23

let numeroSecreto = 0; 
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10


function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
   return;
   //va a retornar el numero secreto, es buena practiva
}
//la función se guarda dentro de algun lugar esperando usarse

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        //removeAttribute sirve para quitar del html un atributo como la función de bloquear el boton hasta que se cumpla una condición. 
        //se habilita el boton
         //Get.element by id es para retornar el valor no el objeto, parecida a query selector
    } else {
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
  document.querySelector(`#valorUsuario`).value = '';
    //el querySelector es general, a diferencia del getElementbyID
    //debemos usar las comillas al revés y no olvidar el #
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    //ya no necesito crear una variable 
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //si ya sorteamos todos los números:
    if(listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
        //esta es una salida para que no entres en un loop del que no se puede salir
    } else {
    //si el numero generado esta incluido en la lista 
    if(listaNumerosSorteados.includes(numeroGenerado)) {
        //includes hace un barrido de todo el arreglo para saber si algo ya existe
        return generarNumeroSecreto();
        //así puede haber recursividad, se autogenera automaticamente
    } else {
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
        //nuestro algoritmo no volverá a sortear un número que ya salió una vez 
    }
}
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del número secreto!');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    //limpiar la caja
    limpiarCaja();
    //indicar mensaje de intervalo de números
    //generar el número aleatorio
    //Inicializar el número de intentos
    condicionesIniciales();
    //deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    // set attribute coloca DISABLED con valor TRUE
}

condicionesIniciales();


// funtion sirve para decir que voy a crear una función que anteriormente
//ya definí en HTML. Encapsula lo que quieres que haga, una acción