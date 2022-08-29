import api from "../../api/Api";
import {DELETE_ALL_INGREDIENTS, RESET_TOTAL_PRICE} from "./burger-ingredients";
import {AppDispatch, AppThunk} from "../types/redux";

export const SET_ORDER_REQUEST: 'SET_ORDER_REQUEST' = 'SET_ORDER_REQUEST';
export const SET_ORDER_REQUEST_FAILED: 'SET_ORDER_REQUEST_FAILED' = 'SET_ORDER_REQUEST_FAILED';
export const SET_ORDER_DETAILS: 'SET_ORDER_DETAILS' = 'SET_ORDER_DETAILS';
export const CLOSE_ORDER_MODAL: 'CLOSE_ORDER_MODAL' = 'CLOSE_ORDER_MODAL';
export const SET_CONSTRUCTOR_BUTTON_ENABLED: 'SET_CONSTRUCTOR_BUTTON_ENABLED' = 'SET_CONSTRUCTOR_BUTTON_ENABLED';

export interface ISetOrderRequest {
    readonly type: typeof SET_ORDER_REQUEST
}

export interface ISetOrderRequestFailed {
    readonly type: typeof SET_ORDER_REQUEST_FAILED
}

export interface ISetOrderDetails {
    readonly type: typeof SET_ORDER_DETAILS,
    readonly details: { order: { number: number } }
}

export interface ICloseOrderModal {
    readonly type: typeof CLOSE_ORDER_MODAL
}

export interface ISetConstructorButtonEnabled {
    readonly type: typeof SET_CONSTRUCTOR_BUTTON_ENABLED
}

export type TBurgerConstructorIngredientsActions =
    ISetOrderRequest
    | ISetOrderRequestFailed
    | ISetOrderDetails
    | ICloseOrderModal
    | ISetConstructorButtonEnabled

const resetConstructor: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({
        type: DELETE_ALL_INGREDIENTS
    })
    dispatch({
        type: RESET_TOTAL_PRICE
    })
}

export const setOrder: AppThunk = (body, token) => (dispatch: AppDispatch) => {
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
}

function setOrderRequestFailed() {
    return {
        type: SET_ORDER_REQUEST_FAILED
    }
}

