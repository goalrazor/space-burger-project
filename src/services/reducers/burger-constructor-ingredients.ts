import {
    CLOSE_ORDER_MODAL,
    SET_CONSTRUCTOR_BUTTON_ENABLED,
    SET_ORDER_DETAILS,
    SET_ORDER_REQUEST,
    SET_ORDER_REQUEST_FAILED,
    TBurgerConstructorIngredientsActions,
} from "../actions/burger-constructor-ingredients";

type TOrderConstructorState = {
    orderDetails: { order: { number: number } },
    isOrderButtonEnabled: boolean,
    orderRequest: boolean,
    orderRequestFailed: boolean
}

const initialState: TOrderConstructorState = {
    orderDetails: {order: {number: 0}},
    isOrderButtonEnabled: false,
    orderRequest: false,
    orderRequestFailed: false
};

export const orderDetailsReducer = (state = initialState, action: TBurgerConstructorIngredientsActions): TOrderConstructorState => {
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
                orderDetails: {order: {number: 0}}
            }
        }

        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                isOrderButtonEnabled: false,
                orderDetails: {order: {number: 0}}
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
