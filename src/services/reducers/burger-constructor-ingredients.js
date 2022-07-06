import {
    CLOSE_ORDER_MODAL,
    SET_ORDER_DETAILS,
    SET_ORDER_REQUEST,
    SET_ORDER_REQUEST_FAILED,
} from "../actions/burger-constructor-ingredients";

const initialState = {
    orderDetails: {},
    orderModalShown: false,
    orderRequest: false,
    orderRequestFailed: false
};

export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        case SET_ORDER_DETAILS: {
            return {
                ...state,
                orderDetails: action.details,
                orderModalShown: true,
                orderRequestFailed: false,
                orderRequest: false
            }
        }
        case SET_ORDER_REQUEST_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderRequestFailed: true,
                orderDetails: {}
            }
        }

        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                orderModalShown: false,
                orderDetails: {}
            }
        }
        default: {
            return state;
        }
    }
}
