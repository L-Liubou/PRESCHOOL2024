function logSelfAssessment() {
    const selfAssessment = `
Самооценка работы:

Страница Pets (40):
Проверка верстки +7:
- Вёрстка валидная: +4
- Логотип в хедере текстовый: +1
- Один элемент <h1>: +1
- Favicon добавлен: +1
- Вёрстка соответствует макету: +15
  - <header>: +5
  - Our Friends: +5
  - <footer>: +5
- CSS требования: +4
  - Центрирование вёрстки при изменении масштаба: +2
  - Фоновый цвет на всю ширину: +2
- Интерактивность: +14
  - Our pets неинтерактивен: +2
  - Кнопки пагинации активны/неактивны: +2
  - Карточки Our Friends интерактивны: +2
  - Плавная прокрутка по якорям: +2
  - Ссылочные связи: +2
  - Интерактивность ссылок и кнопок: +2
  - Плавное изменение внешнего вида: +2
    `;

    console.log(selfAssessment);
}

logSelfAssessment();