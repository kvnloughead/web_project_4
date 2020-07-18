export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch("https://around.nomoreparties.co/v1/group-2/cards", {
      headers: {
        authorization: "dc340326-95ec-4474-9060-e6102316f742"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      });
  }

  loadUserInfo() {
    return fetch("https://around.nomoreparties.co/v1/group-2/users/me", {
      headers: {
        authorization: "dc340326-95ec-4474-9060-e6102316f742"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      });
  }

  // other methods for working with the API
}
