function logSelfAssessment() {
    const selfAssessment = `
 Самооценка работы:

 Страница Pets:
 - Бургер-меню: +13
   - Скрытие панели и отображение бургер-иконки при <768px: +1
   - Появление меню с анимацией и поворот бургер-иконки: +2
   - Высота меню на весь экран: +1
   - Скрытие меню при повторном нажатии или клике вне меню, анимация иконки: +2
   - Иконка создана с помощью HTML+CSS: +1
   - Работа ссылок и плавная прокрутка по якорям: +1
   - Скрытие меню при клике на ссылке: +1
   - Соответствие макету (центрирование и цветовая схема): +1
   - Затемнение фона и отсутствие прокрутки страницы под меню: +2
- Пагинация: +36
   - Открытие первой страницы при перезагрузке: +2
   - Переход между страницами с помощью кнопок: +6
   - Неактивность кнопок на первой и последней страницах: +4
   - Отображение номера текущей страницы и изменение при переключении: +2
   - Псевдослучайный набор питомцев на каждой странице, новые массивы и уникальные карточки: +16
   - Консистентность контента при переключении страниц и изменение при ширине экрана: +12
- Попап: +6
 - Появление при клике на карточку и затемнение фона: +2
 - Неактивный скролл страницы при открытии и активный при закрытии: +1
 - Закрытие при клике вне попапа или на кнопку с крестиком: +2
 - Интерактивная кнопка с крестиком и центрирование попапа: +1`;

  console.log(selfAssessment);
}

logSelfAssessment();

const menu = document.querySelector('.menu');
const headerBurger = document.querySelector('.header__burger');
const body = document.body;
const overlay = document.querySelector('.overlay');

const toggleMenu = () => {
  headerBurger.classList.toggle('active');
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
  body.classList.toggle('no-scroll');
};

headerBurger.addEventListener('click', toggleMenu);

const closeMenu = () => {
  headerBurger.classList.remove('active');
  menu.classList.remove('active');
  overlay.classList.remove('active');
  body.classList.remove('no-scroll');
};

menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

overlay.addEventListener('click', closeMenu);

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
      closeMenu();
  }
});

const animals = [
    {
      "name": "Jennifer",
      "img": "../../assets/images/pets-jennifer.png",
      "type": "Dog",
      "breed": "Labrador",
      "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
      "age": "2 months",
      "inoculations": ["none"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Sophia",
      "img": "../../assets/images/pers-sophia.png",
      "type": "Dog",
      "breed": "Shih tzu",
      "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
      "age": "1 month",
      "inoculations": ["parvovirus"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Woody",
      "img": "../../assets/images/pets-woody.png",
      "type": "Dog",
      "breed": "Golden Retriever",
      "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
      "age": "3 years 6 months",
      "inoculations": ["adenovirus", "distemper"],
      "diseases": ["right back leg mobility reduced"],
      "parasites": ["none"]
    },
    {
      "name": "Scarlett",
      "img": "../../assets/images/pets-scarlet.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
      "age": "3 months",
      "inoculations": ["parainfluenza"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Katrine",
      "img": "../../assets/images/pets-katrine.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
      "age": "6 months",
      "inoculations": ["panleukopenia"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Timmy",
      "img": "../../assets/images/pets-timmy.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
      "age": "2 years 3 months",
      "inoculations": ["calicivirus", "viral rhinotracheitis"],
      "diseases": ["kidney stones"],
      "parasites": ["none"]
    },
    {
      "name": "Freddie",
      "img": "../../assets/images/pets-freddie.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    },
    {
      "name": "Charly",
      "img": "../../assets/images/pets-charly.png",
      "type": "Dog",
      "breed": "Jack Russell Terrier",
      "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
      "age": "8 years",
      "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
      "diseases": ["deafness", "blindness"],
      "parasites": ["lice", "fleas"]
    }
  ];

const modalOverlay = document.querySelector('.modal-overlay');
const modalImage = document.querySelector('.modal-image');
const modalTitle = document.querySelector('.modal__title');
const modalSubtitle = document.querySelector('.modal__subtitle');
const modalDescription = document.querySelector('.modal__description');
const modalListItems = document.querySelectorAll('.modal__list-item');
const closeButton = document.querySelector('.modal__close-button');

const openModal = animal => {
  modalImage.src = animal.img;
  modalTitle.textContent = animal.name;
  modalSubtitle.textContent = `${animal.type} - ${animal.breed}`;
  modalDescription.textContent = animal.description;
  modalListItems[0].querySelector('.modal__list-value').textContent = animal.age;
  modalListItems[1].querySelector('.modal__list-value').textContent = animal.inoculations.join(', ');
  modalListItems[2].querySelector('.modal__list-value').textContent = animal.diseases.join(', ');
  modalListItems[3].querySelector('.modal__list-value').textContent = animal.parasites.join(', ');
  modalOverlay.classList.add('active');
  body.classList.toggle('no-scroll');
  };
  
const closeModal = () => {
  modalOverlay.classList.remove('active'); 
  body.classList.remove('no-scroll');
};
  
closeButton.addEventListener('click', closeModal);
  
modalOverlay.addEventListener('click', event => {
  if (event.target === modalOverlay) closeModal();
});


let displayAnimals = []; 
let activePage = 1;
let cardsOnPage;
let totalPages;

const getNumberOfDisplayedCards = () => {
  if (window.innerWidth > 1220) return 8;  
  if (window.innerWidth >= 768 && window.innerWidth <= 1220) return 6;  
  return 3;  
};

const randomizeArray = (array) => {
  let randomArray = array.slice(); 
  for (let i = randomArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomArray[i], randomArray[j]] = [randomArray[j], randomArray[i]]; 
  }
  return randomArray;
};

const generateAnimalCards = () => {
  const totalPets = 48;
  const setSize = 8;
  const maxDuplicates = 6;
  let allUniquePets = [];

  const getRandomAnimals = (pets, count) => {
    let randomizedAnimals = pets.slice().sort(() => Math.random() - 0.5);
    return randomizedAnimals.slice(0, count);
  };

  const isUniqueEnough = (animalName) => {
    return allUniquePets.filter(pet => pet.name === animalName).length < maxDuplicates;
  };

  while (allUniquePets.length < totalPets) {
    let newPets = getRandomAnimals(animals, setSize);
    
    newPets.forEach(pet => {
      if (isUniqueEnough(pet.name)) {
        allUniquePets.push(pet);
      }
    });
    if (allUniquePets.length < totalPets) {
      let uniquePetsCount = new Set(allUniquePets.map(pet => pet.name)).size;
      if (uniquePetsCount < totalPets) {
        allUniquePets = allUniquePets.slice(0, totalPets);
      }
    }
  }
  displayAnimals = allUniquePets;
};

const getTotalPages = () => Math.ceil(displayAnimals.length / (cardsOnPage = getNumberOfDisplayedCards()));
const renderCards = (page) => {
  const containerCards = document.querySelector('.container__cards');
  const startIndex = (page - 1) * cardsOnPage;
  const endIndex = startIndex + cardsOnPage;

  if (startIndex >= displayAnimals.length) return;

  const pageCards = displayAnimals.slice(startIndex, endIndex);

  containerCards.innerHTML = pageCards.map(animal => `
    <div class="card--pet">
      <img src="${animal.img}" class="card__image"> 
      <p class="card__name">${animal.name}</p>
      <button class="button--secondary">Learn more</button>
    </div>`
  ).join('');

  updatePaginationButtons(page);
  addClickListenersToCards();
};

const addClickListenersToCards = () => {
  document.querySelectorAll('.card--pet').forEach(card => {
    card.addEventListener('click', () => {
      const animalName = card.querySelector('.card__name').textContent;
      const animal = animals.find(item => item.name === animalName);
      openModal(animal);
    });
  });
};

const updatePaginationButtons = (page) => {
  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  document.getElementById('first-page').className = isFirstPage ? 'navigation-button button-paginator-inactive' : 'navigation-button button-paginator';
  document.getElementById('prev-page').className = isFirstPage ? 'navigation-button button-paginator-inactive' : 'navigation-button button-paginator';
  document.getElementById('next-page').className = isLastPage ? 'navigation-button button-paginator-inactive' : 'navigation-button button-paginator';
  document.getElementById('last-page').className = isLastPage ? 'navigation-button button-paginator-inactive' : 'navigation-button button-paginator';
  document.getElementById('page-number').textContent = page;
  document.getElementById('page-number').className = 'navigation-button button-paginator-active';
};

const goToPage = (page) => {
  if (page < 1 || page > totalPages) return;
  activePage = page;
  renderCards(page);
};

const updatePagination = () => {
  cardsOnPage = getNumberOfDisplayedCards();  
  totalPages = Math.ceil(displayAnimals.length / cardsOnPage);  
  
  if (activePage > totalPages) {
    activePage = totalPages;
  }
  renderCards(activePage);  
};

document.getElementById('first-page').addEventListener('click', () => goToPage(1));
document.getElementById('last-page').addEventListener('click', () => goToPage(totalPages));
document.getElementById('prev-page').addEventListener('click', () => goToPage(activePage - 1));
document.getElementById('next-page').addEventListener('click', () => goToPage(activePage + 1));
window.addEventListener('resize', updatePagination);
window.addEventListener('load', () => {
  generateAnimalCards();
  updatePagination(); 
});

