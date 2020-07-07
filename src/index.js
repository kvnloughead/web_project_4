import "./pages/index.css";

import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import FormValidator from "./components/FormValidator.js";
import UserInfo from "./components/UserInfo.js";
import {
  cardSelector,
  placesGridSelector,
  editBtn,
  addBtn,
  profileNameSelector,
  profileJobSelector,
  editForm,
  addForm,
  modalArgs,
  initialCards,
  imagePopupSelector,
  popupOverlay,
  imagePopupContainer,
} from "./utils/constants.js";

popupOverlay.parentNode.appendChild(imagePopupContainer);
const popup = new PopupWithImage(imagePopupSelector);
popup.setEventListeners();

const addFormValidator = new FormValidator(modalArgs, addForm);
const editFormValidator = new FormValidator(modalArgs, editForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

export default function handleCardClick(name, imageUrl) {
  popup.open(name, imageUrl);
}

const cardElements = [];
for (const card of initialCards) {
  let cardEl = new Card(card.name, card.link, cardSelector, handleCardClick);
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

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector,
});

function editFormSubmitHandler(inputValues, evt) {
  evt.preventDefault();
  userInfo.setUserInfo(inputValues);
  editModalPopup.close();
}

function addFormSubmitHandler(inputValues, evt, cardSelector) {
  evt.preventDefault();
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

const editModalPopup = new PopupWithForm(
  ".popup__container_type_edit",
  editFormSubmitHandler
);
const addModalPopup = new PopupWithForm(
  ".popup__container_type_add",
  addFormSubmitHandler
);
editModalPopup.setEventListeners();
addModalPopup.setEventListeners();

editBtn.addEventListener("click", () => {
  editModalPopup.open(userInfo.getUserInfo());
});

addBtn.addEventListener("click", () => {
  addModalPopup.open();
});
