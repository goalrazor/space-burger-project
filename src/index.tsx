import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from './services/reducers';
import thunk from 'redux-thunk';
import App from "./components/app/App";
import {BrowserRouter as Router} from "react-router-dom";
import {socketMiddleware} from './services/middleware/socketMiddleware'
import {
    TActions,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from "./services/actions/webSocket";

const composeEnhancers =
    ((window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) ||
    compose;


const actions: TActions = {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
    WS_CONNECTION_CLOSED,
    WS_SEND_MESSAGE
}

const enhancer = composeEnhancers(applyMiddleware(
        thunk,
        socketMiddleware(actions)
    )
);

export const store = createStore(rootReducer, enhancer);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>, document.querySelector("#root")
);
