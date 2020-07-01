import PopupWithImage from './PopupWithImage.js';

const imagePopupSelector = '.popup__image-container';
const imageOverlay = document.querySelector(".popup__image-overlay");
const imagePopupTemplate = document.querySelector("#image-popup-template");
const cloneOfTemplate = imagePopupTemplate.content.cloneNode(true);
const imagePopupContainer = cloneOfTemplate.querySelector(
  ".popup__image-container"
);
imageOverlay.parentNode.appendChild(imagePopupContainer);

// const imagePopupEl = document.querySelector(".popup__image");
// const captionEl = document.querySelector(".popup__image-caption");

// function closeImagePopup(container) {
//   container.classList.remove("popup__image-container_visible");
//   imageOverlay.classList.remove("popup__image-overlay_visible");
// }

// function addImagePopupEventListeners() {
//   const closeBtn = imagePopupContainer.querySelector(".button_action_close");
//   closeBtn.addEventListener("click", () => {
//     closeImagePopup(imagePopupContainer);
//   });
//   document.addEventListener("keydown", (evt) => {
//     if (
//       evt.key === "Escape" &&
//       imagePopupContainer.classList.contains("popup__image-container_visible")
//     ) {
//       closeImagePopup(imagePopupContainer);
//     }
//   });
//   imageOverlay.addEventListener("click", () => {
//     if (
//       imagePopupContainer.classList.contains("popup__image-container_visible")
//     ) {
//       closeImagePopup(imagePopupContainer);
//     }
//   });
// }

export default function handleCardClick(name, imageUrl) {
  const popup = new PopupWithImage(imagePopupSelector, name, imageUrl);
  popup.open();
}

// export function openImagePopupHandler(name, link) {
//   imagePopupEl.src = link;
//   imagePopupEl.alt = `Image of ${name}`;
//   captionEl.textContent = name;
//   addImagePopupEventListeners();
//   imagePopupContainer.classList.add("popup__image-container_visible");
//   imageOverlay.classList.add("popup__image-overlay_visible");
// }
