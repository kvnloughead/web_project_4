// This script
//   1. Defines functions pertaining to the creation of cards,
//   2. seeds the page with an initial set, and
//   3. handles the create of image popups

const placesGrid = document.querySelector('.places__grid');
const imagePopupTemplate = document.querySelector('#image-popup-template');
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
  let elements = createCardElements();
  elements = addClassesToCardElements(elements);
  elements = addContentToCardElements(elements, card);
  addHandlersToButtons(elements, card);
  nestCardElements(elements); 
}

function createCardElements() {
  const listItemEl = document.createElement('li');
  const imageEl = document.createElement('div');
  const footerEl = document.createElement('div');
  const nameEl = document.createElement('h2');
  const likeBtnEl = document.createElement('button');
  const deleteBtnEl = document.createElement('button');
  imageEl.setAttribute('crossorigin', 'anonymous');
  elements = {
    listItemEl: listItemEl, 
    imageEl: imageEl,
    footerEl: footerEl, 
    nameEl: nameEl, 
    likeBtnEl: likeBtnEl, 
    deleteBtnEl: deleteBtnEl
  }
  return elements;
}

function addClassesToCardElements(elements) {
  elements.listItemEl.classList.add('place');
  elements.imageEl.classList.add('place__image');
  elements.footerEl.classList.add('place__footer');
  elements.nameEl.classList.add('place__name');
  elements.likeBtnEl.classList.add('button', 'button_action_like');
  elements.deleteBtnEl.classList.add('button', 'button_action_delete');
  return elements;
}

function addContentToCardElements(elements, card) {
  elements.imageEl.style.backgroundImage = `url(${card.link})`;
  elements.nameEl.textContent = card.name;
  return elements;
}

function addHandlersToButtons(elements, card) {
  elements.likeBtnEl.addEventListener('click', 
    (evt) => evt.target.classList.toggle('button_like-btn-clicked'));
  elements.deleteBtnEl.addEventListener('click', 
    () => listItemEl.parentNode.removeChild(listItemEl));
  elements.imageEl.addEventListener('click', 
    openImagePopup, card);
}

function nestCardElements(elements) {
  elements.footerEl.append(elements.nameEl, elements.likeBtnEl);
  elements.listItemEl.append(elements.imageEl, 
                             elements.deleteBtnEl, elements.footerEl);
  placesGrid.prepend(elements.listItemEl);
}

function openImagePopup(evt) {
  const cloneOfTemplate = imagePopupTemplate.content.cloneNode(true);
  const imagePopupContainer 
    = cloneOfTemplate.querySelector('.popup__image-container');
  const imagePopup = cloneOfTemplate.querySelector('.popup__image');
  addContentToImagePopup(evt, imagePopup);
  addCloseBtnEventListener(cloneOfTemplate);
  placeAndCenterImagePopup(cloneOfTemplate, imagePopupContainer, imagePopup);
  handleTransition(imagePopupContainer);
}

function addContentToImagePopup(evt, imagePopup) {
  const imageUrl = evt.target.style.backgroundImage.split('"')[1];
  imagePopup.src = imageUrl;
  imagePopup.alt = `Image of ${card.name}`;
}

function placeAndCenterImagePopup(cloneOfTemplate, imagePopupContainer, imagePopup) {
  placesGrid.parentNode.appendChild(cloneOfTemplate);
  imagePopupContainer.style.marginTop = `${-.5 * imagePopup.offsetHeight}px`;
  imagePopupContainer.style.marginLeft = `${-.5 * imagePopup.offsetWidth}px`;
}

function addCloseBtnEventListener(cloneOfTemplate) {
  const closeBtn = cloneOfTemplate.querySelector('.button_action_close');
  closeBtn.addEventListener('click', closePopup);
}

function handleTransition(imagePopupContainer) {
  popup.classList.toggle('transition_type_image-overlay');
  window.setTimeout(
    () => imagePopupContainer.classList.add('transition_type_container'),
    0);
}

function closePopup(evt) {
  // awkwardly handles transitions before removing nodes from DOM
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


