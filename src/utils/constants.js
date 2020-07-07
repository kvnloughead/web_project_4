export const cardSelector = "#card-template";
export const placesGridSelector = ".places__grid";
export const editBtn = document.querySelector(".button_action_edit");
export const addBtn = document.querySelector(".button_action_add");
export const profileNameSelector = ".profile__name";
export const profileJobSelector = ".profile__job";
export const editContainer = document.querySelector(".popup__container_type_edit");
export const editForm = editContainer.querySelector(".popup__form");
export const addContainer = document.querySelector(".popup__container_type_add");
export const addForm = addContainer.querySelector(".popup__form");

export const imagePopupSelector = ".popup__image-container";
export const popupOverlay = document.querySelector(".popup__overlay");
export const imagePopupTemplate = document.querySelector("#image-popup-template");
export const cloneOfTemplate = imagePopupTemplate.content.cloneNode(true);
export const imagePopupContainer = cloneOfTemplate.querySelector(
  ".popup__image-container"
);

export const modalArgs = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_action_submit",
  closeButtonSelector: ".button_action_close",
  popupOverlaySelector: ".popup__overlay",
  inactiveInputClass: "popup__input_type_inactive",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__input-error_active",
  cardSelector: "#card-template",
};

export const initialCards = [
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