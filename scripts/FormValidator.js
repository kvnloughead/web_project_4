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
};

export class FormValidator {
  constructor(settingsObject, formToValidate) {
    this._args = settingsObject;
    this._form = formToValidate;
  }

  enableValidation(args) {
    const forms = Array.from(document.querySelectorAll(args.formSelector));
    for (const form of forms) {
      const inputList = Array.from(form.querySelectorAll(args.inputSelector));
      const submitButtonElement = form.querySelector(args.submitButtonSelector);
      const container = form.parentNode;
      toggleFormActiveState(inputList, submitButtonElement, args);
      addInputListeners(form, inputList, submitButtonElement, args);
      addCloseBtnEventListener(container, inputList, form, args);
      if (form.id === 'edit-form') {
        const [currName, currJob] 
            = Array.from(form.querySelectorAll(args.inputSelector)); 
        args.currName = currName;
        args.currJob = currJob;
        createEditFormSubmitListener(form, container, inputList, args);
        initializeInputValues(args.currName, args.currJob);
      } else if (form.id === 'add-form') {
        createNewFormSubmitListener(form, container, inputList, args);
      }
    }
  }
}