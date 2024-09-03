// function logSelfAssessment() {
//     const selfAssessment = `
// Самооценка работы:

// Страница Main:
// - Вёрстка при 1280px: +14
//     - <header>: +2
//     - Not only: +2
//     - About: +2
//     - Our Friends: +2
//     - Help: +2
//     - In addition: +2
//     - <footer>: +2
// - Вёрстка при 768px: +14
// - Вёрстка при 320px: +14
// - Без горизонтальной прокрутки до 320px: +10
//     - 1280px-768px: +5
//     - 768px-320px: +5
// - Верстка резиновая: +4
// - Бургер-меню при <768px: +2
// - Валидная верстка: +2
//     `;

//     console.log(selfAssessment);
// }

// logSelfAssessment();

const menu = document.querySelector('.menu');
const headerBurger = document.querySelector('.header__burger');
const body = document.body;
const overlay = document.querySelector('.overlay');

headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle('active');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('no-scroll');
});

menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
        if (!link.classList.contains('exclude-link')){ 
        headerBurger.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
        }
    });
});

overlay.addEventListener('click',() => {
    headerBurger.classList.remove('active');
    menu.classList.remove('active');
    overlay.classList.remove('active');
    body.classList.remove('no-scroll'); 
});

Страница Main:
- Вёрстка при 1280px: +14
    - <header>: +2
    - Not only: +2
    - About: +2
    - Our Friends: +2
    - Help: +2
    - In addition: +2
    - <footer>: +2
- Вёрстка при 768px: +14
- Вёрстка при 320px: +14
- Без горизонтальной прокрутки до 320px: +10
    - 1280px-768px: +5
    - 768px-320px: +5
- Верстка резиновая: +4
- Бургер-меню при <768px: +2
- Валидная верстка: +2
    `;

    console.log(selfAssessment);
}

logSelfAssessment();