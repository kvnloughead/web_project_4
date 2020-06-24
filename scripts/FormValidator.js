export class FormValidator {
  constructor(settingsObject, formToValidate) {
    this._args = settingsObject;
    this._form = formToValidate;
    this._container = this._form.parentNode;
    this._inputList = Array.from(this._form.querySelectorAll(this._args.inputSelector));
    this._buttonElement = this._form.querySelector(this._args.submitButtonSelector);
    this._resetButton = this._container.querySelector(this._args.closeButtonSelector);
    this._modalOverlay = document.querySelector(this._args.modalOverlaySelector);
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

  _toggleButtonState(disableButton = false) {
    if (this._hasInvalidInput() || disableButton) {
      this._buttonElement.classList.add(this._args.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._args.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _resetErrorMessages() {
    this._toggleButtonState(true);
    for (const input of this._inputList) {
      this._hideInputError(input)
    }
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._toggleButtonState(true);
    });

    // These listeners enable the removal of error messages upon closing
    // the form.  I've now been told that this was not necessary for the
    // project, but I'd rather leave it in.

    this._resetButton.addEventListener('click', () => {
      this._resetErrorMessages();
    });

    this._modalOverlay.addEventListener('click', () => {
      this._resetErrorMessages();
    });

    document.addEventListener('keydown', (evt) => {
      if (evt.key === "Escape") {
        this._resetErrorMessages();
      }
    });
    
    this._setEventListeners();
  }
}
