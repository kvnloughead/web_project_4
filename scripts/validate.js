function enableValidation(args) {
  const forms = document.querySelectorAll(args.formSelector);
  for (const form of forms) {
    const inputList = Array.from(form.querySelectorAll(args.inputSelector));
    const submitButtonElement = form.querySelector(args.submitButtonSelector);
    const container = form.parentNode;
    toggleFormActiveState(inputList, submitButtonElement, args);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(form, inputElement, submitButtonElement, args);
        toggleFormActiveState(inputList, submitButtonElement, args);
      });
    });
    addCloseBtnEventListener(container, inputList, form, args);
    if (form.id === 'edit-form') {
      const [currName, currJob] = form.querySelectorAll(args.inputSelector); 
      args.currName = currName;
      args.currJob = currJob;
      createEditFormSubmitListener(form, container, inputList, args);
      initializeInputValues(args)
    } else if (form.id === 'add-form') {
      createNewFormSubmitListener(form, container, inputList, args)
    }
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
};

function initializeInputValues(args) {
  args.currName.value = profileName.textContent;
  args.currJob.value = profileJob.textContent;
}

function checkInputValidity(formElement, inputElement, buttonElement, args) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, args);
  } else {
    hideInputError(formElement, inputElement, args);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function showInputError(formElement, inputElement, errorMessage, args) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
  inputElement.classList.add(args.inactiveInputClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(args.errorClass);
};

function hideInputError(formElement, inputElement, args) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
  inputElement.classList.remove(args.inactiveInputClass);
  errorElement.classList.remove(args.errorClass);
  errorElement.textContent = "";
};

function addCloseBtnEventListener(popupContainer, inputList, form, args) {
  const closeBtn = popupContainer.querySelector(args.closeButtonSelector);
  closeBtn.addEventListener('click', function() {
    closePopup(form, popupContainer, inputList, args);
  });
}

function closePopup(form, popupContainer, inputList, args) {
  console.log(popupContainer)
  popupContainer.classList.toggle('transition');
  popupOverlay.classList.toggle('transition');
  if (!popupContainer.classList.contains('popup__image-container')) {
    for (const input of inputList) {
      hideInputError(form, input, args);
    }
    form.reset();
    if (form.id === 'edit-form') {
      initializeInputValues(args);
    }
  }
}

function createEditFormSubmitListener(form, container, inputList, args) {
  initializeInputValues(args);
  form.addEventListener('submit', function(evt) {
    editFormSubmitHandler(evt, form, container, inputList, args);
    args.currName.value = profileName.textContent;
    args.currJob.value = profileJob.textContent;
  });
}

function editFormSubmitHandler(evt, form, container, inputList, args) {
  evt.preventDefault();
  const newName = evt.currentTarget.name.value
  const newJob = evt.currentTarget.job.value
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  closePopup(form, container, inputList, args);
}

function createNewFormSubmitListener(form, popupContainer, inputList, args) {
  form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const cardVals = {name: title.value, link: imageUrl.value};
    createCard(cardVals);
    closePopup(form, popupContainer, inputList, args);
    evt.target.reset();
    
  })
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_action_submit",
  closeButtonSelector: ".button_action_close",
  popupOverlaySelector: ".popup",

  inactiveInputClass: "popup__input_type_inactive",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
});