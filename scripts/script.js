let editBtn = document.querySelector('.button_action_add');
let editPopup = document.querySelector('.popup');
let closeBtn = editPopup.querySelector('.button_action_close');
let saveBtn = editPopup.querySelector('.button_action_submit');

function toggleOverlayAndEditModal() {
  editPopup.classList.toggle('popup_visible');
}

editBtn.addEventListener('click', toggleOverlayAndEditModal);
closeBtn.addEventListener('click', toggleOverlayAndEditModal);
