const editBtn = document.querySelector('.button_action_edit');
const editPopup = document.querySelector('.popup');
const closeBtn = editPopup.querySelector('.button_action_close');
const saveBtn = editPopup.querySelector('.button_action_submit');

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__form');
const [name, job] = popup.querySelectorAll('.popup__input');

function toggleOverlayAndEditModal() {
  name.value = profileName.textContent;
  job.value = profileJob.textContent;
  editPopup.classList.toggle('popup_visible');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = name.value;
  profileJob.textContent = job.value;
  toggleOverlayAndEditModal();
}

editBtn.addEventListener('click', toggleOverlayAndEditModal);
closeBtn.addEventListener('click', toggleOverlayAndEditModal);
formElement.addEventListener('submit', formSubmitHandler);
