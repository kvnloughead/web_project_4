export default class Card {
  constructor(name, link, cardSelector, likes, clickHandler, likeClickHandler) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = clickHandler;
    this._likes = likes;
    this._numLikes = this._likes.length;
    this._handleLikeClick = likeClickHandler;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".place")
      .cloneNode(true);
    this._placeEl = cardElement;
    this._imageEl = cardElement.querySelector(".place__image");
    this._nameEl = cardElement.querySelector(".place__name");
    this._likeBtnEl = cardElement.querySelector(".place__like-btn");
    this._deleteBtnEl = cardElement.querySelector(".button_action_delete");
    this._likeCounterElem = cardElement.querySelector('.place__like-counter');
    return cardElement;
  }

  _addContent() {
    this._imageEl.style.backgroundImage = `url(${this._link})`;
    this._nameEl.textContent = this._name;
    this._likeCounterElem.textContent = this._numLikes;
  }

  _likeBtnHandler() {
    this._likeBtnEl.classList.toggle("place__like-btn_clicked");
  
  }

  _deleteBtnHandler() {
    this._placeEl.remove();
    this._placeEl = null;
  }

  _addEventListeners() {
    this._imageEl.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
    this._likeBtnEl.addEventListener("click", () => {
      this._likeBtnHandler();
    });
    this._deleteBtnEl.addEventListener("click", () => {
      this._deleteBtnHandler();
    });
  }

  generateCard() {
    const card = this._getTemplate();
    this._addContent();
    this._addEventListeners();
    return card;
  }
}
