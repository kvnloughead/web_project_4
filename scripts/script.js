import { Card } from './Card.js'
import { modalArgs, FormValidator } from './FormValidator.js';

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardSelector = '#card-template';
const forms = Array.from(document.querySelectorAll('.popup__form'));
const modalOverlay = document.querySelector('.popup__modal-overlay');
const editModalTemplate = document.querySelector('#edit-modal-template');
const addModalTemplate = document.querySelector('#add-modal-template');
const editBtn = document.querySelector('.button_action_edit');
const addBtn = document.querySelector('.button_action_add');

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

function initializeInputValues(currName, currJob) {
  currName.value = profileName.textContent;
  currJob.value = profileJob.textContent;
}

function openModalPopup(form, container, inputList, args) {
  if (form.id === 'edit-form') {
    const [currName, currJob] 
        = Array.from(form.querySelectorAll('.popup__input')); 
    initializeInputValues(currName, currJob);
  }
    container.classList.toggle('popup__container_visible');
    modalOverlay.classList.toggle('popup__modal-overlay_visible');
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

createModal(editModalTemplate, editBtn);
createModal(addModalTemplate, addBtn);
 
for (const card of initialCards) {
  const cardEl = new Card(card.name, card.link, cardSelector);
  cardEl.generateCard();
} 

for (const form of forms) {
  const validator = new FormValidator(modalArgs, form);
}

