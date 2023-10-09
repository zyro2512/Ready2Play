const symbols = ['🍒', '🍊', '🍋', '🍇', '🍉', '🍎'];

let totalAttempts = 10;
let totalPoints = 0;

function getRandomSymbol() {
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[randomIndex];
}

function calculatePoints(reels) {
  const uniqueSymbols = new Set(reels);
  const numUniqueSymbols = uniqueSymbols.size;

  const scoringRules = {
    1: 0,
    2: 50,
    3: 100
  };

  return scoringRules[numUniqueSymbols] || 0;
}

function updatePointsDisplay() {
  const pointsDisplay = document.getElementById('points-display');
  pointsDisplay.textContent = `Puntos: ${totalPoints}`;
}

function updateAttemptsDisplay() {
  const attemptsDisplay = document.getElementById('attempts-display');
  attemptsDisplay.textContent = `Intentos restantes: ${totalAttempts}`;
}

function updateResultDisplay(result) {
  const resultDisplay = document.getElementById('result-display');
  resultDisplay.textContent = result;
}

function spin() {
  if (totalAttempts > 0) {
    const reels = [];
    for (let i = 1; i <= 3; i++) {
      const symbol = getRandomSymbol(); // Obtiene un símbolo aleatorio para cada carrete
      const reel = document.getElementById(`reel${i}`);
      reel.innerHTML = '';
      for (let j = 0; j < 3; j++) {
        const symbolElement = document.createElement('div');
        symbolElement.innerText = getRandomSymbol(); // Cada símbolo es aleatorio
        reel.appendChild(symbolElement);
      }
      reels.push(symbol);
    }

    const points = calculatePoints(reels);
    totalPoints += points;
    totalAttempts--;

    updatePointsDisplay();
    updateAttemptsDisplay();

    if (totalAttempts === 0) {
      updateResultDisplay(`Juego terminado. Puntos totales: ${totalPoints}`);
    }
  } else {
    updateResultDisplay('No quedan intentos. El juego ha terminado.');
  }
}
