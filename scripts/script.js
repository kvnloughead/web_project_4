const editBtn = document.querySelector('.button_action_edit');
const popup = document.querySelector('.popup');
const editModal = popup.querySelector('.popup__container_type_edit');
const addModal = popup.querySelector('.popup__container_type_new-place');
const closeEditBtn = popup.querySelectorAll('.button_action_close')[0];
const closeNewBtn = popup.querySelectorAll('.button_action_close')[1];
const saveBtn = popup.querySelector('.button_action_submit');
const addBtn = document.querySelector('.button_action_add');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const formElement = popup.querySelector('.popup__form');
const [name, job] = popup.querySelectorAll('.popup__input');

function toggleOverlayAndEditModal() {
  name.value = profileName.textContent;
  job.value = profileJob.textContent;
  popup.classList.toggle('popup_visible');
}

function toggleOverlayAndModal(evt) {
  const btnClassList = Array.from(evt.target.classList);
  popup.classList.toggle('popup_visible');
  if (btnClassList.includes('button_action_add')) {
    editModal.classList.add('popup__container_invisible');
    addModal.classList.remove('popup__container_invisible');
  } else if (btnClassList.includes('button_action_edit')){
    addModal.classList.add('popup__container_invisible');
    editModal.classList.remove('popup__container_invisible');
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = name.value;
  profileJob.textContent = job.value;
  toggleOverlayAndEditModal();
}

editBtn.addEventListener('click', toggleOverlayAndModal);
addBtn.addEventListener('click', toggleOverlayAndModal);
closeEditBtn.addEventListener('click', toggleOverlayAndModal);
closeNewBtn.addEventListener('click', toggleOverlayAndModal);  
formElement.addEventListener('submit', formSubmitHandler);
