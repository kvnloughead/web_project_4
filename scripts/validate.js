const modalOverlay = document.querySelector('.popup__modal-overlay');
const editModalTemplate = document.querySelector('#edit-modal-template');
const addModalTemplate = document.querySelector('#add-modal-template');
const editBtn = document.querySelector('.button_action_edit');
const addBtn = document.querySelector('.button_action_add');

const modalArgs = {
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

function showInputError(formElement, inputElement, errorMessage, args) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
  inputElement.classList.add(args.inactiveInputClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(args.errorClass);
}

function hideInputError(formElement, inputElement, args) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
  inputElement.classList.remove(args.inactiveInputClass);
  errorElement.classList.remove(args.errorClass);
  errorElement.textContent = "";
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function checkInputValidity(formElement, inputElement, buttonElement, args) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, args);
  } else {
    hideInputError(formElement, inputElement, args);
  }
}

function toggleFormActiveState(inputList, buttonElement, args) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(args.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(args.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function addInputListeners(form, inputList, submitButtonElement, args) {
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(form, inputElement, submitButtonElement, args);
      toggleFormActiveState(inputList, submitButtonElement, args);
    });
  });
}

function closePopup(popupContainer, form, inputList, args) {
  popupContainer.classList.remove('popup__container_visible');
  modalOverlay.classList.remove('popup__modal-overlay_visible');
  for (const input of inputList) {
    hideInputError(form, input, args);
  }
  form.reset();
  if (form.id === 'edit-form') {
    initializeInputValues(args.currName, args.currJob);
  }
}

function addEscapeKeyListener(form, container, inputList, args) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === "Escape" && container.classList.contains('popup__container_visible')) {
      closePopup(container, form, inputList, args);
    }
  }); 
}

function addPopupOverlayListener(form, popupContainer, inputList, args) {
  modalOverlay.addEventListener('click', () => {
    if (popupContainer.classList.contains('popup__container_visible')) {
      closePopup(popupContainer, form, inputList, args);
    }
  });
}

function openModalPopup(form, container, inputList, args) {
  container.classList.toggle('popup__container_visible');
  modalOverlay.classList.toggle('popup__modal-overlay_visible');
  addEscapeKeyListener(form, container, inputList, args);
  addPopupOverlayListener(form, container, inputList, args);
}

function createModal(modalTemplate, buttonElement) {
  const cloneOfTemplate = modalTemplate.content.cloneNode(true);
  const container = cloneOfTemplate.querySelector('.popup__container');
  const form = container.querySelector('.popup__form');
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  buttonElement.addEventListener('click', () => {
    openModalPopup(form, container, inputList, modalArgs);
  });
  editBtn.parentNode.appendChild(cloneOfTemplate);
}

function addCloseBtnEventListener(popupContainer, inputList, form, args) {
  const closeBtn = popupContainer.querySelector(args.closeButtonSelector);
  closeBtn.addEventListener('click', () => {
    closePopup(popupContainer, form, inputList, args);
  });
}

function editFormSubmitHandler(evt, form, container, inputList, args) {
  evt.preventDefault();
  const newName = evt.currentTarget.name.value;
  const newJob = evt.currentTarget.job.value;
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  closePopup(container, form, inputList, args);
}

function createEditFormSubmitListener(form, container, inputList, args) {
  initializeInputValues(args.currName, args.currJob);
  form.addEventListener('submit', (evt) => {
    editFormSubmitHandler(evt, form, container, inputList, args);
    args.currName.value = profileName.textContent;
    args.currJob.value = profileJob.textContent;
  });
}

function createNewFormSubmitListener(form, popupContainer, inputList, args) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const title = inputList[0].value;
    const imageUrl = inputList[1].value;
    const cardVals = {name: title, link: imageUrl};
    createCard(cardVals);
    closePopup(popupContainer, form, inputList, args);
    evt.target.reset();    
  });
}

function enableValidation(args) {
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

createModal(editModalTemplate, editBtn);
createModal(addModalTemplate, addBtn);
enableValidation(modalArgs);