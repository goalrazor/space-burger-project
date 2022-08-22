import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from './services/reducers';
import thunk from 'redux-thunk';
import App from "./components/app/App";
import {BrowserRouter as Router} from "react-router-dom";
import {socketMiddleware} from './services/middleware/socketMiddleware'
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from "./services/actions/webSocket";

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const actions = {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_START
}

const enhancer = composeEnhancers(applyMiddleware(
        thunk,
    socketMiddleware(actions)
    )
);

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>
    , document.querySelector("#root"));
