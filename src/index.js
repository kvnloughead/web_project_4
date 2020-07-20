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
  profileImageSelector,
  profileImageElement,
  editForm,
  addForm,
  avatarForm,
  modalArgs,
  imagePopupSelector,
  popupOverlay,
  imagePopupContainer,
} from "./utils/constants.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-2",
  headers: {
    authorization: "dc340326-95ec-4474-9060-e6102316f742",
    "Content-Type": "application/json",
  },
});

function handleLikeClick() {
  
}

const cardList = api
  .getInitialCards()
  .then((initialCards) => {
    const cardElements = [];
    for (const card of initialCards) {
      let cardEl = new Card(
        card.name,
        card.link,
        cardSelector,
        card.likes,
        handleCardClick,
        handleLikeClick
      );
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
    return cardList;
  })
  .catch((err) => {
    console.log(err);
  });

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector,
  imageSelector: profileImageSelector,
});

api.loadUserInfo().then((res) => {
  userInfo.setUserInfo(res);
});

popupOverlay.parentNode.appendChild(imagePopupContainer);
const popup = new PopupWithImage(imagePopupSelector);
popup.setEventListeners();

const addFormValidator = new FormValidator(modalArgs, addForm);
const editFormValidator = new FormValidator(modalArgs, editForm);
const avatarFormValidator = new FormValidator(modalArgs, avatarForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();

export default function handleCardClick(name, imageUrl) {
  popup.open(name, imageUrl);
}

const editModalPopup = new PopupWithForm(
  ".popup__container_type_edit",
  editFormSubmitHandler
);
const addModalPopup = new PopupWithForm(
  ".popup__container_type_add",
  addFormSubmitHandler
);
const changeAvatarPopup = new PopupWithForm(
  ".popup__container_type_avatar",
  changeAvatarSubmitHandler
);
editModalPopup.setEventListeners();
addModalPopup.setEventListeners();
changeAvatarPopup.setEventListeners();

function editFormSubmitHandler(inputValues, evt) {
  evt.preventDefault();
  api
    .changeUserInfo(inputValues)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      userInfo.setUserInfo(data);
    });
  editModalPopup.close();
}

function addFormSubmitHandler(inputValues, evt, selector) {
  evt.preventDefault();
  api
    .addNewCard(inputValues)
    .then((res) => {
      return res.json();
    })
    .then(({ name, link }) => {
      let newCard = new Card(name, link, selector, handleCardClick, handleLikeClick);
      newCard = newCard.generateCard();
      cardList.then((data) => {
        data.addItem(newCard);
        data.renderItems();
      });
    });
  addModalPopup.close();
}

function changeAvatarSubmitHandler(inputValues, evt) {
  evt.preventDefault();
  api
    .changeAvatar(inputValues.avatar)
    .then((res) => {
      return res.json();
    })
    .then(({ avatar }) => {
      profileImageElement.src = avatar;
      changeAvatarPopup.close();
    });
}

editBtn.addEventListener("click", () => {
  editModalPopup.open(userInfo.getUserInfo());
});

addBtn.addEventListener("click", () => {
  addModalPopup.open();
});

profileImageElement.addEventListener("click", () => {
  changeAvatarPopup.open();
});
