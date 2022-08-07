import api from "../../api/Api";
import {setCookie} from "../../utils/cookie";

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

export const GET_PROFILE_INFO_IN_PROGRESS = "GET_PROFILE_INFO_IN_PROGRESS"
export const GET_PROFILE_INFO_FAILED = "GET_PROFILE_INFO_FAILED"
export const GET_PROFILE_INFO_SUCCESS = "GET_PROFILE_INFO_SUCCESS"

export const SET_PROFILE_INFO_IN_PROGRESS = "SET_PROFILE_INFO_IN_PROGRESS"
export const SET_PROFILE_INFO_FAILED = "SET_PROFILE_INFO_FAILED"
export const SET_PROFILE_INFO_SUCCESS = "SET_PROFILE_INFO_SUCCESS"

export const RESET_PASSWORD_IN_PROGRESS = "RESET_PASSWORD_IN_PROGRESS"
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED"
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS"

export const SET_NEW_PASSWORD_IN_PROGRESS = " SET_NEW_PASSWORD_IN_PROGRESS"
export const SET_NEW_PASSWORD_FAILED = "SET_NEW_PASSWORD_FAILED"
export const SET_NEW_PASSWORD_SUCCESS = "SET_NEW_PASSWORD_SUCCESS"

export function register(email, password, name) {
    return function (dispatch) {
        dispatch({
            type: REGISTER_REQUEST_IN_PROGRESS
        });
        return api.register(email, password, name)
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
        return api.login(email, password)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: LOGIN_REQUEST_SUCCESS,
                        user: res.user,
                        accessToken: res.accessToken.split('Bearer ')[1],
                        refreshToken: res.refreshToken
                    })
                    return res
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
        return api.logout(refreshToken)
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
        return api.refreshToken(refreshToken)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: REFRESH_TOKEN_REQUEST_SUCCESS,
                        accessToken: res.accessToken.split('Bearer ')[1],
                        refreshToken: res.refreshToken
                    })
                    localStorage.setItem("refreshToken", res.refreshToken)
                    setCookie("accessToken", res.accessToken.split('Bearer ')[1])
                    return res
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


export function getProfileInfo(token) {
    return function (dispatch) {
        dispatch({
            type: GET_PROFILE_INFO_IN_PROGRESS
        });
        return api.getProfileInfo(token)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_PROFILE_INFO_SUCCESS,
                        user: res.user,
                    })
                    return res
                } else {
                    dispatch(getProfileFailed());
                }
            })
            .catch(err => {
                console.error(err)
                dispatch(getProfileFailed())
            })
    }
}

export function setProfileInfo(token, email, password, name) {
    return function (dispatch) {
        dispatch({
            type: SET_PROFILE_INFO_IN_PROGRESS
        });
        return api.setProfileInfo(token, email, password, name)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: SET_PROFILE_INFO_SUCCESS,
                        user: res.user,
                    })
                    return res
                } else {
                    dispatch(setProfileFailed());
                }
            })
            .catch(err => {
                console.error(err)
                dispatch(setProfileFailed())
            })
    }
}

export function resetPassword(email) {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_IN_PROGRESS
        });
        return api.resetPassword(email)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                    })
                    return res
                } else {
                    dispatch(resetPasswordFailed());
                }
            })
            .catch(err => {
                console.error(err)
                dispatch(resetPasswordFailed())
            })
    }
}

export function setNewPassword(email, token) {
    return function (dispatch) {
        dispatch({
            type: SET_NEW_PASSWORD_IN_PROGRESS
        });
        return api.setNewPassword(email, token)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: SET_NEW_PASSWORD_SUCCESS,
                    })
                    return res
                } else {
                    dispatch(setNewPasswordFailed());
                }
            })
            .catch(err => {
                console.error(err)
                dispatch(setNewPasswordFailed())
            })
    }
}

function resetPasswordFailed() {
    return {
        type: RESET_PASSWORD_FAILED
    }
}

function setNewPasswordFailed() {
    return {
        type: SET_NEW_PASSWORD_FAILED
    }
}

function getProfileFailed() {
    return {
        type: GET_PROFILE_INFO_FAILED
    }
}

function setProfileFailed() {
    return {
        type: SET_PROFILE_INFO_FAILED
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
