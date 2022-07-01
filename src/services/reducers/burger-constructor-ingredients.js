import {CLOSE_ORDER_MODAL, SET_ORDER_DETAILS, TOTAL_PRICE} from "../actions/burger-constructor-ingredients";

const initialState = {
    totalPrice: 0,
    orderDetails: {},
    orderModalShown: false
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
        case SET_ORDER_DETAILS: {
            return {
                ...state,
                orderDetails: action.details,
                orderModalShown: true
            }
        }
        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                orderModalShown: false
            }
        }
        default: {
            return state;
        }
    }
}
