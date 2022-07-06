import api from "../../api/Api";
import {DELETE_ALL_INGREDIENTS, RESET_TOTAL_PRICE} from "./burger-ingredients";

export const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';
export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';
export const SET_ORDER_REQUEST_FAILED = 'SET_ORDER_REQUEST_FAILED';

function setOrderRequestFailed() {
    return {
        type: SET_ORDER_REQUEST_FAILED
    }
}

function makeOrder(res) {
    return function (dispatch) {
        if (res && res.success) {
            dispatch({
                type: SET_ORDER_DETAILS,
                details: res
            })
            dispatch({
                type: DELETE_ALL_INGREDIENTS
            })
            dispatch({
                type: RESET_TOTAL_PRICE
            })
        } else {
            dispatch(setOrderRequestFailed());
        }
    }
}

export function setOrder(body) {
    return function (dispatch) {
        dispatch({
            type: SET_ORDER_REQUEST
        });
        api.saveOrder(body)
            .then(res => {
                dispatch(makeOrder(res))
            }).catch(err => {
            console.log(err);
            dispatch(setOrderRequestFailed())
        });
    };
}

