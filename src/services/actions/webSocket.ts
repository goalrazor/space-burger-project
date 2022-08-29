export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = "WS_CONNECTION_SUCCESS"
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = "WS_CONNECTION_ERROR"
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = "WS_CONNECTION_CLOSED"
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = "WS_GET_MESSAGE"
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = "WS_CONNECTION_START"

export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR
}

export interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWSConnectionGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE
}

export interface IWSConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START
}

export type TWSActions =
    IWSConnectionClosedAction
    | IWSConnectionErrorAction
    | IWSConnectionSuccessAction
    | IWSConnectionStartAction
    | IWSConnectionGetMessageAction