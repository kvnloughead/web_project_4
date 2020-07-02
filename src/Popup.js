export default class Popup {
  constructor(popupSelector) {
    if (popupSelector === ".popup__image-container") {
      this._popupOverlaySelector = ".popup__image-overlay";
      this._popupContainerClass = popupSelector.slice(1);
    } else {
      this._popupOverlaySelector = ".popup__modal-overlay";
      this._popupContainerClass = "popup__container";
    }
    this._popupOverlayClass = this._popupOverlaySelector.slice(1);
    this._popupOverlay = document.querySelector(this._popupOverlaySelector);

    this._popupContainerSelector = popupSelector;
    this._popupContainer = document.querySelector(this._popupContainerSelector);

    this._closeButton = this._popupContainer.querySelector(
      ".button_action_close"
    );
  }

  open() {
    this._popupOverlay.classList.add(`${this._popupOverlayClass}_visible`);
    this._popupContainer.classList.add(`${this._popupContainerClass}_visible`);
  }

  close() {
    this._popupOverlay.classList.remove(`${this._popupOverlayClass}_visible`);
    this._popupContainer.classList.remove(
      `${this._popupContainerClass}_visible`
    );
  }

  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      if (
        evt.key === "Escape" &&
        this._popupContainer.classList.contains(
          `${this._popupContainerClass}_visible`
        )
      ) {
        this.close();
      }
    });
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    this._popupOverlay.addEventListener("click", () => {
      this.close();
    });
    this._handleEscClose();
  }
}
