const ingredientsUrl = 'https://norma.nomoreparties.space/api/ingredients'

class API {
    constructor(url) {
        this._url = url;
    }

    getIngredients() {
        return fetch(`${this._url}`)
            .then(this._checkResponse)
            .then(response => response.json())
    };

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

const api = new API(ingredientsUrl);

export default api;
