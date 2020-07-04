import PopupWithImage from "../components/PopupWithImage.js";

const imagePopupSelector = ".popup__image-container";
const imageOverlay = document.querySelector(".popup__image-overlay");
const imagePopupTemplate = document.querySelector("#image-popup-template");
const cloneOfTemplate = imagePopupTemplate.content.cloneNode(true);
const imagePopupContainer = cloneOfTemplate.querySelector(
  ".popup__image-container"
);
imageOverlay.parentNode.appendChild(imagePopupContainer);

export default function handleCardClick(name, imageUrl) {
  const popup = new PopupWithImage(imagePopupSelector, name, imageUrl);
  popup.setEventListeners();
  popup.open();
}
