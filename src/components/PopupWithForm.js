import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupContainer.querySelector(".popup__form");
    this._inputList = this._popupContainer.querySelectorAll(".popup__input");
    [ this._name, this._job ] = this._inputList;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupContainer.addEventListener("submit", (evt) => {
      this._handleFormSubmit(
        this._getInputValues(),
        evt,
        "#card-template"
      );
    });
  }

  open(currentUserInfo) {
    if (currentUserInfo) {
      this._name.value = currentUserInfo.name;
      this._job.value = currentUserInfo.job;
    }
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
