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

function showInputError(formElement, inputElement, errorMessage, modalArgs) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
  inputElement.classList.add(modalArgs.inactiveInputClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(modalArgs.errorClass);
}

function hideInputError(formElement, inputElement, modalArgs) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
  inputElement.classList.remove(modalArgs.inactiveInputClass);
  errorElement.classList.remove(modalArgs.errorClass);
  errorElement.textContent = "";
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function checkInputValidity(formElement, inputElement, buttonElement, modalArgs) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, modalArgs);
  } else {
    hideInputError(formElement, inputElement, modalArgs);
  }
}

function toggleFormActiveState(inputList, buttonElement, modalArgs) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(modalArgs.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(modalArgs.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function addInputListeners(form, inputList, submitButtonElement, modalArgs) {
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(form, inputElement, submitButtonElement, modalArgs);
      toggleFormActiveState(inputList, submitButtonElement, modalArgs);
    });
  });
}

function closePopup(popupContainer, form, inputList, modalArgs) {
  popupContainer.classList.remove('popup__container_visible');
  modalOverlay.classList.remove('popup__modal-overlay_visible');
  for (const input of inputList) {
    hideInputError(form, input, modalArgs);
  }
  form.reset();
  if (form.id === 'edit-form') {
    initializeInputValues(modalArgs.currName, modalArgs.currJob);
  }
}

function addEscapeKeyListener(form, container, inputList, modalArgs) {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === "Escape" && container.classList.contains('popup__container_visible')) {
      closePopup(container, form, inputList, modalArgs);
    }
  }); 
}

function addPopupOverlayListener(form, popupContainer, inputList, modalArgs) {
  modalOverlay.addEventListener('click', () => {
    if (popupContainer.classList.contains('popup__container_visible')) {
      closePopup(popupContainer, form, inputList, modalArgs);
    }
  });
}

function openModalPopup(form, container, inputList, modalArgs) {
  container.classList.toggle('popup__container_visible');
  modalOverlay.classList.toggle('popup__modal-overlay_visible');
  addEscapeKeyListener(form, container, inputList, modalArgs);
  addPopupOverlayListener(form, container, inputList, modalArgs);
}

function createModal(modalTemplate, buttonElement) {
  const cloneOfTemplate = modalTemplate.content.cloneNode(true);
  const container = cloneOfTemplate.querySelector('.popup__container');
  const form = container.querySelector('.popup__form');
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  buttonElement.addEventListener('click', () => {
    openModalPopup(form, container, inputList, modalArgs);
  });
  // Your comment last time seemed to imply that you thought I was appending 
  // new modals each time the button was clicked, but I don't think that is so.  
  // This function createModal runs only once at page loading for each modal.
  //  Then openModalPopup simply toggles visibility.
  editBtn.parentNode.appendChild(cloneOfTemplate);
}

function addCloseBtnEventListener(popupContainer, inputList, form, modalArgs) {
  const closeBtn = popupContainer.querySelector(modalArgs.closeButtonSelector);
  closeBtn.addEventListener('click', () => {
    closePopup(popupContainer, form, inputList, modalArgs);
  });
}

function editFormSubmitHandler(evt, form, container, inputList, modalArgs) {
  evt.preventDefault();
  const newName = evt.currentTarget.name.value;
  const newJob = evt.currentTarget.job.value;
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  closePopup(container, form, inputList, modalArgs);
}


function createEditFormSubmitListener(form, container, inputList, modalArgs) {
  initializeInputValues(modalArgs.currName, modalArgs.currJob);
  form.addEventListener('submit', (evt) => {
    editFormSubmitHandler(evt, form, container, inputList, modalArgs);
    modalArgs.currName.value = profileName.textContent;
    modalArgs.currJob.value = profileJob.textContent;
  });
}


function createNewFormSubmitListener(form, popupContainer, inputList, modalArgs) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const title = inputList[0].value;
    const imageUrl = inputList[1].value;
    const cardVals = {name: title, link: imageUrl};
    createCard(cardVals);
    closePopup(popupContainer, form, inputList, modalArgs);
    evt.target.reset();    
  });
}

function enableValidation(modalArgs) {
  const forms = Array.from(document.querySelectorAll(modalArgs.formSelector));
  for (const form of forms) {
    const inputList = Array.from(form.querySelectorAll(modalArgs.inputSelector));
    const submitButtonElement = form.querySelector(modalArgs.submitButtonSelector);
    const container = form.parentNode;
    toggleFormActiveState(inputList, submitButtonElement, modalArgs);
    addInputListeners(form, inputList, submitButtonElement, modalArgs);
    addCloseBtnEventListener(container, inputList, form, modalArgs);
    if (form.id === 'edit-form') {
      const [currName, currJob] 
          = Array.from(form.querySelectorAll(modalArgs.inputSelector)); 
      modalArgs.currName = currName;
      modalArgs.currJob = currJob;
      createEditFormSubmitListener(form, container, inputList, modalArgs);
      initializeInputValues(modalArgs.currName, modalArgs.currJob);
    } else if (form.id === 'add-form') {
      createNewFormSubmitListener(form, container, inputList, modalArgs);
    }
  }
}

createModal(editModalTemplate, editBtn);
createModal(addModalTemplate, addBtn);
enableValidation(modalArgs);