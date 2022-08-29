import {store} from "../../index";
import {TAuthActions} from "../actions/auth/authActions";
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";
import {TBurgerConstructorIngredientsActions} from "../actions/burger-constructor-ingredients";
import {TBurgerIngredientActions} from "../actions/burger-ingredients";

export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions = TAuthActions | TBurgerConstructorIngredientsActions | TBurgerIngredientActions;

export type AppThunk<TReturn = Promise<any> | void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

export type AppDispatch = typeof store.dispatch;
