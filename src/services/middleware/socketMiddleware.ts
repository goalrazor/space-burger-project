import {TActions,} from "../actions/webSocket";
import {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState} from "../types/redux";

export const socketMiddleware = (actions: TActions): Middleware => {
    const {
        WS_CONNECTION_START,
        WS_CONNECTION_SUCCESS,
        WS_CONNECTION_ERROR,
        WS_GET_MESSAGE,
        WS_CONNECTION_CLOSED,
        WS_SEND_MESSAGE
    } = actions
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => action => {
            const {dispatch} = store;
            const {type, payload} = action;

            if (type === WS_CONNECTION_START) {
                socket = new WebSocket(payload);
            }

            if (socket) {
                // функция, которая вызывается при открытии сокета
                socket.onopen = event => {
                    dispatch({type: WS_CONNECTION_SUCCESS, payload: event});
                };

                // функция, которая вызывается при ошибке соединения
                socket.onerror = event => {
                    dispatch({type: WS_CONNECTION_ERROR, payload: event});
                };

                // функция, которая вызывается при получении события от сервера
                socket.onmessage = event => {
                    const {data} = event;
                    dispatch({type: WS_GET_MESSAGE, payload: {...JSON.parse(data)}});
                };
                // функция, которая вызывается при закрытии соединения
                socket.onclose = event => {
                    dispatch({type: WS_CONNECTION_CLOSED, payload: event});
                };

                if (type === WS_SEND_MESSAGE) {
                    // функция для отправки сообщения на сервер
                    socket.send(JSON.stringify({...payload}));
                }
            }

            next(action);
        };
    };
};
