import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from './services/reducers';
import thunk from 'redux-thunk';
import App from "./components/app/App";
import {BrowserRouter as Router} from "react-router-dom";
import {socketMiddleware} from './services/middleware/socketMiddleware'

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const ordersWsAll = "wss://norma.nomoreparties.space/orders/all"
const ordersWsUser = "wss://norma.nomoreparties.space/orders"

const enhancer = composeEnhancers(applyMiddleware(
        thunk,
        socketMiddleware(ordersWsAll),
        socketMiddleware(ordersWsUser),
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
