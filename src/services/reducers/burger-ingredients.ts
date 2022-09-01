import {
    ADD_INGREDIENT,
    DECREASE_INGREDIENT_COUNT,
    DELETE_ALL_INGREDIENTS,
    DELETE_INGREDIENT,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    INCREASE_INGREDIENT_COUNT,
    MOVE_INGREDIENT,
    RESET_INGREDIENT_COUNT,
    RESET_TOTAL_PRICE,
    SET_CURRENT_INGREDIENT,
    SET_CURRENT_TAB,
    SET_INGREDIENT_MODAL_CLOSED,
    SET_INGREDIENT_MODAL_SHOW,
    TBurgerIngredientActions,
    TOTAL_PRICE
} from "../actions/burger-ingredients";
import {BUN} from "../../components/ingredients/Ingredients";
import {TCard} from "../types";

type TBurgerConstructorState = {
    ingredients: ReadonlyArray<TCard>,
    constructorIngredients: ReadonlyArray<TCard>,
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,

    ingredientModalShow: boolean,
    currentIngredient: TCard | {},

    currentTab: string,
    totalPrice: number
};

export const ingredientInitialState = {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    ingredientCount: 0,
    uuid: ''
}


const initialState: TBurgerConstructorState = {
    ingredients: [ingredientInitialState],
    constructorIngredients: [] as ReadonlyArray<TCard>,
    ingredientsRequest: false,
    ingredientsFailed: false,

    ingredientModalShow: false,
    currentIngredient: {},

    currentTab: BUN,
    totalPrice: 0,
};

export const ingredientReducer = (state = initialState, action: TBurgerIngredientActions): TBurgerConstructorState => {
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
            return {...state, ingredientsFailed: true, ingredientsRequest: false, ingredients: []};
        }

        case SET_CURRENT_INGREDIENT: {
            return {
                ...state,
                ingredientModalShow: true,
                currentIngredient: action.item
            }
        }

        case SET_INGREDIENT_MODAL_SHOW: {
            return {
                ...state,
                ingredientModalShow: true,
            }
        }
        case SET_INGREDIENT_MODAL_CLOSED: {
            return {
                ...state,
                ingredientModalShow: false,
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
        case DELETE_ALL_INGREDIENTS: {
            return {
                ...state,
                constructorIngredients: []
            }
        }
        case MOVE_INGREDIENT: {
            const copiedStateArr = state.constructorIngredients.filter(item => item.type !== 'bun');
            const dragCard = copiedStateArr[action.dragIndex];
            const prevItem = copiedStateArr.splice(action.hoverIndex, 1, dragCard)
            copiedStateArr.splice(action.dragIndex, 1, prevItem[0]);
            const bunsStateArr = state.constructorIngredients.filter(item => item.type === 'bun');
            return {
                ...state,
                constructorIngredients: [...bunsStateArr, ...copiedStateArr]

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

        case SET_CURRENT_TAB: {
            return {
                ...state,
                currentTab: action.currentTab
            }
        }

        case TOTAL_PRICE: {
            const totalPrice = [...state.constructorIngredients].map(item => item.price)
                .reduce(function (prev, curr) {
                    return prev + curr
                });
            const secondBunPrice = [...state.constructorIngredients].filter(item => item.type === 'bun')[0]?.price
                ? [...state.constructorIngredients].filter(item => item.type === 'bun')[0].price : 0
            return {
                ...state,
                totalPrice: totalPrice + secondBunPrice
            };
        }
        case RESET_TOTAL_PRICE: {
            return {
                ...state,
                totalPrice: 0
            }
        }

        case RESET_INGREDIENT_COUNT: {
            return {
                ...state,
                ingredients: state.ingredients.map(item => {
                    item.ingredientCount = 0
                    return item
                })
            }
        }
        default: {
            return state;
        }
    }
}
