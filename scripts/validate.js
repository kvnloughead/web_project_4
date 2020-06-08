// const forms = document.forms;
// const editFormElement = document.forms[0];
// const editFormInputs = Array.from(editFormElement.querySelectorAll(".popup__input"));
// const addFormElement = document.forms[1];
// const addFormInputs = Array.from(addFormElement.querySelectorAll(".popup__input"));

function enableValidation(args) {
  const forms = document.querySelectorAll(args.formSelector);
  for (const form of forms) {
    const inputList = Array.from(form.querySelectorAll(args.inputSelector));
    const submitButtonElement = form.querySelector(args.submitButtonSelector);
    toggleFormActiveState(inputList, submitButtonElement, args);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(form, inputElement, submitButtonElement, args);
        toggleFormActiveState(inputList, submitButtonElement, args);
      });
    });
    if (form.id === 'edit-form') {
      const [currName, currJob] = form.querySelectorAll(args.inputSelector); 
      initializeInputValues(form, currName, currJob)
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

function initializeInputValues(editFormElement, currName, currJob) {
  currName.value = profileName.textContent;
  currJob.value = profileJob.textContent;
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
  console.log(errorElement)
  inputElement.classList.remove(args.inactiveInputClass);
  errorElement.classList.remove(args.errorClass);
  errorElement.textContent = "";
};

function addCloseBtnEventListener(cloneOfTemplate, popup, form, inputList, buttonElement, currName, currJob) {
  const closeBtn = cloneOfTemplate.querySelector('.button_action_close');
  closeBtn.addEventListener('click', function() {
    closePopup(popup, form, inputList, buttonElement, currName, currJob);
  });
}

function closePopup(popup, form, inputList, currName, currJob) {
  popup.classList.toggle('transition');
  popupOverlay.classList.toggle('transition');
  if (form) {
    for (const input of inputList) {
      hideInputError(form, input);
    }
    form.reset();
    if (form.id === 'edit-form') {
      initializeInputValues(form,  currName, currJob);
    }
  }
}



enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_action_submit",
  inactiveInputClass: "popup__input_type_inactive",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active"
});