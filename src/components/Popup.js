export default class Popup {
  constructor(popupSelector) {
    this._popupContainerClass = `${popupSelector.split("__")[0]}__${
      popupSelector.split("_")[2]}`.slice(1);
    this._popupOverlaySelector = ".popup__overlay";
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
        evt.target.removeEventListener("keydown", this._handleEscClose);
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
