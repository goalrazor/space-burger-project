import {getCookie} from "../../utils/cookie";

export const socketMiddleware = () => {
    const ordersWsAll = "wss://norma.nomoreparties.space/orders/all"
    const ordersWsUser = "wss://norma.nomoreparties.space/orders"

    return store => {
        let socket = null;

        return next => action => {
            const {dispatch} = store;
            const {type, payload} = action;

            if (type === 'WS_CONNECTION_START') {
                socket = new WebSocket(`${ordersWsAll}`);
            }

            if (type === 'WS_AUTH_CONNECTION_START') {
                const token = getCookie("accessToken")
                if (token) {
                    socket = new WebSocket(`${ordersWsUser}?token=${token}`);
                }
            }

            if (socket) {
                // функция, которая вызывается при открытии сокета
                socket.onopen = event => {
                    dispatch({type: 'WS_CONNECTION_SUCCESS', payload: event});
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {
                    dispatch({type: 'WS_CONNECTION_ERROR', payload: event});
                };

                // функция, которая вызывается при получении события от сервера
                socket.onmessage = event => {
                    const {data} = event;
                    dispatch({type: 'WS_GET_MESSAGE', payload: {...JSON.parse(data)}});
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = event => {
                    dispatch({type: 'WS_CONNECTION_CLOSED', payload: event});
                };

                if (type === 'WS_SEND_MESSAGE') {
                    // функция для отправки сообщения на сервер
                    socket.send(JSON.stringify({...payload}));
                }
            }

            next(action);
        };
    };
};
