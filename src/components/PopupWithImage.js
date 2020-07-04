import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, name, imageUrl) {
    super(popupSelector);
    this._imageUrl = imageUrl;
    this._name = name;
    this._imagePopupEl = this._popupContainer.querySelector(".popup__image");
    this._captionEl = this._popupContainer.querySelector(
      ".popup__image-caption"
    );
  }

  open() {
    this._imagePopupEl.src = this._imageUrl;
    this._imagePopupEl.alt = `Image of ${this._name}`;
    this._captionEl = this._name;
    super.open();
  }
}
