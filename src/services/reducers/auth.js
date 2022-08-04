import {
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
    REGISTER_REQUEST_SUCCESS
} from "../actions/auth";

const initialState = {
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
    tokenRefreshRequestFailed: false
}

export const authReducer = (state = initialState, action) => {
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
                logoutRequestInProgress: false
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
                accessToken: action.accessToken
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

        default: {
            return state;
        }
    }
}
