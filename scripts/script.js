const placesGrid = document.querySelector('.places__grid');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const imagePopupTemplate = document.querySelector('#image-popup-template');
const cardTemplate = document.querySelector('#card-template');
const imageOverlay = document.querySelector('.popup__image-overlay');
const cloneOfTemplate = imagePopupTemplate.content.cloneNode(true);
const imagePopupContainer 
    = cloneOfTemplate.querySelector('.popup__image-container');
placesGrid.parentNode.appendChild(imagePopupContainer);

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

function closeImagePopup(container) {
  container.classList.remove('popup__image-container_visible');
  imageOverlay.classList.remove('popup__image-overlay_visible');
}

function addImageCloseBtnListener(imageContainer) {
  const closeBtn = imageContainer.querySelector('.button_action_close');
  closeBtn.addEventListener('click', () => {
    closeImagePopup(imageContainer);
  });
}

function addImageEscapeKeyListener(container) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === "Escape" && container.classList.contains('popup__image-container_visible')) {
      closeImagePopup(container);
    }
  }); 
}

function addImageOverlayListener(container) {
  imageOverlay.addEventListener('click', () => {
    if (container.classList.contains('popup__image-container_visible')) {
      closeImagePopup(container);
    }
  });
}

function addContentToImagePopup(imageUrl, imagePopupEl, captionEl, name) {
  imagePopupEl.src = imageUrl;
  imagePopupEl.alt = `Image of ${name}`;
  captionEl.textContent = name;
}

function openImagePopup(container, cardVals) {
  const imagePopupEl = container.querySelector('.popup__image');
  const captionEl = container.querySelector('.popup__image-caption');
  addContentToImagePopup(cardVals.link, imagePopupEl, captionEl, cardVals.name);
  addImageCloseBtnListener(container);
  addImageEscapeKeyListener(container);
  addImageOverlayListener(container);
  container.classList.add('popup__image-container_visible');
  imageOverlay.classList.add('popup__image-overlay_visible');
}

function addEventListeners(imageEl, likeBtnEl, deleteBtnEl, placeEl,
                           container, cardVals) {
  imageEl.addEventListener('click', () => {
    openImagePopup(container, cardVals);
  });
  likeBtnEl.addEventListener('click', 
    () => likeBtnEl.classList.toggle('place__like-btn_clicked')
  );
  deleteBtnEl.addEventListener('click', 
    () => placeEl.parentNode.removeChild(placeEl)
  );
}

function createCard(cardVals) {
  const cloneOfTemplate = cardTemplate.content.cloneNode(true);
  const imageEl = cloneOfTemplate.querySelector('.place__image');
  const nameEl = cloneOfTemplate.querySelector('.place__name');
  const placeEl = cloneOfTemplate.querySelector('.place');
  const likeBtnEl = cloneOfTemplate.querySelector('.place__like-btn');
  const deleteBtnEl = cloneOfTemplate.querySelector('.button_action_delete');
  imageEl.style.backgroundImage = `url(${cardVals.link})`;
  nameEl.textContent = cardVals.name;
  addEventListeners(imageEl, likeBtnEl, 
    deleteBtnEl, placeEl, imagePopupContainer, cardVals);
  placesGrid.prepend(cloneOfTemplate);
}

function initializeInputValues(currName, currJob) {
  currName.value = profileName.textContent;
  currJob.value = profileJob.textContent;
}

for (const card of initialCards) {
  createCard(card);
}  

