import '../../pages/constructor-page/constructorPage.module.css';
import {CLOSE_INGREDIENT_MODAL} from "../../services/actions/burger-ingredients";
import {useDispatch} from "react-redux";
import {CLOSE_ORDER_MODAL} from "../../services/actions/burger-constructor-ingredients";
import {Route, Switch, useLocation} from "react-router-dom";
import {ConstructorPage} from "../../pages/constructor-page/constructorPage";
import {LoginPage} from "../../pages/login-page/loginPage";
import {RegistrationPage} from "../../pages/registration-page/registrationPage";
import {ForgotPasswordPage} from "../../pages/forgot-password-page/forgotPasswordPage";
import {ResetPasswordPage} from "../../pages/reset-password-page/resetPasswordPage";
import {ProfilePage} from "../../pages/profile-page/profilePage";
import {NotFoundPage} from "../../pages/not-found-page/notFoundPage";
import AppHeader from "../app-header/AppHeader";
import {ProtectedRoute} from "../protected-route";
import {AuthorizedRoute} from "../authorizedRoute";
import {IngredientModalPage} from "../../pages/ingredient-modal-page/ingredientModalPage";
import React from "react";
import IngredientDetails from "../ingredient-details/IngredientDetails";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const background = location.state?.background;

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
            <Switch location={background || location}>
                <Route path="/" exact>
                    <ConstructorPage handleClose={handleClose} handleEscKeydown={handleEscKeydown}/>
                </Route>
                <AuthorizedRoute path={"/login"}>
                    <LoginPage/>
                </AuthorizedRoute>
                <AuthorizedRoute path={"/register"}>
                    <RegistrationPage/>
                </AuthorizedRoute>
                <AuthorizedRoute path={"/forgot-password"}>
                    <ForgotPasswordPage/>
                </AuthorizedRoute>
                <AuthorizedRoute path={"/reset-password"}>
                    <ResetPasswordPage/>
                </AuthorizedRoute>
                <ProtectedRoute path={"/profile"}>
                    <ProfilePage/>
                </ProtectedRoute>
                <Route path={"/ingredients/:id"}>
                    <IngredientDetails/>
                </Route>
                <Route path="*">
                    <NotFoundPage/>
                </Route>
            </Switch>
            {background &&
                <Route path={"/ingredients/:id"}>
                    <IngredientModalPage handleClose={handleClose} handleEscKeydown={handleEscKeydown}/>
                </Route>}
        </>
    );
}

export default App;
