const editBtn = document.querySelector('.button_action_edit');
const popup = document.querySelector('.popup');
const editModal = popup.querySelector('.popup__container_type_edit');
const addModal = popup.querySelector('.popup__container_type_new-place');
const closeEditBtn = popup.querySelectorAll('.button_action_close')[0];
const closeNewBtn = popup.querySelectorAll('.button_action_close')[1];
const addBtn = document.querySelector('.button_action_add');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const editFormElement = popup.querySelectorAll('.popup__form')[0];
const addFormElement = popup.querySelectorAll('.popup__form')[1];
const [name, job] = popup.querySelectorAll('.popup__input');

function toggleOverlayAndModal(evt) {
  const btnClassList = Array.from(evt.target.classList);
  popup.classList.toggle('popup_visible');
  if (btnClassList.includes('button_action_add')) {
    editModal.classList.add('popup__container_invisible');
    addModal.classList.remove('popup__container_invisible');
  } else if (btnClassList.includes('button_action_edit')){
    addModal.classList.add('popup__container_invisible');
    editModal.classList.remove('popup__container_invisible');
    name.value = profileName.textContent;
    job.value = profileJob.textContent;
  }
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = name.value;
  profileJob.textContent = job.value;
  toggleOverlayAndEditModal();
}

function newFormSubmitHandler(evt) {
  evt.preventDefault();
  let elements = createCardElements();
  elements = addClassesToCardElements(elements);
  elements = addContentToCardElements(elements, title.value,
                                      imageUrl.value);
  nestCardElements(elements);


  toggleOverlayAndEditModal();
}

editBtn.addEventListener('click', toggleOverlayAndModal);
addBtn.addEventListener('click', toggleOverlayAndModal);
closeEditBtn.addEventListener('click', toggleOverlayAndModal);
closeNewBtn.addEventListener('click', toggleOverlayAndModal)  
editFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', newFormSubmitHandler);
