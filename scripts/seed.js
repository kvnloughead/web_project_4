// This script
//   1. Defines functions pertaining to the creation of cards,
//   2. seeds the page with an initial set, and
//   3. handles the create of image popups

const placesGrid = document.querySelector('.places__grid');
const imagePopupTemplate = document.querySelector('#image-popup-template');
const cardTemplate = document.querySelector('#card-template');
const popup = document.querySelector('.popup');

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
  const cloneOfTemplate = cardTemplate.content.cloneNode(true);
  const imageEl = cloneOfTemplate.querySelector('.place__image');
  const nameEl = cloneOfTemplate.querySelector('.place__name');
  const placeEl = cloneOfTemplate.querySelector('.place');
  const likeBtnEl = cloneOfTemplate.querySelector('.place__like-btn');
  const deleteBtnEl = cloneOfTemplate.querySelector('.button_action_delete');
  addContentToCard(imageEl, nameEl, card);
  addEventListeners(imageEl, likeBtnEl, deleteBtnEl, placeEl, card);
  placesGrid.prepend(cloneOfTemplate);
}

function addContentToCard(imageEl, nameEl, card) {
  imageEl.style.backgroundImage = `url(${card.link})`;
  nameEl.textContent = card.name;
}

function addEventListeners(imageEl, likeBtnEl, deleteBtnEl, placeEl, card) {
  imageEl.addEventListener('click', openImagePopup, card);
  likeBtnEl.addEventListener('click', 
    () => likeBtnEl.classList.toggle('place__like-btn_clicked'));
  deleteBtnEl.addEventListener('click', 
    () => placeEl.parentNode.removeChild(placeEl));
}

function openImagePopup(evt) {
  const cloneOfTemplate = imagePopupTemplate.content.cloneNode(true);
  const imagePopupContainer 
    = cloneOfTemplate.querySelector('.popup__image-container');
  const imagePopup = cloneOfTemplate.querySelector('.popup__image');
  addContentToImagePopup(evt, imagePopup);
  addCloseBtnEventListener(cloneOfTemplate);
  openPopup(imagePopupContainer, cloneOfTemplate, 'image');
}

function addContentToImagePopup(evt, imagePopup) {
  const imageUrl = evt.target.style.backgroundImage.split('"')[1];
  imagePopup.src = imageUrl;
  imagePopup.alt = `Image of ${card.name}`;
}


function addCloseBtnEventListener(cloneOfTemplate) {
  const closeBtn = cloneOfTemplate.querySelector('.button_action_close');
  closeBtn.addEventListener('click', closePopup);
}

function openPopup(imagePopupContainer, clone, popupType) {
  placesGrid.parentNode.appendChild(clone);
  popup.classList.toggle(`transition_type_${popupType}-overlay`);
  window.setTimeout(
    () => imagePopupContainer.classList.add('transition_type_container'),
    0);
}

function closePopup(evt) {
  // awkwardly handles transitions before removing nodes from
  popup.classList.toggle('transition_visible');
  evt.target.parentNode.classList.toggle('transition_visible');
  popup.classList.remove('transition_type_modal-overlay',
                         'transition_type_image-overlay');
  evt.target.parentNode.classList.remove('transition_type_container');
  window.setTimeout(
    () => {
      popup.classList.toggle('transition_visible');
      evt.target.parentNode.classList.toggle('transition_visible');
      evt.target.parentNode.remove()
    }, 500);
}


createInitialCards();


