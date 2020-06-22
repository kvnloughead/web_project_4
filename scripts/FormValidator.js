// import { Card } from "./Card.js";

export class FormValidator {
  constructor(settingsObject, formToValidate) {
    this._args = settingsObject;
    this._form = formToValidate;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._args.inputSelector)
    );
    this._submitButtonElement = this._form.querySelector(
      this._args.submitButtonSelector
    );
    this._container = this._form.parentNode;
    this._submitBtn = this._form.querySelector(
      this._args.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(
      `#${inputElement.id}-input-error`
    );
    inputElement.classList.add(this._args.inactiveInputClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._args.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(
      `#${inputElement.id}-input-error`
    );
    inputElement.classList.remove(this._args.inactiveInputClass);
    errorElement.classList.remove(this._args.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleFormActiveState() {
    if (this._hasInvalidInput()) {
      this._submitBtn.classList.add(this._args.inactiveButtonClass);
      this._submitBtn.disabled = true;
    } else {
      this._submitBtn.classList.remove(this._args.inactiveButtonClass);
      this._submitBtn.disabled = false;
    }
  }

  _inputHandler(inputElement) {
    this._checkInputValidity(inputElement);
    this._toggleFormActiveState();
  }

  _addInputListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._inputHandler(inputElement);
      });
    });
  }

  enableValidation() {
    this._toggleFormActiveState();
    this._addInputListeners();
    // if (this._form.id === "edit-form") {
    //   this._setInputValues();
    // }
  }
}
