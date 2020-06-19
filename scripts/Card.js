const placesGrid = document.querySelector('.places__grid');
const imageOverlay = document.querySelector('.popup__image-overlay');
const imagePopupTemplate = document.querySelector('#image-popup-template');
const cloneOfTemplate = imagePopupTemplate.content.cloneNode(true);
const imagePopupContainer 
    = cloneOfTemplate.querySelector('.popup__image-container');
placesGrid.parentNode.appendChild(imagePopupContainer);
const imagePopupEl = document.querySelector('.popup__image');
const captionEl = document.querySelector('.popup__image-caption');

export class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }
  
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector)
      .content.querySelector(".place").cloneNode(true);
    this._placeEl = cardElement;
    this._imageEl = cardElement.querySelector('.place__image');
    this._nameEl = cardElement.querySelector('.place__name');
    this._likeBtnEl = cardElement.querySelector('.place__like-btn');
    this._deleteBtnEl = cardElement.querySelector('.button_action_delete');
    return cardElement;
  }

  _addContent() {
    this._imageEl.style.backgroundImage = `url(${this._link})`;
    this._nameEl.textContent = this._name;
  }

  _addEventListeners() {
    this._imageEl.addEventListener('click', () => {
      this._openImagePopupHandler();
    });
    this._likeBtnEl.addEventListener('click', 
      () => this._likeBtnEl.classList.toggle('place__like-btn_clicked')
    );
    this._deleteBtnEl.addEventListener('click', 
      () => this._placeEl.parentNode.removeChild(this._placeEl)
    );
  }

  _openImagePopupHandler() {
    imagePopupEl.src = this._link;
    imagePopupEl.alt = `Image of ${this._name}`;
    captionEl.textContent = this._name;
    this._addImagePopupEventListeners();
    imagePopupContainer.classList.add('popup__image-container_visible');
    imageOverlay.classList.add('popup__image-overlay_visible');
  }

  _addImagePopupEventListeners() {
    const closeBtn = imagePopupContainer.querySelector('.button_action_close');
    closeBtn.addEventListener('click', () => {
      this._closeImagePopup(imagePopupContainer);
    });
    document.addEventListener('keydown', (evt) => {
      if (evt.key === "Escape" && imagePopupContainer.classList.contains('popup__image-container_visible')) {
        this._closeImagePopup(imagePopupContainer);
      }
    });
    imageOverlay.addEventListener('click', () => {
      if (imagePopupContainer.classList.contains('popup__image-container_visible')) {
        this._closeImagePopup(imagePopupContainer);
      }
    });
  }

  _closeImagePopup(container) {
    container.classList.remove('popup__image-container_visible');
    imageOverlay.classList.remove('popup__image-overlay_visible');
  }

  // event handler methods, private

  generateCard() {
    const template = this._getTemplate();
    this._addContent();
    this._addEventListeners();
    placesGrid.prepend(template);
  }
  
}



// for (const card of initialCards) {
//   const cardEl = new Card(card.name, card.link, cardSelector);
//   cardEl.generateCard();
// }  