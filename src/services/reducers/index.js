import {combineReducers} from 'redux';
import {orderDetailsReducer} from "./burger-constructor-ingredients"
import {ingredientReducer} from "./burger-ingredients"
import {authReducer} from "./auth";
import {wsReducer} from "./webSocket";

export const rootReducer = combineReducers({
    ingredientReducer,
    orderDetailsReducer,
    authReducer,
    wsReducer
})
