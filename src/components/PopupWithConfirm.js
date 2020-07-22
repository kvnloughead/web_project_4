import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  // _getInputValues() {
  //   this._formValues = {};
  //   this._inputList.forEach((input) => {
  //     this._formValues[input.name] = input.value;
  //   });
  //   return this._formValues;
  // }

  setEventListeners() {
    super.setEventListeners();
    this._popupContainer.addEventListener("submit", (evt) => {
      this._handleFormSubmit(this._cardId, this._card);
    });
  }

  open(cardId, card) {
    this._cardId = cardId;
    this._card = card;
    super.open();
  }
}
