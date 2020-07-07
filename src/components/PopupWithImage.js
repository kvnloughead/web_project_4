import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopupEl = this._popupContainer.querySelector(".popup__image");
    this._captionEl = this._popupContainer.querySelector(
      ".popup__image-caption"
    );
  }

  open(name, imageUrl) {
    this._imagePopupEl.src = imageUrl;
    this._imagePopupEl.alt = `Image of ${name}`;
    this._captionEl = name;
    super.open();
  }
}
