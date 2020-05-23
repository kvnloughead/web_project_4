const editBtn = document.querySelector('.button_action_edit');
const addBtn = document.querySelector('.button_action_add');
const editModalTemplate = document.querySelector('#edit-modal-template');
const addModalTemplate = document.querySelector('#add-modal-template');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');


function openModalPopup(evt) {
  popup.classList.toggle('transition_type_modal-overlay');
  const btnClassList = Array.from(evt.target.classList);
  if (btnClassList.includes('button_action_add')) {
    createAndInstantiateAddModalPopup();
  } else if (btnClassList.includes('button_action_edit')){
    createAndInstantiateEditModalPopup();
  }
}

function createAndInstantiateAddModalPopup() {
  const cloneOfAddTemplate = addModalTemplate.content.cloneNode(true);
  const addModal = cloneOfAddTemplate.querySelector('.popup__container');

  const closeAddBtn = cloneOfAddTemplate.querySelector('.button_action_close');
  closeAddBtn.addEventListener('click', closePopup);

  const addFormElement = cloneOfAddTemplate.querySelector('.popup__form');
  addFormElement.addEventListener('submit', newFormSubmitHandler);

  placesGrid.parentNode.appendChild(cloneOfAddTemplate); 
  window.setTimeout(
    () => addModal.classList.add('transition_type_container'),
    0);
}

function createAndInstantiateEditModalPopup() {
  const cloneOfEditTemplate = editModalTemplate.content.cloneNode(true);
  const editModal = cloneOfEditTemplate.querySelector('.popup__container');
  const editFormElement = cloneOfEditTemplate.querySelector('.popup__form');

  const [name, job] = editFormElement.querySelectorAll('.popup__input'); 
  name.value = profileName.textContent;
  job.value = profileJob.textContent;

  const closeEditBtn = cloneOfEditTemplate.querySelector('.button_action_close');
  closeEditBtn.addEventListener('click', closePopup);
  editFormElement.addEventListener('submit', editFormSubmitHandler);

  placesGrid.parentNode.appendChild(cloneOfEditTemplate);
  window.setTimeout(
    () => editModal.classList.add('transition_type_container'),
    0); 
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();

  const newName = evt.currentTarget.firstElementChild.value;
  const newJob = evt.currentTarget.firstElementChild.nextElementSibling.value;
  profileName.textContent = newName;
  profileJob.textContent = newJob;

  closePopup(evt);
}

function newFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardVals = {name: title.value, link: imageUrl.value};
  createCard(cardVals);
  closePopup(evt);
}

editBtn.addEventListener('click', openModalPopup);
addBtn.addEventListener('click', openModalPopup);
