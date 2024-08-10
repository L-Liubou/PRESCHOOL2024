function logSelfAssessment() {
    const selfAssessment = `
Самооценка работы:

Страница Pets:
- Вёрстка страницы Pets при 1280px: +6
    - <header>: +2
    - Our Friends: +2
    - <footer>: +2
- Вёрстка при 768px: +6
- Вёрстка при 320px: +6
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