const ingredientsUrl = 'https://norma.nomoreparties.space/api/ingredients'

class API {
    constructor(url) {
        this._url = url;
    }

    getIngredients() {
        return fetch(`${this._url}`)
            .then(response => response.json())
    }
}

const api = new API(ingredientsUrl);

export default api;
