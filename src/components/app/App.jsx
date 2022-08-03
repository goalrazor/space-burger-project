import React, {useEffect} from 'react';
import '../../pages/constructorPage.module.css';
import {CLOSE_INGREDIENT_MODAL, getIngredients} from "../../services/actions/burger-ingredients";
import {useDispatch} from "react-redux";
import {CLOSE_ORDER_MODAL} from "../../services/actions/burger-constructor-ingredients";
import {ConstructorPage} from "../../pages/constructorPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getIngredients())
    }, [dispatch]);

    const handleClose = () => {
        dispatch({
            type: CLOSE_INGREDIENT_MODAL
        });
        dispatch({
            type: CLOSE_ORDER_MODAL
        });
    }

    const handleEscKeydown = (e) => {
        e.key === "Escape" && handleClose();
    };

    return (
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <ConstructorPage handleClose={handleClose} handleEscKeydown={handleEscKeydown}/>
                    </Route>
                </Switch>
            </Router>
    );
}

export default App;
