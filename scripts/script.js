const placesGrid = document.querySelector('.places__grid');
const imagePopupTemplate = document.querySelector('#image-popup-template');
const cardTemplate = document.querySelector('#card-template');
const popupOverlay = document.querySelector('.popup');
const editBtn = document.querySelector('.button_action_edit');
const addBtn = document.querySelector('.button_action_add');
const editModalTemplate = document.querySelector('#edit-modal-template');
const addModalTemplate = document.querySelector('#add-modal-template');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const initialCards = [
  {
      name: 'Yosemite Valley',
      link: 'https://code.s3.yandex.net/web-code/yosemite.jpg'
      
  },
  {
      name: 'Lake Louise',
      link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg'
  },
  {
      name: 'Bald Mountains',
      link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg'
  },
  {
      name: 'Latemar',
      link: 'https://code.s3.yandex.net/web-code/latemar.jpg'
  },
  {
      name: 'Vanois National Park',
      link: 'https://code.s3.yandex.net/web-code/vanois.jpg'
  },
  {
      name: 'Lago di Braies',
      link: 'https://code.s3.yandex.net/web-code/lago.jpg'
  }
];

function createInitialCards(initialCards) {
  for (const card of initialCards) {
    createCard(card);
  }  
}

function createCard(card) {
  const cloneOfTemplate = cardTemplate.content.cloneNode(true);
  const imageEl = cloneOfTemplate.querySelector('.place__image');
  const nameEl = cloneOfTemplate.querySelector('.place__name');
  const placeEl = cloneOfTemplate.querySelector('.place');
  const likeBtnEl = cloneOfTemplate.querySelector('.place__like-btn');
  const deleteBtnEl = cloneOfTemplate.querySelector('.button_action_delete');
  addContentToCard(imageEl, nameEl, card);
  imagePopupContainer = createImagePopup(imageEl, nameEl.textContent);
  addEventListeners(nameEl, imageEl, likeBtnEl, 
    deleteBtnEl, placeEl, imagePopupContainer, card);
  placesGrid.prepend(cloneOfTemplate);
}

function addContentToCard(imageEl, nameEl, card) {
  imageEl.style.backgroundImage = `url(${card.link})`;
  nameEl.textContent = card.name;
}

function addEventListeners(nameEl, imageEl, likeBtnEl, deleteBtnEl, placeEl, imagePopupContainer,card) {
  imageEl.addEventListener('click', function (evt) {
    openPopup(imagePopupContainer, 'image');
  });
  likeBtnEl.addEventListener('click', 
    () => likeBtnEl.classList.toggle('place__like-btn_clicked')
  );
  deleteBtnEl.addEventListener('click', 
    () => placeEl.parentNode.removeChild(placeEl)
  );
}

function createImagePopup(image, name) {
  const cloneOfTemplate = imagePopupTemplate.content.cloneNode(true);
  const imagePopupContainer 
    = cloneOfTemplate.querySelector('.popup__image-container');
  const imagePopupEl = cloneOfTemplate.querySelector('.popup__image');
  const captionEl = cloneOfTemplate.querySelector('.popup__image-caption');
  addContentToImagePopup(image, imagePopupEl, captionEl, name);
  addCloseBtnEventListener(cloneOfTemplate, imagePopupContainer);
  placesGrid.parentNode.appendChild(imagePopupContainer);
  return imagePopupContainer;
}

function addContentToImagePopup(image, imagePopupEl, captionEl, name) {
  const imageUrl = image.style.backgroundImage.split('"')[1];
  imagePopupEl.src = imageUrl;
  imagePopupEl.alt = `Image of ${name}`;
  captionEl.textContent = name;
}

function addCloseBtnEventListener(cloneOfTemplate, popup) {
  const closeBtn = cloneOfTemplate.querySelector('.button_action_close');
  closeBtn.addEventListener('click', function() {
    closePopup(popup);
  });
}

function openPopup(popupContainer, popupType) {
  popupContainer.classList.toggle('transition');
  if (popupType === 'image') {
    popupOverlay.classList.add('popup_type_image');
  } else {
    popupOverlay.classList.remove('popup_type_image');
  }
  popupOverlay.classList.toggle('transition');
}

function closePopup(popup) {
  popup.classList.toggle('transition');
  popupOverlay.classList.toggle('transition');
}

function openModalPopup(evt) {
  const btnClassList = Array.from(evt.target.classList);
  if (btnClassList.includes('button_action_add')) {
    createAndInstantiateAddModalPopup();
  } else if (btnClassList.includes('button_action_edit')){
    createAndInstantiateEditModalPopup();
  }
}

function createAndInstantiateEditModalPopup() {
  const cloneOfEditTemplate = editModalTemplate.content.cloneNode(true);
  const editModal = cloneOfEditTemplate.querySelector('.popup__container');
  const editFormElement = cloneOfEditTemplate.querySelector('.popup__form');
  createEditFormAndSubmitListener(editFormElement, editModal);
  addCloseBtnEventListener(cloneOfEditTemplate, editModal);
  editBtn.addEventListener('click', function() {
    openPopup(editModal, 'modal');
  });
  placesGrid.parentNode.appendChild(cloneOfEditTemplate);
}

function createAndInstantiateAddModalPopup() {
  const cloneOfAddTemplate = addModalTemplate.content.cloneNode(true);
  const addModal = cloneOfAddTemplate.querySelector('.popup__container');
  const addFormElement = cloneOfAddTemplate.querySelector('.popup__form');
  addFormElement.addEventListener('submit', function(evt) {
    newFormSubmitHandler(evt, addModal);
  });
  addCloseBtnEventListener(cloneOfAddTemplate, addModal);
  addBtn.addEventListener('click', function() {
    openPopup(addModal, 'modal');
  });
  placesGrid.parentNode.appendChild(cloneOfAddTemplate); 
}

function createEditFormAndSubmitListener(editFormElement, editModal) {
  const [name, job] = editFormElement.querySelectorAll('.popup__input'); 
  name.value = profileName.textContent;
  job.value = profileJob.textContent;
  editFormElement.addEventListener('submit', function(evt) {
    editFormSubmitHandler(evt, editModal)});
}

function enableEditFormValidation() {
  const editForm = document.forms.editForm;
  const inputList = Array.from(editForm.querySelectorAll(".popup__input"));
  const buttonElement = editForm.querySelector('.button_action_submit');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(editForm, inputElement, buttonElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_inactive");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("button_inactive");
    buttonElement.disabled = false;
  }
};

function checkInputValidity(formElement, inputElement, buttonElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-input-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

function editFormSubmitHandler(evt, editModal) {
  evt.preventDefault();
  const newName = evt.currentTarget.name.value
  const newJob = evt.currentTarget.job.value
  profileName.textContent = newName;
  profileJob.textContent = newJob;
  closePopup(editModal);
}

function newFormSubmitHandler(evt, addModal) {
  evt.preventDefault();
  const cardVals = {name: title.value, link: imageUrl.value};
  createCard(cardVals);
  closePopup(addModal);
}

createInitialCards(initialCards);
createAndInstantiateAddModalPopup();
createAndInstantiateEditModalPopup();
enableEditFormValidation();