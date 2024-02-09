class MainApi {
  constructor(url) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  }

  register({ email, password, name }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password, name })
    })
    .then(this._checkResponse);
  }

  login({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    .then(this._checkResponse);
  }

  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
    })
    .then(this._checkResponse);
  }

  getUser(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
    })
    .then(this._checkResponse);
  }

  editUser({ email, name }, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
      body: JSON.stringify({ email, name })
    })
    .then(this._checkResponse);
  }
}

const mainApi = new MainApi('https://api.msearch.students.nomoredomainsmonster.ru');
export default mainApi;