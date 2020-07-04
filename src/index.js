import "./pages/index.css";

import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import FormValidator from "./components/FormValidator.js";
import handleCardClick from "./utils/utils.js";
import UserInfo from "./components/UserInfo.js";
import { cardSelector, placesGridSelector, editBtn, addBtn, 
         profileNameSelector, profileJobSelector, editForm, 
         addForm, modalArgs, initialCards } from "./utils/constants.js";


const addFormValidator = new FormValidator(modalArgs, addForm);
const editFormValidator = new FormValidator(modalArgs, editForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

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
