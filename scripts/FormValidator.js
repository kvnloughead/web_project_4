import { Card } from "./Card.js";

const modalOverlay = document.querySelector('.popup__modal-overlay');
const editModalTemplate = document.querySelector('#edit-modal-template');
const addModalTemplate = document.querySelector('#add-modal-template');
// const editBtn = document.querySelector('.button_action_edit');
// const addBtn = document.querySelector('.button_action_add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

export const modalArgs = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_action_submit",
  closeButtonSelector: ".button_action_close",
  modalOverlaySelector: ".popup__modal-overlay",
  inactiveInputClass: "popup__input_type_inactive",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
  cardSelector: '#card-template'
};

export class FormValidator {
  constructor(settingsObject, formToValidate) {
    this._args = settingsObject;
    this._form = formToValidate;
    this._inputList = Array.from(this._form.querySelectorAll(this._args.inputSelector));
    this._submitButtonElement = this._form.querySelector(this._args.submitButtonSelector);
    this._container = this._form.parentNode;
    this._submitBtn = this._form.querySelector(this._args.submitButtonSelector);
  }

  enableValidation() {
    this._toggleFormActiveState();
    this._addInputListeners();
    this._addCloseBtnEventListener();
    this._addEscapeKeyListener();
    this._addPopupOverlayListener();
    if (this._form.id === 'edit-form') {
      this._setInputValues();
      this._createEditFormSubmitListener();
    } else if (this._form.id === 'add-form') {
      this._createNewFormSubmitListener();
    }
  }

  _addEscapeKeyListener() {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === "Escape" && this._container.classList.contains('popup__container_visible')) {
        this._closePopup();
      }
    }); 
  }

  _addPopupOverlayListener() {
    modalOverlay.addEventListener('click', () => {
      if (this._container.classList.contains('popup__container_visible')) {
        this._closePopup();
      }
    });
  }

  _createNewFormSubmitListener() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const title = this._inputList[0].value;
      const imageUrl = this._inputList[1].value;
      const newCard = new Card(title, imageUrl, this._args.cardSelector);
      newCard.generateCard();
      this._closePopup();
      evt.target.reset();    
    });
  }

  _editFormSubmitHandler(evt) {
    evt.preventDefault();
    const newName = evt.currentTarget.name.value;
    const newJob = evt.currentTarget.job.value;
    profileName.textContent = newName;
    profileJob.textContent = newJob;
    this._closePopup();
  }

  _createEditFormSubmitListener() {
    this._setInputValues();
    this._form.addEventListener('submit', (evt) => {
      this._editFormSubmitHandler(evt);
      this._setInputValues();
    });
  }

  _setInputValues() {
    const [currName, currJob] 
      = Array.from(this._form.querySelectorAll(this._args.inputSelector));
    currName.value = profileName.textContent;
    currJob.value = profileJob.textContent;
  }

  _closePopup() {
    this._container.classList.remove('popup__container_visible');
    modalOverlay.classList.remove('popup__modal-overlay_visible');
    for (const input of this._inputList) {
      this._hideInputError(input);
    }
    this._form.reset();
    if (this._form.id === 'edit-form') {
      this._setInputValues();
    }
  }

  _addCloseBtnEventListener() {
    const closeBtn = this._container.querySelector(this._args.closeButtonSelector);
    closeBtn.addEventListener('click', () => {
      this._closePopup();
    });
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-input-error`);
    inputElement.classList.add(this._args.inactiveInputClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._args.errorClass);
  }
  
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-input-error`);
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

  _addInputListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._inputHandler(inputElement);
      });
    });
  }

  _inputHandler(inputElement) {
    this._checkInputValidity(inputElement);
    this._toggleFormActiveState();
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
}