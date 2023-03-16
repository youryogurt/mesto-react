export class Api {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  async handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async _fetch(slug, method, body) {
    const res = await fetch(`${this.baseUrl}/${slug}`, {
      method: method,
      headers: this.headers,
      body: JSON.stringify(body)
    });
    return this.handleResponse(res);
  }

  async getInitialCards() {
    return await this._fetch('cards', 'GET');
  }

  async getUserInfo() {
    return await this._fetch('users/me', 'GET');
  }

  async setUserInfo(data) {
    return await this._fetch('users/me', 'PATCH', data);
  }

  async addCard(data) {
    return await this._fetch('cards', 'POST', data);
  }

  async changeAvatar(avatarUrl) {
    const avatar = {avatar: avatarUrl};
    return await this._fetch('users/me/avatar', 'PATCH', avatar);
  }

  async deleteCard(cardId) {
    return await this._fetch(`cards/${cardId}`, 'DELETE');
  }

  async likeCard(cardId) {
    return await this._fetch(`cards/likes/${cardId}`, 'PUT');
  }

  async dislikeCard(cardId) {
    return await this._fetch(`cards/likes/${cardId}`, 'DELETE');
  }
}

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: 'aa16a549-ea43-4766-9300-1c2b0845ff0c',
    'Content-Type': 'application/json'
  }
};

const api = new Api(config);

export default api;