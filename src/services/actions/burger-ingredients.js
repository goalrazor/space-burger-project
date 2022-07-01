import api from "../../api/Api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SET_CURRENT_INGREDIENT = 'CURRENT_INGREDIENT';
export const CLOSE_INGREDIENT_MODAL = 'CLOSE_INGREDIENT_MODAL';

export const SET_CURRENT_TAB = 'SET_CURRENT_TAB';

export function getIngredients() {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        api.getIngredients()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: res.data
                    });
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    });
                }
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
