import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const cardSelector = '#card-template';
const editModalTemplate = document.querySelector('#edit-modal-template');
const addModalTemplate = document.querySelector('#add-modal-template');
const editBtn = document.querySelector('.button_action_edit');
const addBtn = document.querySelector('.button_action_add');
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const modalOverlay = document.querySelector(".popup__modal-overlay");
// const forms = document.querySelectorAll('.popup__form');



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

function openModalPopup(container) {
    container.classList.toggle('popup__container_visible');
    modalOverlay.classList.toggle('popup__modal-overlay_visible');
}

function createModal(modalTemplate, buttonElement) {
  const cloneOfTemplate = modalTemplate.content.cloneNode(true);
  const container = cloneOfTemplate.querySelector('.popup__container');
  buttonElement.addEventListener('click', () => {
    openModalPopup(container);
  });
  editBtn.parentNode.appendChild(cloneOfTemplate);
  const addForm = document.querySelector('#add-form');
  const editForm = document.querySelector('#edit-form');
  if (modalTemplate.id === 'edit-modal-template') {
    createEditFormSubmitListener(editForm, container, modalArgs);
    addCloseBtnEventListener(editForm, container, modalArgs);
    addPopupOverlayListener(editForm, container, modalArgs);
    addEscapeKeyListener(editForm, container, modalArgs);
  } else {
    createNewFormSubmitListener(addForm, container, modalArgs);
    addCloseBtnEventListener(addForm, container, modalArgs);
    addPopupOverlayListener(addForm, container, modalArgs);
    addEscapeKeyListener(addForm, container, modalArgs);
  }
}

// ======================================================

function setInputValues(form, args) {
  const [currName, currJob] = Array.from(
    form.querySelectorAll(args.inputSelector)
  );
  currName.value = profileName.textContent;
  currJob.value = profileJob.textContent;
}

function closePopup(form, container, args) {
  container.classList.remove("popup__container_visible");
  modalOverlay.classList.remove("popup__modal-overlay_visible");
  // for (const input of this._inputList) {
  //   this._hideInputError(input);
  // }
  // form.reset();
  if (form.id === "edit-form") {
    setInputValues(form, args);
  }
}

function editFormSubmitHandler(evt, form, container, args) {
  evt.preventDefault();
  const newName = evt.currentTarget.name.value;
  const newJob = evt.currentTarget.job.value;
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  closePopup(form, container, args);
}

function createEditFormSubmitListener(form, container, args) {
  setInputValues(form, args);
  form.addEventListener("submit", (evt) => {
    editFormSubmitHandler(evt, container, args);
    setInputValues(form, args);
  });
}

function createNewFormSubmitListener(form, args) {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const title = inputList[0].value;
    const imageUrl = inputList[1].value;
    const newCard = new Card(title, imageUrl, this._args.cardSelector);
    newCard.generateCard();
    closePopup(form, container, args);
    evt.target.reset();
  });
}

function addEscapeKeyListener(form, container, args) {
  document.addEventListener("keydown", (evt) => {
    if (
      evt.key === "Escape" &&
      container.classList.contains("popup__container_visible")
    ) {
      closePopup(form, container, args);
    }
  });
}

function addPopupOverlayListener(form, container, args) {
  modalOverlay.addEventListener("click", () => {
    if (container.classList.contains("popup__container_visible")) {
      closePopup(form, container, args);
    }
  });
}

function addCloseBtnEventListener(form, container, args) {
  const closeBtn = container.querySelector(
    args.closeButtonSelector
  );
  closeBtn.addEventListener("click", () => {
    closePopup(form, container, args);
  });
}

// =====================================================

createModal(editModalTemplate, editBtn);
createModal(addModalTemplate, addBtn);
 
for (const card of initialCards) {
  const cardEl = new Card(card.name, card.link, cardSelector);
  cardEl.generateCard();
} 

const addFormValidator = new FormValidator(modalArgs, addForm);
const editFormValidator = new FormValidator(modalArgs, editForm);

// for (const form of forms) {
//   const validator = new FormValidator(modalArgs, form);
//   validator.enableValidation();
// }

