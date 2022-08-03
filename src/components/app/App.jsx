import React, {useEffect} from 'react';
import '../../pages/constructor-page/constructorPage.module.css';
import {CLOSE_INGREDIENT_MODAL, getIngredients} from "../../services/actions/burger-ingredients";
import {useDispatch} from "react-redux";
import {CLOSE_ORDER_MODAL} from "../../services/actions/burger-constructor-ingredients";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ConstructorPage} from "../../pages/constructor-page/constructorPage";
import {LoginPage} from "../../pages/login-page/loginPage";
import {RegistrationPage} from "../../pages/registration-page/registrationPage";
import {ForgotPasswordPage} from "../../pages/forgot-password-page/forgotPasswordPage";
import {ResetPasswordPage} from "../../pages/reset-password-page/resetPasswordPage";
import {ProfilePage} from "../../pages/profile-page/profilePage";
import {IngredientPage} from "../../pages/ingredient-page/ingredientPage";
import {NotFoundPage} from "../../pages/not-found-page/notFoundPage";
import AppHeader from "../app-header/AppHeader";

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
        <>
            <AppHeader/>
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <ConstructorPage handleClose={handleClose} handleEscKeydown={handleEscKeydown}/>
                    </Route>
                    <Route path="/login" exact>
                        <LoginPage/>
                    </Route>
                    <Route path="/register" exact>
                        <RegistrationPage/>
                    </Route>
                    <Route path="/forgot-password" exact>
                        <ForgotPasswordPage/>
                    </Route>
                    <Route path="/reset-password" exact>
                        <ResetPasswordPage/>
                    </Route>
                    <Route path="/profile" exact>
                        <ProfilePage/>
                    </Route>
                    <Route path="/ingredients/:id" exact>
                        <IngredientPage/>
                    </Route>
                    <Route path="*">
                        <NotFoundPage/>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
