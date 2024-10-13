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
const boxes = document.querySelectorAll('.box');
const resultText = document.querySelector('.result-modal__text');

let gameBoard = ['', '', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isUserX;
let gameActive = true;
let userCharacter;
let difficultyLevel;
let gameStartTime;
let aiCharacter = 'svg/knife.svg';


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

function setBoxImage(index, player) {
    boxes[index].innerHTML = `<img src="${player === 'X' ? userCharacter : aiCharacter}" alt="${player}">`;
}

boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleBoxClick(index));
});

function handleBoxClick(index) {

    if (gameBoard[index] !== '' || !gameActive || currentPlayer === 'O' && !isUserX) {
        return;
    }
    gameBoard[index] = currentPlayer;
    setBoxImage(index, currentPlayer);

    if (checkWinner()) {
        const winningCondition = winningConditions.find(condition => {
            const [a, b, c] = condition;
            return gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer;
        });

        highlightWinningCombination(winningCondition);
        setTimeout(() => showResultModal('You WIN!', 'win'), 1000);
        return;
    }

    if (!gameBoard.includes('')) {
        highlightDraw();
        setTimeout(() => showResultModal("It's draw", 'draw'), 1000);
        return;
    }

    currentPlayer = 'O';
    turnDisplay.textContent = "Computer's move";

    setTimeout(() => {
        computerMove();
    }, 600);
}


//!LEVEL
function computerMove() {
    if (difficultyLevel === 'easy') {
        makeRandomMove();
    } else if (difficultyLevel === 'medium') {
        if (!blockPlayer()) {
            makeRandomMove();
        }
    } else if (difficultyLevel === 'hard') {
        if (!makeWinningMove()) {
            if (!blockPlayer()) {
                makeRandomMove();
            }
        }
    }

    if (checkWinner()) {
        const winningCombination = findWinningCombination();
        highlightWinningCombination(winningCombination);
        showResultModal('Computer wins', 'lose');
    } else if (!gameBoard.includes('')) {
        showResultModal("It's a draw", 'draw');
    } else {
        currentPlayer = 'X';
        turnDisplay.textContent = "It's YOUR move";
    }
}

function makeRandomMove() {
    let validMove = false;
    while (!validMove) {
        const randomIndex = Math.floor(Math.random() * 9);
        if (gameBoard[randomIndex] === '') {
            gameBoard[randomIndex] = 'O';
            setBoxImage(randomIndex, 'O');
            validMove = true; 
        }
    }
}

function blockPlayer() {
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = 'X';  
            if (checkWinner()) {
                gameBoard[i] = 'O';  
                setBoxImage(i, 'O');
                return true;  
            }
            gameBoard[i] = '';  
        }
    }
    return false;  
}

function makeWinningMove() {
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = 'O'; 
            if (checkWinner()) {
                setBoxImage(i, 'O');
                return true; 
            }
            gameBoard[i] = '';  
        }
    }
    return false; 
}

//!CHECK WINNER
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return null;
}

function findWinningCombination() {
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return condition;
        }
    }
    return null;
}

function highlightWinningCombination(winningCombination) {
    winningCombination.forEach(index => {
        boxes[index].classList.add('winning-cell');
    });
}

function highlightDraw() {
    boxes.forEach(box => {
        box.classList.add('draw-field');
    });
}

//!RESTART
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    boxes.forEach(box => {
        box.innerHTML = '';
        box.classList.remove('winning-cell');
        box.classList.remove('draw-field');
    });
    gameActive = true;
    currentPlayer = isUserX ? 'X' : 'O';
    turnDisplay.textContent = isUserX ? "It's YOUR move" : "Computer move";

    if (!isUserX) {
        setTimeout(() => computerMove(), 600);
    }
    resultModal.classList.add('hidden');
    document.body.classList.remove('modal-overlay-active');
}

//!RESULTS
function showResultModal(message, resultType) {
    const resultImage = document.querySelector('.result-modal__image');
    resultImage.classList.remove('animated');

    let winner;
    if (resultType === 'win') {
        resultImage.src = 'svg/pumpkin-smile.svg';
        winner = 'Player';
    } else if (resultType === 'lose') {
        resultImage.src = 'svg/pumpkin-cry.svg';
        winner = 'Computer';
    } else if (resultType === 'draw') {
        resultImage.src = 'svg/pumpkin-surprised.svg';
        winner = 'Draw';
    }

    resultText.textContent = message;
    showElement(resultModal);
    document.body.classList.add('modal-overlay-active');

    setTimeout(() => {
        resultImage.classList.add('animated');
    }, 10);

    const moves = gameBoard.filter(box => box !== '').length;
    saveGameResult(winner, moves);
}

let gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];

function updateScoreTable() {
    const scoreTableBody = document.querySelector('.score-table tbody');
    scoreTableBody.innerHTML = '';

    const recentGames = gameHistory.slice(-10).reverse();

    recentGames.forEach((game, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${game.winner}</td>
            <td>${game.difficulty}</td> 
            <td>${game.moves}</td>
            <td>${game.duration}</td> 
        `;
        scoreTableBody.appendChild(row);
    });
}

function saveGameResult(winner, moves) {
    const currentTime = Date.now();
    const gameDuration = Math.floor((currentTime - gameStartTime) / 1000);
    const formattedTime = `${Math.floor(gameDuration / 60)}:${('0' + (gameDuration % 60)).slice(-2)}`;

    const gameResult = {
        winner: winner,
        difficulty: difficultyLevel,
        moves: moves,
        duration: formattedTime,
    };

    gameHistory.push(gameResult);
    if (gameHistory.length > 10) {
        gameHistory.shift();
    }

    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
    updateScoreTable();
}

showWelcomeModal();
updateScoreTable();