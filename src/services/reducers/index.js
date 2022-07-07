import {combineReducers} from 'redux';
import {orderDetailsReducer} from "./burger-constructor-ingredients"
import {ingredientReducer} from "./burger-ingredients"

export const rootReducer = combineReducers({
    ingredientReducer,
    orderDetailsReducer
})
