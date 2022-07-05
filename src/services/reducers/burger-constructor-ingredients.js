import {
    CLOSE_ORDER_MODAL,
    SET_ORDER_DETAILS,
    SET_ORDER_REQUEST,
    SET_ORDER_REQUEST_FAILED,
    TOTAL_PRICE
} from "../actions/burger-constructor-ingredients";

const initialState = {
    totalPrice: 0,
    orderDetails: {},
    orderModalShown: false,
    orderRequest: false,
    orderRequestFailed: false
};

export const priceReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOTAL_PRICE: {
            return {
                ...state,
                totalPrice: action.price + state.totalPrice
            };
        }
        default: {
            return state;
        }
    }
}

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
                orderRequestFailed: true
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
