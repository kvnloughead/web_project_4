export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards() {
    return fetch(this.baseUrl + "/cards", {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      });
  }

  loadUserInfo() {
    return fetch(this.baseUrl + "/users/me", {
      headers: this.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      });
  }

  changeAvatar(link) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
  }

  changeUserInfo({ name, job }) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    });
  }

  addNewCard({ title, imageUrl }) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: title,
        link: imageUrl
      })
    });
  }

  deleteCard(cardId) {
    return fetch(`https://around.nomoreparties.co/v1/group-2/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers
    });
  }
  

  // addLike(cardId) {
  //   return fetch(`https://around.nomoreparties.co/v1/group-2/cards/likes/${cardId}`, {
  //     method: "PUT",
  //     headers: this.headers
  //   });
  // }

  // removeLike(cardId) {
  //   return fetch(`https://around.nomoreparties.co/v1/group-2/cards/likes/${cardId}`, {
  //     method: "DELETE",
  //     headers: this.headers
  //   });
  // }

  updateLikes(cardId, requestType) {
    return fetch(`https://around.nomoreparties.co/v1/group-2/cards/likes/${cardId}`, {
      method: requestType,
      headers: this.headers
    })
    .then((res) => {
      return res.json();
    })
  }
}
