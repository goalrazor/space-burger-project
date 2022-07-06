import {
    ADD_INGREDIENT,
    CLOSE_INGREDIENT_MODAL,
    DECREASE_INGREDIENT_COUNT,
    DELETE_INGREDIENT,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_INGREDIENT_COUNT,
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

    currentTab: BUN,
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
                constructorIngredients: [...state.constructorIngredients].filter(item => item.uuid !== action.uuid)
            }
        }

        case INCREASE_INGREDIENT_COUNT: {
            const bunsInConstructor = state.constructorIngredients.filter(item => item.type === 'bun')
            let emptyCountBuns;
            if (action.ingredient.type === 'bun' &&
                bunsInConstructor.filter(item => item._id !== action.ingredient._id).length === 0) {
                emptyCountBuns = {
                    ...state,
                    ingredients: [...state.ingredients].map(item => {
                        return item.type === 'bun' ? {
                            ...item,
                            ingredientCount: 0
                        } : item
                    })
                }
                return {
                    ...state,
                    ingredients: emptyCountBuns.ingredients.map(item =>
                        item._id === action.ingredient._id ? {
                            ...item,
                            ingredientCount: 2
                        } : item)
                }
            } else {
                return {
                    ...state,
                    ingredients: [...state.ingredients].map(item => item._id === action.ingredient._id ? {
                            ...item,
                            ingredientCount: ++item.ingredientCount
                        } : item
                    )
                }
            }
        }

        case DECREASE_INGREDIENT_COUNT: {
            return {
                ...state,
                ingredients: [...state.ingredients].map(item => item._id === action._id ? {
                        ...item,
                        ingredientCount: --item.ingredientCount
                    } : item
                )
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
