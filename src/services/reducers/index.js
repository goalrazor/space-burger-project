import {combineReducers} from 'redux';
import {orderDetailsReducer, priceReducer} from "./burger-constructor-ingredients"
import {ingredientReducer} from "./burger-ingredients"

export const rootReducer = combineReducers({
    ingredientReducer,
    priceReducer,
    orderDetailsReducer
})
