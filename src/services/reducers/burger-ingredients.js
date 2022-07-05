import {
    ADD_INGREDIENT,
    CLOSE_INGREDIENT_MODAL,
    DELETE_INGREDIENT,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SET_CURRENT_INGREDIENT,
    SET_CURRENT_TAB
} from "../actions/burger-ingredients";
import {BUN} from "../../components/inredients/Ingredients";

const initialState = {
    ingredients: [],
    constructorIngredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    ingredientModalShow: false,
    currentIngredient: {},

    currentTab: BUN
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

        case ADD_INGREDIENT: {
            const isBunInArray = state.constructorIngredients.filter(item => item.type === 'bun').length !== 0
            if (action.payload.type === 'bun' && isBunInArray) {
                return {
                    ...state,
                    constructorIngredients: state.constructorIngredients.map((item) => {
                        return item.type === 'bun' ? action.payload : item
                    })
                }
            } else {
                return {
                    ...state,
                    constructorIngredients: [...state.constructorIngredients, action.payload]
                }
            }
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                constructorIngredients: [...state.constructorIngredients.slice(0, action.index), ...state.constructorIngredients.slice(action.index + 1)]
            }
        }


        case CLOSE_INGREDIENT_MODAL: {
            return {
                ...state,
                ingredientModalShow: false,
                currentIngredient: {}
            }
        }

        case SET_CURRENT_TAB: {
            return {
                ...state,
                currentTab: action.currentTab
            }
        }
        default: {
            return state;
        }
    }
}
