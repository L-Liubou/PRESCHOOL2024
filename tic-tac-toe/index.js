const resultModal = document.querySelector('.result-modal');
const welcomeModal = document.querySelector('.welcome-modal');
const characterSelection = document.querySelector('.character-selection');
const gameArea = document.querySelector('.game-area');
const continueButton = document.querySelector('.continue-button');
const startButton = document.querySelector('.start-button');
const characterButtons = document.querySelectorAll('.character-btn');
const restartButton = document.querySelector('.restart-btn');
const backButton = document.querySelector('.back-button');
const returnButton = document.querySelector('.return-button');
const errorMessage = document.querySelector('.error-message');
const turnDisplay = document.querySelector('.turn-display');
const difficultySelect = document.querySelector('.difficulty-select');


let gameBoard = ['', '', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isUserX;
let gameActive = true;
let userCharacter;
let difficultyLevel;
let gameStartTime;


function showElement(element) {
    element.classList.remove('hidden');
    element.classList.add('visible');
}

function hideElement(element) {
    element.classList.remove('visible');
    element.classList.add('hidden');
}

function hideAll() {
    hideElement(welcomeModal);
    hideElement(characterSelection);
    hideElement(gameArea);
    hideElement(resultModal);
}

function showWelcomeModal() {
    hideAll();
    setTimeout(() => showElement(welcomeModal), 300);
}

function showCharacterSelection() {
    hideAll();
    setTimeout(() => showElement(characterSelection), 300);
}

function showGameArea() {
    hideAll();
    setTimeout(() => showElement(gameArea), 300);
}

startButton.addEventListener('click', () => {
    difficultyLevel = difficultySelect.value;

    if (!userCharacter || !difficultyLevel) {
        errorMessage.textContent = "Select a character and difficulty level";
        return;
    }

    resetGame();
    gameStartTime = Date.now();
    showGameArea();
});

continueButton.addEventListener('click', () => {
    const playerChoice = document.querySelector('input[name="player"]:checked').value;
    isUserX = playerChoice === 'X';
    showCharacterSelection();
});

backButton.addEventListener('click', () => {
    hideElement(gameArea);
    setTimeout(() => {
        resetGame();
        showElement(characterSelection);
    }, 300);
});

returnButton.addEventListener('click', () => {
    hideElement(characterSelection);
    setTimeout(() => {
        resetGame();
        showElement(welcomeModal);
    }, 300);
});

characterButtons.forEach(button => {
    button.addEventListener('click', () => {
        characterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        userCharacter = button.querySelector('img').src;
    });
});

restartButton.addEventListener('click', () => {
    hideElement(resultModal);
    resetGame();
    setTimeout(() => {
        showElement(gameArea);
    }, 300);
});






