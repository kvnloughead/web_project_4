// https://practicum.yandex.com/learn/web/courses/257e1ed2-4cd8-4b85-9ed8-4bf4900f6919/sprints/2040/topics/6f0703ea-52f5-4897-9831-e0e7377ff892/lessons/afb64552-d440-4c70-8944-2c4314f6ed9a/


// Without error message, only styling the input 

// First, select all the needed form elements, and assign them to variables
const formElement = document.querySelector(".form");
const formInput = formElement.querySelector(".form__input");

// Code the 1st function, which shows the error element
const showInputError = (element) => {
  element.classList.add("form__input_type_error");
};

// Code the 2nd function, which hides the error element
const hideInputError = (element) => {
  element.classList.remove("form__input_type_error");
};

// Code the 3rd function, which checks if the field is valid
const isValid = () => {
  if (!formInput.validity.valid) {
    // If NOT (!), show the error element
    showInputError(formInput);
  } else {
    // If it's valid, hide the error element
    hideInputError(formInput);
  }
};
 
formElement.addEventListener("submit", function (evt) {
  // Cancel the browser default action, so that clicking on the submit button won't refresh the page
  evt.preventDefault();
});

// Call the isValid() function for each character input
formInput.addEventListener("input", isValid);


// With error message

const formElement = document.querySelector(".form");
const formInput = formElement.querySelector(".form__input");
const formError = formElement.querySelector(`#${formInput.id}-error`);

// The error message will be the function's second parameter
const showInputError = (element, errorMessage) => {
  element.classList.add("form__input_type_error");
  // Replace the content of the error message with the passed errorMessage argument
  formError.textContent = errorMessage;
  formError.classList.add("form__input-error_active");
};

const hideInputError = (element) => {
  element.classList.remove("form__input_type_error");
  formError.classList.remove("form__input-error_active");
  // Reset the error
  formError.textContent = "";
};

const isValid = () => {
  if (!formInput.validity.valid) {
    // The error message itself is the function's second parameter
    showInputError(formInput, formInput.validationMessage);
  } else {
    hideInputError(formInput);
  }
};
 
// The rest of the code remains unchanged