import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, cardList) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupContainer.querySelector(".popup__form");
    this._inputList = this._popupContainer.querySelectorAll(".popup__input");
    this._submitBtn = this._popupContainer.querySelector(
      ".button_action_submit"
    );
    this._buttonText = this._submitBtn.textContent;
    [this._name, this._job] = this._inputList;
    this._cardList = cardList;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  submissionPending() {
    this._submitBtn.textContent = "Saving...";
  }

  submissionComplete() {
    this._submitBtn.textContent = this._buttonText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupContainer.addEventListener("submit", (evt) => {
      this.submissionPending();
      this._handleFormSubmit(
        this._getInputValues(),
        evt,
        "#card-template",
        this,
        this._cardList
      );
    });
  }

  open(data) {
    if (data) {
      this._name.value = data.name;
      this._job.value = data.job;
    }
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
