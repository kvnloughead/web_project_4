import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupContainer.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this._popupContainer.querySelectorAll(".popup__input");
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
        this._form,
        "#card-template",
        evt
      );
    });
  }

  close() {
    if (this._form.id === "add-form") {
      this._form.reset();
    } else {
      
    }
    super.close();
  }
}
