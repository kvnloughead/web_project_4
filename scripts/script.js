const editBtn = document.querySelector('.button_action_edit');
const addBtn = document.querySelector('.button_action_add');

const editModalTemplate = document.querySelector('#edit-modal-template');
const addModalTemplate = document.querySelector('#add-modal-template');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function toggleOverlayAndModal(evt) {
  
  popup.classList.toggle('transition_type_modal-overlay');

  if (evt.type !== "submit") {

    const btnClassList = Array.from(evt.target.classList);

    if (btnClassList.includes('button_action_add')) {
      const clone = addModalTemplate.content.cloneNode(true);
      const addModal = clone.querySelector('.popup__container');
      const closeAddBtn = clone.querySelector('.button_action_close');
      const addFormElement = clone.querySelector('.popup__form');

      closeAddBtn.addEventListener('click', closePopup);
      addFormElement.addEventListener('submit', newFormSubmitHandler);

      placesGrid.parentNode.appendChild(clone); 
      window.setTimeout(
        () => addModal.classList.add('transition_type_container'),
        0);


    } else if (btnClassList.includes('button_action_edit')){
      const clone = editModalTemplate.content.cloneNode(true);
      const editModal = clone.querySelector('.popup__container');
      const closeEditBtn = clone.querySelector('.button_action_close');
      const editFormElement = clone.querySelector('.popup__form');
      const [name, job] = editFormElement.querySelectorAll('.popup__input'); 

      name.value = profileName.textContent;
      job.value = profileJob.textContent;

      closeEditBtn.addEventListener('click', closePopup);
      editFormElement.addEventListener('submit', editFormSubmitHandler);

      placesGrid.parentNode.appendChild(clone);
      window.setTimeout(
        () => editModal.classList.add('transition_type_container'),
        0);     
    }
  }
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

editBtn.addEventListener('click', toggleOverlayAndModal);
addBtn.addEventListener('click', toggleOverlayAndModal);
