function logSelfAssessment() {
    const selfAssessment = `
Самооценка работы:

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