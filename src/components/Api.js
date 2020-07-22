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

  changeAvatar(link) {
    return fetch("https://around.nomoreparties.co/v1/group-2/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: "dc340326-95ec-4474-9060-e6102316f742",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: link
      })
    })
  }

  changeUserInfo({ name, job }) {
    return fetch("https://around.nomoreparties.co/v1/group-2/users/me", {
      method: "PATCH",
      headers: {
        authorization: "dc340326-95ec-4474-9060-e6102316f742",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: job
      })
    });
  }

  addNewCard({ title, imageUrl }) {
    return fetch("https://around.nomoreparties.co/v1/group-2/cards", {
      method: "POST",
      headers: {
        authorization: "dc340326-95ec-4474-9060-e6102316f742",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: title,
        link: imageUrl
      })
    });
  }

  deleteCard(cardId) {
    return fetch(`https://around.nomoreparties.co/v1/group-2/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "dc340326-95ec-4474-9060-e6102316f742",
        "Content-Type": "application/json"
      }
    });
  }


  addLike( ) {
    
  }

  removeLike() {

  }
}
