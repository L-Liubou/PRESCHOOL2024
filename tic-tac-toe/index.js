const resultModal = document.querySelector('.result-modal');
const welcomeModal = document.querySelector('.welcome-modal');
const characterSelection = document.querySelector('.character-selection');
const gameArea = document.querySelector('.game-area');

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

