import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupContainer.querySelector('.popup__form');
  }

  _getInputValues() {
    // Get all field elements
    this._inputList = this._popupContainer.querySelectorAll(".popup__input");
  
    // Create an empty object
    this._formValues = {};
  
    // Add the values of the fields to this object
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
  
    // Return the values object
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupContainer.addEventListener('submit', (evt) => {
      this._handleFormSubmit(this._formValues, 
                             this._form,
                             this._popupContainer, 
                             '#card-template',
                            evt)
    })
  }

  close() {
    // modify to reset form
  }
}