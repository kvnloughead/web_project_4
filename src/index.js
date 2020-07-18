import "./pages/index.css";

import Api from "./components/Api.js";
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
  imagePopupSelector,
  popupOverlay,
  imagePopupContainer,
  profileImageSelector,
} from "./utils/constants.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-2",
  headers: {
    authorization: "dc340326-95ec-4474-9060-e6102316f742",
    "Content-Type": "application/json"
  }
});

api.getInitialCards()
  .then((initialCards) => {
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
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector,
  imageSelector: profileImageSelector
});

api.loadUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res);
  });

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

// const cardElements = [];
// for (const card of initialCards) {
//   let cardEl = new Card(card.name, card.link, cardSelector, handleCardClick);
//   cardEl = cardEl.generateCard();
//   cardElements.push(cardEl);
// }

// const cardList = new Section(
//   {
//     data: cardElements,
//     renderer: (element) => {
//       cardList.addItem(element);
//     },
//   },
//   placesGridSelector
// );
// cardList.renderItems();

// const userInfo = new UserInfo({
//   nameSelector: profileNameSelector,
//   jobSelector: profileJobSelector,
// });

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


function editFormSubmitHandler(inputValues, evt) {
  evt.preventDefault();
  userInfo.setUserInfo(inputValues);
  editModalPopup.close();
}

function addFormSubmitHandler(inputValues, evt, selector) {
  evt.preventDefault();
  let newCard = new Card(
    inputValues.title,
    inputValues.imageUrl,
    selector,
    handleCardClick
  );
  newCard = newCard.generateCard();
  cardList.addItem(newCard);
  addModalPopup.close();
}


editBtn.addEventListener("click", () => {
  editModalPopup.open(userInfo.getUserInfo());
});

addBtn.addEventListener("click", () => {
  addModalPopup.open();
});
