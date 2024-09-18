const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;
let currentDifficulty = 'easy';
let selectedQuestions = [];


const questions = {
    easy: [
        {
            question: "Qui a peint le tableau de la Joconde ?",
            answers: [
                { text: 'De Vinci', correct: true },
                { text: 'Van Gogh', correct: false },
                { text: 'Monet', correct: false },
            ]
        },
        {
            question: "Où est né Vincent Van Gogh ?",
            answers: [
                { text: 'Allemagne', correct: false },
                { text: 'France', correct: false },
                { text: 'Pays-Bas', correct: true },
            ]
        },
        {
            question: "Quel peintre connu était spécialiste en art cubisme ?",
            answers: [
                { text: 'Michel-Ange', correct: false },
                { text: 'Dali', correct: false },
                { text: 'Picasso', correct: true },
            ]
        },
        {
            question: "Qui a peint la Nuit Étoilée ?",
            answers: [
                { text: 'Vincent Van Gogh', correct: true },
                { text: 'Paul Cézanne', correct: false },
                { text: 'Pablo Picasso', correct: false },
            ]
        },
        {
            question: "Qui a peint Impression, soleil levant ?",
            answers: [
                { text: 'Manet', correct: false },
                { text: 'Rembrandt', correct: false },
                { text: 'Monet', correct: true },
            ]
        },
        {
            question: "Quel artiste était célèbre dans le style du Pop Art ?",
            answers: [
                { text: 'Keith Haring', correct: true },
                { text: 'Banksy', correct: false },
                { text: 'Kaws', correct: false },
            ]
        },
        {
            question: "Paul Cézanne était ?",
            answers: [
                { text: 'Anglais', correct: false },
                { text: 'Français', correct: true },
                { text: 'Espagnol', correct: false },
            ]
        },
        {
            question: "Quel artiste a peint l'oeuvre Shot Marilyns ?",
            answers: [
                { text: 'Andy Warhol', correct: true },
                { text: 'Munch', correct: false },
                { text: 'Keith Haring', correct: false },
            ]
        },
        {
            question: "Qui a peint le tableau nommé Vertumne ?",
            answers: [
                { text: 'Le Caravage', correct: false },
                { text: 'Jérôme Bosch', correct: false },
                { text: 'Giuseppe Arcimboldo', correct: true },
            ]
        },
        {
            question: "Qui a peint l'oeuvre La liberté guidant le peuple ?",
            answers: [
                { text: 'Gustave Courbet', correct: false },
                { text: 'Eugène Delacroix', correct: true },
                { text: 'Rembrandt', correct: false },
            ]
        },
    ],
};

function startQuiz() {
    console.log("Le quiz a commencé !");
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = 'none'; // Masquer le bouton "Suivant"

    selectedQuestions = [...questions[currentDifficulty]];
    selectedQuestions.sort(() => Math.random() - 0.5); // Mélanger les questions

    showQuestion(); // Afficher la première question
}

function showQuestion() {
    resetState();
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none'; // Masquer le bouton "Suivant"
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild); // Supprimer les anciens boutons
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    if (isCorrect) {
        selectedButton.classList.add('correct'); // Appliquer la couleur verte
        score++;
    } else {
        selectedButton.classList.add('wrong'); // Appliquer la couleur rouge
    }

    // Mettre en évidence toutes les bonnes réponses et désactiver les boutons
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
    nextButton.innerText = currentQuestionIndex < selectedQuestions.length - 1 ? 'Suivant' : `Terminé - Score: ${score}/${selectedQuestions.length}`;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        nextButton.style.display = 'none'; // Masquer le bouton "Suivant" à la fin du quiz
    }
}

// Démarrer le quiz initialement
startQuiz();

// Ajouter un événement pour le bouton "Suivant"
nextButton.addEventListener('click', nextQuestion);