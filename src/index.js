import "./pages/index.css";

import Api from "./components/Api.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithConfirm from "./components/PopupWithConfirm.js";
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
  deleteForm,
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

function handleLikeClick() {}

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector,
  imageSelector: profileImageSelector,
});

api.loadUserInfo().then((res) => {
  userInfo.setUserInfo(res);
});

const cardElements = api
  .getInitialCards()
  .then((initialCards) => {
    const cardElements = [];
    for (const card of initialCards) {
      let cardEl = new Card(
        card._id,
        card.name,
        card.link,
        cardSelector,
        card.likes,
        card.owner._id,
        userInfo._id,
        handleCardClick,
        handleLikeClick,
        openDeleteModal
      );
      cardEl = cardEl.generateCard();
      cardElements.push(cardEl);
    }
    return cardElements;
  })
  .then((cardElements) => {
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
  .then((cardList) => {
    const addModalPopup = new PopupWithForm(
      ".popup__container_type_add",
      addFormSubmitHandler,
      cardList
    );
    addModalPopup.setEventListeners();
    addBtn.addEventListener("click", () => {
      addModalPopup.open();
    });
  })
  .catch((err) => {
    console.log(err);
  });

popupOverlay.parentNode.appendChild(imagePopupContainer);
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const addFormValidator = new FormValidator(modalArgs, addForm);
const editFormValidator = new FormValidator(modalArgs, editForm);
const avatarFormValidator = new FormValidator(modalArgs, avatarForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();

export default function handleCardClick(name, imageUrl) {
  imagePopup.open(name, imageUrl);
}

const editModalPopup = new PopupWithForm(
  ".popup__container_type_edit",
  editFormSubmitHandler
);
const changeAvatarPopup = new PopupWithForm(
  ".popup__container_type_avatar",
  changeAvatarSubmitHandler
);
const deletePopup = new PopupWithConfirm(
  ".popup__container_type_delete",
  deleteButtonSubmitHandler
);

editModalPopup.setEventListeners();
changeAvatarPopup.setEventListeners();
deletePopup.setEventListeners();

function openDeleteModal(cardId, card) {
  deletePopup.open(cardId, card);
}

function deleteButtonSubmitHandler(cardId, card) {
  api.deleteCard(cardId);
  deletePopup.close();
  card.remove();
  card = null;
}

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

function addFormSubmitHandler(
  inputValues,
  evt,
  selector,
  addModalPopup,
  cardList
) {
  evt.preventDefault();
  api
    .addNewCard(inputValues)
    .then((res) => {
      return res.json();
    })
    .then(({ name, link, likes, _id, owner }) => {
      let newCard = new Card(
        _id,
        name,
        link,
        selector,
        likes,
        owner._id,
        userInfo._id,
        handleCardClick,
        handleLikeClick,
        openDeleteModal
      );
      newCard = newCard.generateCard();
      cardList.addItem(newCard);
      cardList.renderItems();
      // cardList.then((data) => {
      //   data.addItem(newCard);
      //   data.renderItems();
      // });
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

profileImageElement.addEventListener("click", () => {
  changeAvatarPopup.open();
});
