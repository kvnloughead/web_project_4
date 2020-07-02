export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._profileNameEl = document.querySelector(nameSelector);
    this._profileJobEl = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return { name: this._profileNameEl.textContent, 
             job: this._profileJobEl.textContent 
            };
  }

  setUserInfo(inputValues) {
    this._profileNameEl.textContent = inputValues.name;
    this._profileJobEl.textContent = inputValues.job;
  }
}