const botonRepartir = document.getElementById('boton-repartir');
const botonPedir = document.getElementById('boton-pedir');
const botonMantener = document.getElementById('boton-mantener');
const manoJugador = document.getElementById('mano-jugador');
const manoRepartidor = document.getElementById('mano-repartidor');

botonRepartir.addEventListener('click', repartir);
botonPedir.addEventListener('click', pedir);
botonMantener.addEventListener('click', mantener);

let mazo = [];
let cartasJugador = [];
let cartasRepartidor = [];

function crearMazo() {
  const palos = ['Corazones', 'Diamantes', 'Tréboles', 'Picas'];
  const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  for (let palo of palos) {
    for (let valor of valores) {
      mazo.push({ valor, palo });
    }
  }
}

function mezclarMazo() {
  for (let i = mazo.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
  }
}

function repartir() {
  mazo = [];
  crearMazo();
  mezclarMazo();

  cartasJugador = [mazo.pop(), mazo.pop()];
  cartasRepartidor = [mazo.pop(), mazo.pop()];

  mostrar();
}

function pedir() {
  cartasJugador.push(mazo.pop());

  mostrar();
  verificarPerdida(); // Verifica si el jugador se ha pasado después de cada carta recibida
}


function mantener() {
  // Turno del repartidor
  while (calcularValorMano(cartasRepartidor) < 17) {
    cartasRepartidor.push(mazo.pop());
  }

  mostrar();
  determinarGanador();
}

function calcularValorMano(cartas) {
  let suma = 0;
  let tieneAs = false;

  for (let carta of cartas) {
    if (carta.valor === 'A') {
      tieneAs = true;
      suma += 11;
    } else if (carta.valor === 'K' || carta.valor === 'Q' || carta.valor === 'J') {
      suma += 10;
    } else {
      suma += parseInt(carta.valor);
    }
  }

  if (tieneAs && suma > 21) {
    suma -= 10;
  }

  return suma;
}

function mostrar() {
  mostrarMano(cartasJugador, manoJugador);
  mostrarMano(cartasRepartidor, manoRepartidor);
}

function mostrarMano(cartas, elemento) {
  elemento.innerHTML = '';

  for (let carta of cartas) {
    const cartaElemento = document.createElement('img');
    const nombreCarta = obtenerNombreCarta(carta);
    cartaElemento.src = `..\Styles\Cartas\corazon/${nombreCarta}.png`;
    cartaElemento.alt = `${carta.valor} de ${carta.palo}`;
    elemento.appendChild(cartaElemento);
  }
}

function obtenerNombreCarta(carta) {
  let nombre = '';

  if (carta.valor === 'A') {
    nombre += 'ace';
  } else if (carta.valor === 'K') {
    nombre += 'king';
  } else if (carta.valor === 'Q') {
    nombre += 'queen';
  } else if (carta.valor === 'J') {
    nombre += 'jack';
  } else if (parseInt(carta.valor) >= 2 && parseInt(carta.valor) <= 10) {
    // Si es una carta numérica (del 2 al 10), simplemente usa su valor
    nombre += carta.valor;
  }

  nombre += `_${carta.palo.toLowerCase()}`;
  return nombre;
}

function verificarPerdida() {
  const puntuacionJugador = calcularValorMano(cartasJugador);

  if (puntuacionJugador > 21) {
    // El jugador se ha pasado de 21 puntos, deshabilita los botones
    botonPedir.disabled = true;
    botonMantener.disabled = true;

    // Muestra un mensaje indicando que el jugador ha perdido
    alert('Te has pasado de 21. ¡Has perdido!');
    
    // Recarga la página después de que el jugador haya aceptado el mensaje
    reloadPage();
  }
}

function reloadPage() {
  location.reload();
}




function mostrar() {
  manoJugador.innerHTML = `Mano del Jugador: ${calcularValorMano(cartasJugador)}`;
  manoRepartidor.innerHTML = `Mano del Repartidor: ${calcularValorMano(cartasRepartidor)}`;
}

function determinarGanador() {
  const puntajeJugador = calcularValorMano(cartasJugador);
  const puntajeRepartidor = calcularValorMano(cartasRepartidor);

  if (puntajeJugador > 21) {
    alert('El jugador se pasa. Gana el repartidor.');
  } else if (puntajeRepartidor > 21) {
    alert('El repartidor se pasa. Gana el jugador.');
  } else if (puntajeJugador > puntajeRepartidor) {
    alert('Gana el jugador.');
  } else if (puntajeRepartidor > puntajeJugador) {
    alert('Gana el repartidor.');
  } else {
    alert('Es un empate.');
  }
}
