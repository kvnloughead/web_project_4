let editBtn = document.querySelector('.button_action_edit');
let editPopup = document.querySelector('.popup');
let closeBtn = editPopup.querySelector('.button_action_close');
let saveBtn = editPopup.querySelector('.button_action_submit');

let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');


let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form');
let [name, job] = popup.querySelectorAll('.popup__input');

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
