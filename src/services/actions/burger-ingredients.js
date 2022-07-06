import api from "../../api/Api";

export const TOTAL_PRICE = 'TOTAL_PRICE';
export const RESET_TOTAL_PRICE = 'RESET_TOTAL_PRICE';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const ADD_INGREDIENT = 'ADD_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT'
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const INCREASE_INGREDIENT_COUNT = 'INCREASE_INGREDIENT_COUNT'
export const DECREASE_INGREDIENT_COUNT = 'DECREASE_INGREDIENT_COUNT'
export const SET_CURRENT_INGREDIENT = 'CURRENT_INGREDIENT';
export const CLOSE_INGREDIENT_MODAL = 'CLOSE_INGREDIENT_MODAL';
export const DELETE_ALL_INGREDIENTS = 'DELETE_ALL_INGREDIENTS';


export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

function setIngredientsRequestFailed() {
    return {
        type: GET_INGREDIENTS_FAILED
    }
}

export function getIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        api.getIngredients()
            .then(res => {
                if (res && res.success) {
                    const data = res.data.map((item) => {
                        item['ingredientCount'] = 0
                        return item;
                    })
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: data
                    });
                } else {
                    dispatch(setIngredientsRequestFailed());
                }
            }).catch(err => {
            console.error(err);
            dispatch(setIngredientsRequestFailed())
        });
    };
}

export function setCurrentTab(currentTab) {
    return function (dispatch) {
        dispatch({
            type: SET_CURRENT_TAB,
            currentTab: currentTab
        })
    }
}
