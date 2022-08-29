import api from "../../api/Api";
import {AppDispatch, AppThunk} from "../types/redux";
import {TCard} from "../types";

export const TOTAL_PRICE: 'TOTAL_PRICE' = 'TOTAL_PRICE';
export const RESET_TOTAL_PRICE: 'RESET_TOTAL_PRICE' = 'RESET_TOTAL_PRICE';
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT'
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT'
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';
export const INCREASE_INGREDIENT_COUNT: 'INCREASE_INGREDIENT_COUNT' = 'INCREASE_INGREDIENT_COUNT'
export const DECREASE_INGREDIENT_COUNT: 'DECREASE_INGREDIENT_COUNT' = 'DECREASE_INGREDIENT_COUNT'
export const RESET_INGREDIENT_COUNT: 'RESET_INGREDIENT_COUNT' = 'RESET_INGREDIENT_COUNT';
export const SET_CURRENT_INGREDIENT: 'SET_CURRENT_INGREDIENT' = 'SET_CURRENT_INGREDIENT';
export const SET_INGREDIENT_MODAL_SHOW: 'SET_INGREDIENT_MODAL_SHOW' = 'SET_INGREDIENT_MODAL_SHOW';
export const SET_INGREDIENT_MODAL_CLOSED: 'SET_INGREDIENT_MODAL_CLOSED' = 'SET_INGREDIENT_MODAL_CLOSED';
export const DELETE_ALL_INGREDIENTS: 'DELETE_ALL_INGREDIENTS' = 'DELETE_ALL_INGREDIENTS';
export const SET_CURRENT_TAB: 'SET_CURRENT_TAB' = 'SET_CURRENT_TAB';

export interface ITotalPriceAction {
    readonly type: typeof TOTAL_PRICE
}

export interface IResetTotalPriceAction {
    readonly type: typeof RESET_TOTAL_PRICE
}

export interface IGetIngredientsRequestInProgressAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsRequestSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS
}

export interface IGetIngredientsRequestFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED
}

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT
}

export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT
}

export interface IIncreaseIngredientCountAction {
    readonly type: typeof INCREASE_INGREDIENT_COUNT
}

export interface IDecreaseIngredientCountAction {
    readonly type: typeof DECREASE_INGREDIENT_COUNT
}

export interface IResetIngredientCountAction {
    readonly type: typeof RESET_INGREDIENT_COUNT
}

export interface ISetCurrentIngredientAction {
    readonly type: typeof SET_CURRENT_INGREDIENT
}

export interface ISetIngredientModalShowAction {
    readonly type: typeof SET_INGREDIENT_MODAL_SHOW
}

export interface ISetIngredientModalClosedAction {
    readonly type: typeof SET_INGREDIENT_MODAL_CLOSED
}

export interface IDeleteAllIngredientsAction {
    readonly type: typeof DELETE_ALL_INGREDIENTS
}

export interface ISetCurrentTabAction {
    readonly type: typeof SET_CURRENT_TAB
}

export type TBurgerIngredientActions =
    ITotalPriceAction
    | IResetTotalPriceAction
    | IGetIngredientsRequestInProgressAction
    | IGetIngredientsRequestSuccessAction
    | IGetIngredientsRequestFailedAction
    | IAddIngredientAction
    | IDeleteIngredientAction
    | IMoveIngredientAction
    | IIncreaseIngredientCountAction
    | IDecreaseIngredientCountAction
    | IResetIngredientCountAction
    | ISetCurrentIngredientAction
    | ISetIngredientModalShowAction
    | ISetIngredientModalClosedAction
    | IDeleteAllIngredientsAction
    | ISetCurrentTabAction

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    });
    return api.getIngredients()
        .then(res => {
            if (res && res.success) {
                const data = res.data.map((item: TCard) => {
                    item['ingredientCount'] = 0
                    return item;
                })
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: data
                });
            } else {
                dispatch(setIngredientsRequestFailed());
            }
            return res.data
        }).catch(err => {
            console.error(err);
            dispatch(setIngredientsRequestFailed())
        });
}

export const setCurrentTab: AppThunk = (currentTab) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_CURRENT_TAB,
        currentTab: currentTab
    })
}

function setIngredientsRequestFailed() {
    return {
        type: GET_INGREDIENTS_FAILED
    }
}
