class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return this._handleServerResponse(res);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      return this._handleServerResponse(res);
    });
  }

  addCards({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      return this._handleServerResponse(res);
    });
  }

  // likeCard(cardId) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     method: "POST",
  //     headers: this._headers,
  //   }).then((res) => {
  //     return this._handleServerResponse(res);
  //   });
  // }
  // unlikeCard(cardId) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     method: "DELETE",
  //     headers: this._headers,
  //   }).then(this._handleServerResponse);
  // }

  changeLikeStatus(cardId, isLiked) {
   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._handleServerResponse);

  }
  // changelikeCard(cardId, method) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     method: method,
  //     headers: this._headers,
  //   }).then(this._handleServerResponse);
  // }

  // getAvatarInfo() {
  //   return fetch(`${this._baseUrl}/users/me/avatar`, {
  //     headers: this._headers,
  //   }).then((res) => {
  //     return this._handleServerResponse(res);
  //   });
  // }

  editUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._handleServerResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "delete",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }
}

export default Api;
