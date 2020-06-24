import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const initialCards = [
  {
      name: 'Yosemite Valley',
      link: 'https://code.s3.yandex.net/web-code/yosemite.jpg'
  },
  {
      name: 'Lake Louise',
      link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg'
  },
  {
      name: 'Bald Mountains',
      link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg'
  },
  {
      name: 'Latemar',
      link: 'https://code.s3.yandex.net/web-code/latemar.jpg'
  },
  {
      name: 'Vanois National Park',
      link: 'https://code.s3.yandex.net/web-code/vanois.jpg'
  },
  {
      name: 'Lago di Braies',
      link: 'https://code.s3.yandex.net/web-code/lago.jpg'
  }
];

const cardSelector = '#card-template';
const placesGrid = document.querySelector(".places__grid");

const editBtn = document.querySelector('.button_action_edit');
const addBtn = document.querySelector('.button_action_add');
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const modalOverlay = document.querySelector(".popup__modal-overlay");

const editContainer = document.querySelector('.popup__container_type_edit');
const editForm = editContainer.querySelector('.popup__form');
const nameInputElement = editForm.elements[0];
const jobInputElement = editForm.elements[1];

const addContainer = document.querySelector('.popup__container_type_add');
const addForm = addContainer.querySelector('.popup__form');
const titleInputElement = addForm.elements[0];
const linkInputElement = addForm.elements[1];

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
  cardSelector: '#card-template'
};

const addFormValidator = new FormValidator(modalArgs, addForm);
const editFormValidator = new FormValidator(modalArgs, editForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

function togglePopupModal(container) {
  if (container.classList.contains('popup__container_type_edit')) {
    nameInputElement.value = profileName.textContent;
    jobInputElement.value = profileJob.textContent;
  } else {
    addForm.reset();
  }
  container.classList.toggle("popup__container_visible");
  modalOverlay.classList.toggle("popup__modal-overlay_visible");
}

function formSubmitHandler(form, container, args, evt) {
  evt.preventDefault();
  if (form.id === 'edit-form'){
    profileName.textContent = nameInputElement.value;
    profileJob.textContent = jobInputElement.value;
  } else {
    let newCard = new Card(titleInputElement.value, linkInputElement.value, args.cardSelector);
    newCard = newCard.generateCard();
    placesGrid.prepend(newCard);
  }
  togglePopupModal(container)
}

function addEscapeKeyListener(container) {
  document.addEventListener("keydown", (evt) => {
    if (
      evt.key === "Escape" &&
      container.classList.contains("popup__container_visible")
    ) {
      togglePopupModal(container)
    }
  });
}

function addPopupOverlayListener(container) {
  modalOverlay.addEventListener("click", (evt) => {
    if (container.classList.contains("popup__container_visible")) {
      togglePopupModal(container)
    }
  });
}

function addModalEventListeners(form, container, args) {
  form.addEventListener('submit', (evt) => {
    formSubmitHandler(form, container, args, evt);
  });
  const closeBtn = container.querySelector(args.closeButtonSelector);
  closeBtn.addEventListener('click', () => {
    togglePopupModal(container);
  });
  addPopupOverlayListener(container);
  addEscapeKeyListener(container);
}

addModalEventListeners(editForm, editContainer, modalArgs);
addModalEventListeners(addForm, addContainer, modalArgs);
 
for (const card of initialCards) {
  let cardEl = new Card(card.name, card.link, cardSelector);
  cardEl = cardEl.generateCard();
  placesGrid.prepend(cardEl);
} 

editBtn.addEventListener('click', () => {
  togglePopupModal(editContainer);
});

addBtn.addEventListener('click', () => {
  togglePopupModal(addContainer);
});



