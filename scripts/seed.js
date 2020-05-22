// Seeds the page with a set of starting cards

const placesGrid = document.querySelector('.places__grid');
const imagePopupTemplate = document.querySelector('#image-popup-template');


const initialCards = [
  {
      name: 'Yosemite Valley',
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
    createCard(card);
  }  
}

function createCard(card) {
  let elements = createCardElements();
  elements = addClassesToCardElements(elements);
  elements = addContentToCardElements(elements, card);
  addHandlersToButtons(elements, card);
  nestCardElements(elements); 
}

function createCardElements() {
  const listItem = document.createElement('li');
  const imageElem = document.createElement('div');
  const footer = document.createElement('div');
  const nameElem = document.createElement('h2');
  const likeBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  imageElem.setAttribute('crossorigin', 'anonymous');
  return [listItem, imageElem, footer, nameElem, likeBtn, deleteBtn];
}

function addClassesToCardElements(elements) {
  const [listItem, imageElem, footer, nameElem, likeBtn, deleteBtn] = elements;
  listItem.classList.add('place');
  imageElem.classList.add('place__image');
  footer.classList.add('place__footer');
  nameElem.classList.add('place__name');
  likeBtn.classList.add('button', 'button_action_like');
  deleteBtn.classList.add('button', 'button_action_delete');
  return [listItem, imageElem, footer, nameElem, likeBtn, deleteBtn];
}

function addContentToCardElements(elements, card) {
  const [listItem, imageElem, footer, nameElem, likeBtn, deleteBtn] = elements;
  imageElem.style.backgroundImage = `url(${card.link})`;
  nameElem.textContent = card.name;
  return [listItem, imageElem, footer, nameElem, likeBtn, deleteBtn];
}

function addHandlersToButtons(elements, card) {
  const [listItem, image, footer, nameElem, likeBtn, deleteBtn] = elements;
  likeBtn.addEventListener('click', 
    (evt) => evt.target.classList.toggle('button_like-btn-clicked'));
  deleteBtn.addEventListener('click', 
    () => listItem.parentNode.removeChild(listItem));
  image.addEventListener('click', 
    openImagePopup, card);
}

function nestCardElements(elements) {
  const [listItem, image, footer, nameElem, likeBtn, deleteBtn] = elements;
  footer.append(nameElem, likeBtn);
  listItem.append(image, deleteBtn, footer);
  placesGrid.prepend(listItem);
}

function openImagePopup(evt) {
  const url = evt.target.style
                        .backgroundImage
                        .split('"')[1];
  const clone = imagePopupTemplate.content.cloneNode(true);
  const imagePopup = clone.querySelector('.popup__image')
  const imagePopupContainer = clone.querySelector('.popup__image-container');
  const closeBtn = clone.querySelector('.button_action_close');

  imagePopup.src = url;
  imagePopup.alt = `Image of ${card.name}`;

  placesGrid.parentNode.appendChild(clone);

  imagePopupContainer.style.marginTop = `${-.5 * imagePopup.offsetHeight}px`;
  imagePopupContainer.style.marginLeft = `${-.5 * imagePopup.offsetWidth}px`;

  closeBtn.addEventListener('click', () => imagePopupContainer.remove());
}

createInitialCards();


