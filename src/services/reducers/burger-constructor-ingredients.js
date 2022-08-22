import {
    CLOSE_ORDER_MODAL,
    SET_CONSTRUCTOR_BUTTON_ENABLED,
    SET_ORDER_DETAILS,
    SET_ORDER_REQUEST,
    SET_ORDER_REQUEST_FAILED,
} from "../actions/burger-constructor-ingredients";

const initialState = {
    orderDetails: {},
    isOrderButtonEnabled: false,
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
                isOrderButtonEnabled: false,
                orderDetails: {}
            }
        }

        case SET_CONSTRUCTOR_BUTTON_ENABLED: {
            return {
                ...state,
                isOrderButtonEnabled: true,
            }
        }
        default: {
            return state;
        }
    }
}
