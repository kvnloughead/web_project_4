// Seeds the page with a set of starting cards

const placesGrid = document.querySelector('.places__grid');

const initialCards = [
  {
      name: 'Yosemite Valley',
      // link: 'https://code.s3.yandex.net/web-code/yosemite.jpg'
      link: 'https://code.s3.yandex.net/web-code/yosemite.jpg'
      
  },
  {
      name: 'Lake Louise',
      link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg'
  },
  {
      name: 'Bald Mountains',
      link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg'
  },
  {
      name: 'Latemar',
      link: 'https://code.s3.yandex.net/web-code/latemar.jpg'
  },
  {
      name: 'Vanois National Park',
      link: 'https://code.s3.yandex.net/web-code/vanois.jpg'
  },
  {
      name: 'Lago di Braies',
      link: 'https://code.s3.yandex.net/web-code/lago.jpg'
  }
];

function createInitialCards() {
  for (card of initialCards) {
    const [name, link] = Object.values(card);
    let elements = createCardElements();
    elements = addClassesToCardElements(elements);
    elements = addContentToCardElements(elements, name, link);
    addHandlersToButtons(elements);
    nestCardElements(elements); 
  }  
}

function createCardElements() {
  const listItem = document.createElement('li');
  const image = document.createElement('div');
  const footer = document.createElement('div');
  const name = document.createElement('h2');
  const likeBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  image.setAttribute('crossorigin', 'anonymous');
  return [listItem, image, footer, name, likeBtn, deleteBtn];
}

function addClassesToCardElements(elements) {
  const [listItem, image, footer, name, likeBtn, deleteBtn] = elements;
  listItem.classList.add('place');
  image.classList.add('place__image');
  footer.classList.add('place__footer');
  name.classList.add('place__name');
  likeBtn.classList.add('button', 'button_action_like');
  deleteBtn.classList.add('button', 'button_action_delete');
  return [listItem, image, footer, name, likeBtn, deleteBtn];
}

function addContentToCardElements(elements, cardName, link) {
  const [listItem, image, footer, name, likeBtn, deleteBtn] = elements;
  image.style.backgroundImage = `url(${link})`;
  name.textContent = cardName;
  return [listItem, image, footer, name, likeBtn, deleteBtn];
}

function addHandlersToButtons(elements) {
  const [listItem, image, footer, name, likeBtn, deleteBtn] = elements;
  likeBtn.addEventListener('click', 
    (evt) => evt.target.classList.toggle('button_like-btn-clicked'))
}

function nestCardElements(elements) {
  const [listItem, image, footer, name, likeBtn, deleteBtn] = elements;
  footer.append(name, likeBtn);
  listItem.append(image, deleteBtn, footer);
  placesGrid.prepend(listItem);
}

createInitialCards();


