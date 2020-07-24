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

const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  jobSelector: profileJobSelector,
  imageSelector: profileImageSelector,
});

<<<<<<< HEAD
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

=======
api
  .loadUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err);
  });

function handleCardClick(name, imageUrl) {
  imagePopup.open(name, imageUrl);
}

function handleLikeClick(card, cardId, isLiked) {
  const method = isLiked ? "DELETE" : "PUT";
  api.updateLikes(cardId, method).then((data) => {
    card._likes = data.likes;
  })
  .catch((err) => {
    console.log(err);
  });
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
  api.deleteCard(cardId)
    .then(() => {
      deletePopup.close();
      card.remove();
      card = null;
    })
    .catch((err) => {
      console.log(err);
    });
}

function editFormSubmitHandler(inputValues, evt) {
  evt.preventDefault();
  api
    .changeUserInfo(inputValues)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .then(() => {
      editModalPopup.close();
    })
    .then(() => {
      editModalPopup.submissionComplete();
    })
    .catch((err) => {
      console.log(err);
    });
}

const addFormValidator = new FormValidator(modalArgs, addForm);
const editFormValidator = new FormValidator(modalArgs, editForm);
const avatarFormValidator = new FormValidator(modalArgs, avatarForm);
addFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();
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
      addModalPopup.close();
    })
    .then(() => {
      addModalPopup.submissionComplete();
    })
    .catch((err) => {
      console.log(err);
    });
}

popupOverlay.parentNode.appendChild(imagePopupContainer);
const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

function changeAvatarSubmitHandler(inputValues, evt) {
  evt.preventDefault();
  api
    .changeAvatar(inputValues.avatar)
    .then(({ avatar }) => {
      profileImageElement.src = avatar;
      changeAvatarPopup.close();
    })
    .then(() => {
      changeAvatarPopup.submissionComplete();
    })
    .catch((err) => {
      console.log(err);
    });
}

>>>>>>> master
editBtn.addEventListener("click", () => {
  editModalPopup.open(userInfo.getUserInfo());
});

profileImageElement.addEventListener("click", () => {
  changeAvatarPopup.open();
});
