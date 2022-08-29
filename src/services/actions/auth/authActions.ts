export const REGISTER_REQUEST_IN_PROGRESS: 'REGISTER_REQUEST_IN_PROGRESS' = "REGISTER_REQUEST_IN_PROGRESS"
export const REGISTER_REQUEST_FAILED: 'REGISTER_REQUEST_FAILED' = "REGISTER_REQUEST_FAILED"
export const REGISTER_REQUEST_SUCCESS: 'REGISTER_REQUEST_SUCCESS' = "REGISTER_REQUEST_SUCCESS"

export const LOGIN_REQUEST_IN_PROGRESS: 'LOGIN_REQUEST_IN_PROGRESS' = "LOGIN_REQUEST_IN_PROGRESS"
export const LOGIN_REQUEST_FAILED: 'LOGIN_REQUEST_FAILED' = "LOGIN_REQUEST_FAILED"
export const LOGIN_REQUEST_SUCCESS: 'LOGIN_REQUEST_SUCCESS' = "LOGIN_REQUEST_SUCCESS"

export const LOGOUT_REQUEST_IN_PROGRESS: 'LOGOUT_REQUEST_IN_PROGRESS' = "LOGOUT_REQUEST_IN_PROGRESS"
export const LOGOUT_REQUEST_FAILED: 'LOGOUT_REQUEST_FAILED' = "LOGOUT_REQUEST_FAILED"
export const LOGOUT_REQUEST_SUCCESS: 'LOGOUT_REQUEST_SUCCESS' = "LOGOUT_REQUEST_SUCCESS"

export const REFRESH_TOKEN_REQUEST_IN_PROGRESS: 'REFRESH_TOKEN_REQUEST_IN_PROGRESS' = "REFRESH_TOKEN_REQUEST_IN_PROGRESS"
export const REFRESH_TOKEN_REQUEST_FAILED: 'REFRESH_TOKEN_REQUEST_FAILED' = "REFRESH_TOKEN_REQUEST_FAILED"
export const REFRESH_TOKEN_REQUEST_SUCCESS: 'REFRESH_TOKEN_REQUEST_SUCCESS' = "REFRESH_TOKEN_REQUEST_SUCCESS"

export const GET_PROFILE_INFO_IN_PROGRESS: 'GET_PROFILE_INFO_IN_PROGRESS' = "GET_PROFILE_INFO_IN_PROGRESS"
export const GET_PROFILE_INFO_FAILED: 'GET_PROFILE_INFO_FAILED' = "GET_PROFILE_INFO_FAILED"
export const GET_PROFILE_INFO_SUCCESS: 'GET_PROFILE_INFO_SUCCESS' = "GET_PROFILE_INFO_SUCCESS"

export const SET_PROFILE_INFO_IN_PROGRESS: 'SET_PROFILE_INFO_IN_PROGRESS' = "SET_PROFILE_INFO_IN_PROGRESS"
export const SET_PROFILE_INFO_FAILED: 'SET_PROFILE_INFO_FAILED' = "SET_PROFILE_INFO_FAILED"
export const SET_PROFILE_INFO_SUCCESS: 'SET_PROFILE_INFO_SUCCESS' = "SET_PROFILE_INFO_SUCCESS"

export const RESET_PASSWORD_IN_PROGRESS: 'RESET_PASSWORD_IN_PROGRESS' = "RESET_PASSWORD_IN_PROGRESS"
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = "RESET_PASSWORD_FAILED"
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = "RESET_PASSWORD_SUCCESS"

export const SET_NEW_PASSWORD_IN_PROGRESS: 'SET_NEW_PASSWORD_IN_PROGRESS' = "SET_NEW_PASSWORD_IN_PROGRESS"
export const SET_NEW_PASSWORD_FAILED: 'SET_NEW_PASSWORD_FAILED' = "SET_NEW_PASSWORD_FAILED"
export const SET_NEW_PASSWORD_SUCCESS: 'SET_NEW_PASSWORD_SUCCESS' = "SET_NEW_PASSWORD_SUCCESS"

export interface IRegisterRequestInProgressAction {
    readonly type: typeof REGISTER_REQUEST_IN_PROGRESS,
}

export interface IRegisterRequestFailedAction {
    readonly type: typeof REGISTER_REQUEST_FAILED,
}

export interface IRegisterRequestSuccessAction {
    readonly type: typeof REGISTER_REQUEST_SUCCESS,
}

export interface ILoginRequestInProgressAction {
    readonly type: typeof LOGIN_REQUEST_IN_PROGRESS,
}

export interface ILoginRequestFailedAction {
    readonly type: typeof LOGIN_REQUEST_IN_PROGRESS,
}

export interface ILoginRequestSuccessAction {
    readonly type: typeof LOGIN_REQUEST_SUCCESS,
}

export interface ILogoutRequestInProgressAction {
    readonly type: typeof LOGOUT_REQUEST_IN_PROGRESS,
}

export interface ILogoutRequestFailedAction {
    readonly type: typeof LOGOUT_REQUEST_FAILED,
}

export interface ILogoutRequestSuccessAction {
    readonly type: typeof LOGOUT_REQUEST_SUCCESS,
}

export interface IRefreshTokenRequestInProgressAction {
    readonly type: typeof REFRESH_TOKEN_REQUEST_IN_PROGRESS,
}

export interface IRefreshTokenRequestFailedAction {
    readonly type: typeof REFRESH_TOKEN_REQUEST_FAILED,
}

export interface IRefreshTokenRequestSuccessAction {
    readonly type: typeof REFRESH_TOKEN_REQUEST_SUCCESS,
}

export interface IGetProfileInfoRequestInProgressAction {
    readonly type: typeof GET_PROFILE_INFO_IN_PROGRESS,
}

export interface IGetProfileInfoRequestFailedAction {
    readonly type: typeof GET_PROFILE_INFO_FAILED,
}

export interface IGetProfileInfoRequestSuccessAction {
    readonly type: typeof GET_PROFILE_INFO_SUCCESS,
}

export interface ISetProfileInfoRequestInProgressAction {
    readonly type: typeof SET_PROFILE_INFO_IN_PROGRESS,
}

export interface ISetProfileInfoRequestFailedAction {
    readonly type: typeof SET_PROFILE_INFO_FAILED,
}

export interface ISetProfileInfoRequestSuccessAction {
    readonly type: typeof SET_PROFILE_INFO_SUCCESS,
}

export interface IResetPasswordRequestInProgressAction {
    readonly type: typeof RESET_PASSWORD_IN_PROGRESS,
}

export interface IResetPasswordRequestFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED,
}

export interface IResetPasswordRequestSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS,
}

export interface ISetNewPasswordRequestInProgressAction {
    readonly type: typeof SET_NEW_PASSWORD_IN_PROGRESS,
}

export interface ISetNewPasswordRequestFailedAction {
    readonly type: typeof SET_NEW_PASSWORD_FAILED,
}

export interface ISetNewPasswordRequestSuccessAction {
    readonly type: typeof SET_NEW_PASSWORD_SUCCESS,
}

export type TAuthActions =
    IRegisterRequestInProgressAction
    | IRegisterRequestFailedAction
    | IRegisterRequestSuccessAction
    | ILoginRequestInProgressAction
    | ILoginRequestFailedAction
    | ILoginRequestSuccessAction
    | ILogoutRequestInProgressAction
    | ILogoutRequestFailedAction
    | ILogoutRequestSuccessAction
    | IRefreshTokenRequestInProgressAction
    | IRefreshTokenRequestFailedAction
    | IRefreshTokenRequestSuccessAction
    | IGetProfileInfoRequestInProgressAction
    | IGetProfileInfoRequestFailedAction
    | IGetProfileInfoRequestSuccessAction
    | ISetProfileInfoRequestInProgressAction
    | ISetProfileInfoRequestFailedAction
    | ISetProfileInfoRequestSuccessAction
    | IResetPasswordRequestInProgressAction
    | IResetPasswordRequestFailedAction
    | IResetPasswordRequestSuccessAction
    | ISetNewPasswordRequestInProgressAction
    | ISetNewPasswordRequestFailedAction
    | ISetNewPasswordRequestSuccessAction;
