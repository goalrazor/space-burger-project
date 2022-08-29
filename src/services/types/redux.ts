import {store} from "../../index";
import {TAuthActions} from "../actions/auth/authActions";
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";

export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions = TAuthActions;

export type AppThunk<TReturn = Promise<any>> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

export type AppDispatch = typeof store.dispatch;
