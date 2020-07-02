import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import FormValidator from "./FormValidator.js";
import handleCardClick from "./utils.js";
import UserInfo from "./UserInfo.js";

const cardSelector = "#card-template";
const placesGridSelector = ".places__grid";

const editBtn = document.querySelector(".button_action_edit");
const addBtn = document.querySelector(".button_action_add");
const profileNameSelector = ".profile__name";
const profileJobSelector = ".profile__job";

const editContainer = document.querySelector(".popup__container_type_edit");
const editForm = editContainer.querySelector(".popup__form");

const addContainer = document.querySelector(".popup__container_type_add");
const addForm = addContainer.querySelector(".popup__form");

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
  cardSelector: "#card-template",
};

const addFormValidator = new FormValidator(modalArgs, addForm);
const editFormValidator = new FormValidator(modalArgs, editForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanois National Park",
    link: "https://code.s3.yandex.net/web-code/vanois.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

let cardElements = [];
for (const card of initialCards) {
  let cardEl = new Card(card.name, card.link, cardSelector);
  cardEl = cardEl.generateCard();
  cardElements.push(cardEl);
}

const cardList = new Section(
  {
    data: cardElements,
    renderer: (element) => {
      cardList.addItem(element);
    },
  },
  placesGridSelector
);
cardList.renderItems();

const editModalPopup = new PopupWithForm(
  ".popup__container_type_edit",
  formSubmitHandler
);
const addModalPopup = new PopupWithForm(
  ".popup__container_type_add",
  formSubmitHandler
);
editModalPopup.setEventListeners();
addModalPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector,
});

function formSubmitHandler(inputValues, form, cardSelector, evt) {
  evt.preventDefault();
  if (form.id === "edit-form") {
    userInfo.setUserInfo(inputValues);
    editModalPopup.close();
  } else {
    let newCard = new Card(
      inputValues.title,
      inputValues.imageUrl,
      cardSelector,
      handleCardClick
    );
    newCard = newCard.generateCard();
    cardList.addItem(newCard);
    addModalPopup.close();
  }
}

editBtn.addEventListener("click", () => {
  editModalPopup.open();
});

addBtn.addEventListener("click", () => {
  addModalPopup.open();
});
