import {AppDispatch, AppThunk} from "../../types/redux";
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
    SET_PROFILE_INFO_SUCCESS
} from "./authActions";

import api from "../../../api/Api";
import {setCookie} from "../../../utils/cookie";

export const register: AppThunk = (email, password, name) => (dispatch: AppDispatch) => {
    dispatch({
        type: REGISTER_REQUEST_IN_PROGRESS
    });
    return api.register(email, password, name)
        .then(res => checkSuccess(res))
        .then(res => {
            dispatch({
                type: REGISTER_REQUEST_SUCCESS,
                user: res.user,
                accessToken: res.accessToken.split('Bearer ')[1],
                refreshToken: res.refreshToken
            })
            return res
        })
        .catch(err => {
            console.error(err)
            dispatch(registerFailed())
            return err
        })
}

export const login: AppThunk = (email, password) => (dispatch: AppDispatch) => {
    dispatch({
        type: LOGIN_REQUEST_IN_PROGRESS
    });
    return api.login(email, password)
        .then(res => checkSuccess(res))
        .then(res => {
            dispatch({
                type: LOGIN_REQUEST_SUCCESS,
                user: res.user,
                accessToken: res.accessToken.split('Bearer ')[1],
                refreshToken: res.refreshToken
            })
            return res
        })
        .catch(err => {
            console.error(err)
            dispatch(loginFailed())
            return err
        })
}

export const logout: AppThunk = (refreshToken) => (dispatch: AppDispatch) => {
    dispatch({
        type: LOGOUT_REQUEST_IN_PROGRESS
    });
    return api.logout(refreshToken)
        .then(res => checkSuccess(res))
        .then(res => {
            dispatch({
                type: LOGOUT_REQUEST_SUCCESS,
            })
            return res
        })
        .catch(err => {
            console.error(err)
            dispatch(logoutFailed())
            return err
        })
}
export const refreshToken: AppThunk = (refreshToken) => (dispatch: AppDispatch) => {
    dispatch({
        type: REFRESH_TOKEN_REQUEST_IN_PROGRESS
    });
    return api.refreshToken(refreshToken)
        .then(res => checkSuccess(res))
        .then(res => {
            dispatch({
                type: REFRESH_TOKEN_REQUEST_SUCCESS,
                accessToken: res.accessToken.split('Bearer ')[1],
                refreshToken: res.refreshToken
            })
            localStorage.setItem("refreshToken", res.refreshToken)
            setCookie("accessToken", res.accessToken.split('Bearer ')[1])
            return res
        })
        .catch(err => {
            console.error(err)
            dispatch(refreshFailed())
            throw err
        })
}

export const getProfileInfo: AppThunk = (token) => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_PROFILE_INFO_IN_PROGRESS
    });
    return api.getProfileInfo(token)
        .then(res => checkSuccess(res))
        .then(res => {
            dispatch({
                type: GET_PROFILE_INFO_SUCCESS,
                user: res.user,
            })
            return res
        })
        .catch(err => {
            console.error(err)
            dispatch(getProfileFailed())
            return err
        })
}

export const setProfileInfo: AppThunk = (token, email, password, name) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_PROFILE_INFO_IN_PROGRESS
    });
    return api.setProfileInfo(token, {email, password, name})
        .then(res => checkSuccess(res))
        .then(res => {
            dispatch({
                type: SET_PROFILE_INFO_SUCCESS,
                user: res.user,
            })
            return res
        })
        .catch(err => {
            console.error(err)
            dispatch(setProfileFailed())
            return err
        })
}
export const resetPassword: AppThunk = (email) => (dispatch: AppDispatch) => {
    dispatch({
        type: RESET_PASSWORD_IN_PROGRESS
    });
    return api.resetPassword(email)
        .then(res => checkSuccess(res))
        .then(res => {
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
            })
            return res
        })
        .catch(err => {
            console.error(err)
            dispatch(resetPasswordFailed())
            return err
        })
}

export const setNewPassword: AppThunk = (email, token) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_NEW_PASSWORD_IN_PROGRESS
    });
    return api.setNewPassword(email, token)
        .then(res => checkSuccess(res))
        .then(res => {
            dispatch({
                type: SET_NEW_PASSWORD_SUCCESS,
            })
            return res
        })
        .catch(err => {
            console.error(err)
            dispatch(setNewPasswordFailed())
            return err
        })
}

function checkSuccess(res: any) {
    if (res && res.success) {
        return res
    }
    throw res.message()
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
