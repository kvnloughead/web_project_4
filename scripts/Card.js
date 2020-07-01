import handleCardClick from "./utils.js";

export default class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    return cardElement;
  }

  _addContent() {
    this._imageEl.style.backgroundImage = `url(${this._link})`;
    this._nameEl.textContent = this._name;
  }

  _likeBtnHandler() {
    this._likeBtnEl.classList.toggle("place__like-btn_clicked");
  }

  _deleteBtnHandler() {
    this._placeEl.parentNode.removeChild(this._placeEl);
  }

  _addEventListeners() {
    this._imageEl.addEventListener("click", () => {
      handleCardClick(this._name, this._link);
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
