import api from "../../api/Api";
import {DELETE_ALL_INGREDIENTS, RESET_TOTAL_PRICE} from "./burger-ingredients";

export const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';
export const SET_CONSTRUCTOR_BUTTON_ENABLED = 'SET_CONSTRUCTOR_BUTTON_ENABLED';
export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';
export const SET_ORDER_REQUEST_FAILED = 'SET_ORDER_REQUEST_FAILED';

function setOrderRequestFailed() {
    return {
        type: SET_ORDER_REQUEST_FAILED
    }
}

function resetConstructor() {
    return function (dispatch) {
        dispatch({
            type: DELETE_ALL_INGREDIENTS
        })
        dispatch({
            type: RESET_TOTAL_PRICE
        })
    }
}

export function setOrder(body, token) {
    return function (dispatch) {
        dispatch({
            type: SET_ORDER_REQUEST
        });
        return api.saveOrder(body, token)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: SET_ORDER_DETAILS,
                        details: res
                    })
                } else {
                    dispatch(setOrderRequestFailed());
                }
                return res
            })
            .then(() => dispatch(resetConstructor()))
            .catch(err => {
                console.error(err);
                dispatch(setOrderRequestFailed())
                throw err;
            });
    };
}

