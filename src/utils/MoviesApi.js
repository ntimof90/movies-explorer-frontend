export const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const findMovie = () => {
  return fetch(BASE_URL, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then(response => {
    if (response.ok) return response.json();
    return Promise.reject(response.status);
  })
}