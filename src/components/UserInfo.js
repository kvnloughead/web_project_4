export default class UserInfo {
  constructor({ nameSelector, jobSelector, imageSelector }) {
    this._profileNameEl = document.querySelector(nameSelector);
    this._profileJobEl = document.querySelector(jobSelector);
    this._profileImageEl = document.querySelector(imageSelector);
  }

  getUserInfo() {
    return {
      name: this._profileNameEl.textContent,
      job: this._profileJobEl.textContent,
      imageLink: this._profileImageEl.src
    };
  }

  setUserInfo(inputValues) {
    this._profileNameEl.textContent = inputValues.name;
    this._profileJobEl.textContent = inputValues.about;
    this._profileImageEl.src = inputValues.avatar;
  }
}
