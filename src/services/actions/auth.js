import api from "../../api/Api";

export const REGISTER_REQUEST_IN_PROGRESS = "REGISTER_REQUEST_IN_PROGRESS"
export const REGISTER_REQUEST_FAILED = "REGISTER_REQUEST_FAILED"
export const REGISTER_REQUEST_SUCCESS = "REGISTER_REQUEST_SUCCESS"

export const LOGIN_REQUEST_IN_PROGRESS = "LOGIN_REQUEST_IN_PROGRESS"
export const LOGIN_REQUEST_FAILED = "LOGIN_REQUEST_FAILED"
export const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS"

export const LOGOUT_REQUEST_IN_PROGRESS = "LOGOUT_REQUEST_IN_PROGRESS"
export const LOGOUT_REQUEST_FAILED = "LOGOUT_REQUEST_FAILED"
export const LOGOUT_REQUEST_SUCCESS = "LOGOUT_REQUEST_SUCCESS"

export const REFRESH_TOKEN_REQUEST_IN_PROGRESS = "REFRESH_TOKEN_REQUEST_IN_PROGRESS"
export const REFRESH_TOKEN_REQUEST_FAILED = "REFRESH_TOKEN_REQUEST_FAILED"
export const REFRESH_TOKEN_REQUEST_SUCCESS = "REFRESH_TOKEN_REQUEST_SUCCESS"


export function register(email, password, name) {
    return function (dispatch) {
        dispatch({
            type: REGISTER_REQUEST_IN_PROGRESS
        });
        api.register(email, password, name)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: REGISTER_REQUEST_SUCCESS,
                        user: res.user,
                        accessToken: res.accessToken.split('Bearer ')[1],
                        refreshToken: res.refreshToken
                    })
                } else {
                    dispatch(registerFailed());
                }
            })
            .catch(err => {
                console.error(err)
                dispatch(registerFailed())
            })
    }
}


export function login(email, password) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST_IN_PROGRESS
        });
        api.login(email, password)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: LOGIN_REQUEST_SUCCESS,
                        user: res.user,
                        accessToken: res.accessToken.split('Bearer ')[1],
                        refreshToken: res.refreshToken
                    })
                } else {
                    dispatch(loginFailed());
                }
            })
            .catch(err => {
                console.error(err)
                dispatch(loginFailed())
            })
    }
}

export function logout(refreshToken) {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST_IN_PROGRESS
        });
        api.logout(refreshToken)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: LOGOUT_REQUEST_SUCCESS,
                    })
                } else {
                    dispatch(logoutFailed());
                }
            })
            .catch(err => {
                console.error(err)
                dispatch(logoutFailed())
            })
    }
}

export function refreshToken(refreshToken) {
    return function (dispatch) {
        dispatch({
            type: REFRESH_TOKEN_REQUEST_IN_PROGRESS
        });
        api.refreshToken(refreshToken)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: REFRESH_TOKEN_REQUEST_SUCCESS,
                        accessToken: res.accessToken.split('Bearer ')[1],
                    })
                } else {
                    dispatch(refreshFailed());
                }
            })
            .catch(err => {
                console.error(err)
                dispatch(refreshFailed())
            })
    }
}

function registerFailed() {
    return {
        type: REGISTER_REQUEST_FAILED
    }
}

function loginFailed() {
    return {
        type: LOGIN_REQUEST_FAILED
    }
}

function refreshFailed() {
    return {
        type: REFRESH_TOKEN_REQUEST_FAILED
    }
}

function logoutFailed() {
    return {
        type: LOGOUT_REQUEST_FAILED
    }
}
