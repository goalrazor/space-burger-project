import {
    CLOSE_INGREDIENT_MODAL,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SET_CURRENT_INGREDIENT
} from "../actions/burger-ingredients";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    ingredientModalShow: false,
    currentIngredient: {}
};

export const ingredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false};
        }
        case GET_INGREDIENTS_FAILED: {
            return {...state, ingredientsFailed: true, ingredientsRequest: false};
        }

        case SET_CURRENT_INGREDIENT: {
            return {
                ...state,
                ingredientModalShow: true,
                currentIngredient: action.item
            }
        }
        case CLOSE_INGREDIENT_MODAL: {
            return {
                ...state,
                ingredientModalShow: false
            }
        }
        default: {
            return state;
        }
    }
}
