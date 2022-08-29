import {
    GET_PROFILE_INFO_FAILED,
    GET_PROFILE_INFO_IN_PROGRESS,
    GET_PROFILE_INFO_SUCCESS,
    LOGIN_REQUEST_FAILED,
    LOGIN_REQUEST_IN_PROGRESS,
    LOGIN_REQUEST_SUCCESS,
    LOGOUT_REQUEST_FAILED,
    LOGOUT_REQUEST_IN_PROGRESS,
    LOGOUT_REQUEST_SUCCESS,
    REFRESH_TOKEN_REQUEST_FAILED,
    REFRESH_TOKEN_REQUEST_IN_PROGRESS,
    REFRESH_TOKEN_REQUEST_SUCCESS,
    REGISTER_REQUEST_FAILED,
    REGISTER_REQUEST_IN_PROGRESS,
    REGISTER_REQUEST_SUCCESS,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_IN_PROGRESS,
    RESET_PASSWORD_SUCCESS,
    SET_NEW_PASSWORD_FAILED,
    SET_NEW_PASSWORD_IN_PROGRESS,
    SET_NEW_PASSWORD_SUCCESS,
    SET_PROFILE_INFO_FAILED,
    SET_PROFILE_INFO_IN_PROGRESS,
    SET_PROFILE_INFO_SUCCESS,
    TAuthActions
} from "../actions/auth/authActions";
import {TUser} from "../types";

type TAuthState = {
    registerRequestInProgress: boolean,
    registerRequestFailed: boolean,
    accessToken: string,
    refreshToken: string,
    user: TUser,

    loginRequestInProgress: boolean,
    loginRequestFailed: boolean,
    logoutRequestInProgress: boolean,
    logoutRequestFailed: boolean,
    isLoggedIn: boolean,

    tokenRefreshRequestInProgress: boolean,
    tokenRefreshRequestFailed: boolean,

    getProfileInfoInProgress: boolean,
    getProfileInfoFailed: boolean,

    setProfileInfoInProgress: boolean,
    setProfileInfoFailed: boolean,

    resetPasswordInProgress: boolean,
    resetPasswordFailed: boolean,
    resetPasswordWasSent: boolean,

    setNewPasswordInProgress: boolean,
    setNewPasswordFailed: boolean,
}

const initialState: TAuthState = {
    registerRequestInProgress: false,
    registerRequestFailed: false,
    accessToken: "",
    refreshToken: "",
    user: {},

    loginRequestInProgress: false,
    loginRequestFailed: false,
    logoutRequestInProgress: false,
    logoutRequestFailed: false,
    isLoggedIn: false,

    tokenRefreshRequestInProgress: false,
    tokenRefreshRequestFailed: false,

    getProfileInfoInProgress: false,
    getProfileInfoFailed: false,

    setProfileInfoInProgress: false,
    setProfileInfoFailed: false,

    resetPasswordInProgress: false,
    resetPasswordFailed: false,
    resetPasswordWasSent: false,

    setNewPasswordInProgress: false,
    setNewPasswordFailed: false,
}

export const authReducer = (state = initialState, action: TAuthActions): TAuthState => {
    switch (action.type) {

        case REGISTER_REQUEST_IN_PROGRESS: {
            return {
                ...state,
                registerRequestInProgress: true
            }
        }
        case REGISTER_REQUEST_SUCCESS: {
            return {
                ...state,
                registerRequestFailed: false,
                user: action.user,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                registerRequestInProgress: false,
                isLoggedIn: true
            };
        }
        case REGISTER_REQUEST_FAILED: {
            return {
                ...state,
                registerRequestFailed: true,
                registerRequestInProgress: false,
                user: {},
                accessToken: "",
                refreshToken: ""
            };
        }

        case LOGIN_REQUEST_IN_PROGRESS: {
            return {
                ...state,
                loginRequestInProgress: true
            }
        }
        case LOGIN_REQUEST_SUCCESS: {
            return {
                ...state,
                loginRequestFailed: false,
                user: action.user,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
                isLoggedIn: true,
                loginRequestInProgress: false
            }
        }
        case LOGIN_REQUEST_FAILED: {
            return {
                ...state,
                loginRequestFailed: true,
                loginRequestInProgress: false,
                user: {},
                accessToken: "",
                refreshToken: ""
            }
        }

        case LOGOUT_REQUEST_IN_PROGRESS: {
            return {
                ...state,
                logoutRequestInProgress: true
            }
        }
        case LOGOUT_REQUEST_SUCCESS: {
            return {
                ...state,
                logoutRequestFailed: false,
                user: {},
                accessToken: "",
                refreshToken: "",
                logoutRequestInProgress: false,
                isLoggedIn: false
            }
        }
        case LOGOUT_REQUEST_FAILED: {
            return {
                ...state,
                logoutRequestFailed: true,
                logoutRequestInProgress: false,
                user: state.user,
                accessToken: state.accessToken,
                refreshToken: state.refreshToken
            }
        }

        case REFRESH_TOKEN_REQUEST_IN_PROGRESS: {
            return {
                ...state,
                tokenRefreshRequestInProgress: true
            }
        }
        case REFRESH_TOKEN_REQUEST_SUCCESS: {
            return {
                ...state,
                tokenRefreshRequestFailed: false,
                tokenRefreshRequestInProgress: false,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        }
        case REFRESH_TOKEN_REQUEST_FAILED: {
            return {
                ...state,
                tokenRefreshRequestFailed: true,
                tokenRefreshRequestInProgress: false,
                accessToken: ""
            }
        }

        case GET_PROFILE_INFO_IN_PROGRESS: {
            return {
                ...state,
                getProfileInfoInProgress: true
            }
        }
        case GET_PROFILE_INFO_SUCCESS: {
            return {
                ...state,
                getProfileInfoFailed: false,
                getProfileInfoInProgress: false,
                user: action.user
            }
        }
        case GET_PROFILE_INFO_FAILED: {
            return {
                ...state,
                getProfileInfoFailed: true,
                getProfileInfoInProgress: false
            }
        }

        case SET_PROFILE_INFO_IN_PROGRESS: {
            return {
                ...state,
                setProfileInfoInProgress: true
            }
        }
        case SET_PROFILE_INFO_SUCCESS: {
            return {
                ...state,
                setProfileInfoFailed: false,
                setProfileInfoInProgress: false,
                user: action.user
            }
        }
        case SET_PROFILE_INFO_FAILED: {
            return {
                ...state,
                user: {},
                setProfileInfoFailed: true,
                setProfileInfoInProgress: false
            }
        }

        case RESET_PASSWORD_IN_PROGRESS: {
            return {
                ...state,
                resetPasswordInProgress: true
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordFailed: false,
                resetPasswordInProgress: false,
                resetPasswordWasSent: true,
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordFailed: true,
                resetPasswordInProgress: false,
                resetPasswordWasSent: false
            }
        }

        case SET_NEW_PASSWORD_IN_PROGRESS: {
            return {
                ...state,
                setProfileInfoInProgress: true
            }
        }
        case SET_NEW_PASSWORD_SUCCESS: {
            return {
                ...state,
                setNewPasswordFailed: false,
                setNewPasswordInProgress: false,
                resetPasswordWasSent: false,
            }
        }
        case SET_NEW_PASSWORD_FAILED: {
            return {
                ...state,
                setNewPasswordFailed: true,
                setNewPasswordInProgress: false
            }
        }
        default: {
            return state;
        }
    }
}
