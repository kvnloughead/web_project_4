import { Card } from './Card.js';
import { modalOverlay, FormValidator } from './FormValidator.js';

const cardSelector = '#card-template';
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
}

createModal(editModalTemplate, editBtn);
createModal(addModalTemplate, addBtn);
 
for (const card of initialCards) {
  const cardEl = new Card(card.name, card.link, cardSelector);
  cardEl.generateCard();
} 

const forms = Array.from(document.querySelectorAll('.popup__form'));
for (const form of forms) {
  const validator = new FormValidator(modalArgs, form);
  validator.enableValidation();
}

