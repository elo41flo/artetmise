const words = ['peinture', 'pinceau', 'huile', 'toile', 'acrylique', 'palette', 'couleur', 'pigments', 'aquarelle', 'fusain', 'esquisse', 'realisme', 'vernis', 'impressionnisme', 'expressionnisme', 'chevalet', 'abstrait'];
let chosenWord;
let displayWord;
let incorrectGuesses = 0;
const maxIncorrectGuesses = 6;
const hangmanDrawingElement = document.getElementById('hangman-drawing');
const wordDisplayElement = document.getElementById('word-display');
const lettersElement = document.getElementById('letters');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart-btn');

// Dessin du pendu avec du texte
const hangmanStages = [
    `
     ------
     |    |
     |
     |
     |
     |
    ====
    `,
    `
     ------
     |    |
     |    O
     |
     |
     |
    ====
    `,
    `
     ------
     |    |
     |    O
     |    |
     |
     |
    ====
    `,
    `
     ------
     |    |
     |    O
     |   /|
     |
     |
    ====
    `,
    `
     ------
     |    |
     |    O
     |   /|\\
     |
     |
    ====
    `,
    `
     ------
     |    |
     |    O
     |   /|\\
     |   /
     |
    ====
    `,
    `
     ------
     |    |
     |    O
     |   /|\\
     |   / \\
     |
    ====
    `
];

function initializeGame() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    displayWord = Array(chosenWord.length).fill('_');
    incorrectGuesses = 0;

    updateDisplayWord();
    updateHangmanDrawing();
    generateLetterButtons();
    messageElement.textContent = '';
    restartButton.style.display = 'none'; // Masquer le bouton de redémarrage
}

function updateDisplayWord() {
    wordDisplayElement.textContent = displayWord.join(' ');
}

function updateHangmanDrawing() {
    hangmanDrawingElement.textContent = hangmanStages[incorrectGuesses];
}

function generateLetterButtons() {
    lettersElement.innerHTML = '';
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('letter-button');
        button.addEventListener('click', () => handleGuess(letter, button));
        lettersElement.appendChild(button);
    }
}

function handleGuess(letter, button) {
    button.disabled = true;
    const indices = [];
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letter) {
            indices.push(i);
        }
    }

    if (indices.length > 0) {
        indices.forEach(index => {
            displayWord[index] = letter;
        });
        updateDisplayWord();

        if (displayWord.join('') === chosenWord) {
            messageElement.textContent = 'Félicitations ! Vous avez gagné !';
            endGame();
        }
    } else {
        incorrectGuesses++;
        updateHangmanDrawing();

        if (incorrectGuesses === maxIncorrectGuesses) {
            messageElement.textContent = `Game over ! Le mot était "${chosenWord}".`;
            endGame();
        }
    }
}

function endGame() {
    const buttons = document.querySelectorAll('.letter-button');
    buttons.forEach(button => button.disabled = true);
    restartButton.style.display = 'block'; // Afficher le bouton de redémarrage
}

restartButton.addEventListener('click', initializeGame);

// Initialisation du jeu au chargement de la page
initializeGame();
