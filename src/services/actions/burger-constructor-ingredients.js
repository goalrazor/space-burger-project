import api from "../../api/Api";

export const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';
export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';
export const SET_ORDER_REQUEST_FAILED = 'SET_ORDER_REQUEST_FAILED';

export function setOrder(body) {
    return function (dispatch) {
        dispatch({
            type: SET_ORDER_REQUEST
        });
        api.saveOrder(body)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: SET_ORDER_DETAILS,
                        details: res
                    })
                } else {
                    dispatch({
                        type: SET_ORDER_REQUEST_FAILED
                    });
                }
            });
    };
}

