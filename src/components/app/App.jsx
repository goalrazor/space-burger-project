import '../../pages/constructor-page/constructorPage.module.css';
import {getIngredients} from "../../services/actions/burger-ingredients";
import {useDispatch} from "react-redux";
import {Redirect, Route, Switch, useLocation} from "react-router-dom";
import {ConstructorPage} from "../../pages/constructor-page/constructorPage";
import {LoginPage} from "../../pages/login-page/loginPage";
import {RegistrationPage} from "../../pages/registration-page/registrationPage";
import {ForgotPasswordPage} from "../../pages/forgot-password-page/forgotPasswordPage";
import {ResetPasswordPage} from "../../pages/reset-password-page/resetPasswordPage";
import {ProfilePage} from "../../pages/profile-page/profilePage";
import {NotFoundPage} from "../../pages/not-found-page/notFoundPage";
import AppHeader from "../app-header/AppHeader";
import {ProtectedRoute} from "../protected-route";
import {IngredientModalPage} from "../../pages/ingredient-modal-page/ingredientModalPage";
import React, {useEffect} from "react";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import {FeedPage} from "../../pages/feed-page/feedPage";
import {FeedIdPage} from "../../pages/feed-page/feedIdPage";
import {OrderHistoryPage} from "../../pages/order-history-page/orderHistoryPage";
import {OrderHistoryIdPage} from "../../pages/order-history-page/orderHistoryIdPage";
import {SendOrderModalPage} from "../../pages/send-order-modal-page/sendOrderModalPage";

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const background = location.state?.background;

    useEffect(() => {
        dispatch(
            getIngredients())
    }, [dispatch]);

    return (
        <>
            <AppHeader/>
            <Switch location={background || location}>
                <Route path="/" exact>
                    <ConstructorPage/>
                </Route>
                <ProtectedRoute notForAuthorisedRoute={true} path={"/login"}>
                    <LoginPage/>
                </ProtectedRoute>
                <ProtectedRoute notForAuthorisedRoute={true} path={"/register"}>
                    <RegistrationPage/>
                </ProtectedRoute>
                <ProtectedRoute notForAuthorisedRoute={true} path={"/forgot-password"}>
                    <ForgotPasswordPage/>
                </ProtectedRoute>
                <ProtectedRoute notForAuthorisedRoute={true} path={"/reset-password"}>
                    <ResetPasswordPage/>
                </ProtectedRoute>
                <Route path={"/ingredients/:id"}>
                    <IngredientDetails/>
                </Route>
                <Route path={"/feed"} exact>
                    <FeedPage/>
                </Route>
                <ProtectedRoute path={"/feed/:id"}>
                    <FeedIdPage/>
                </ProtectedRoute>
                <ProtectedRoute path={"/profile/orders/:id"}>
                    <OrderHistoryIdPage/>
                </ProtectedRoute>
                <ProtectedRoute path={"/profile/orders"} exact>
                    <OrderHistoryPage/>
                </ProtectedRoute>
                <ProtectedRoute path={"/profile"} exact>
                    <ProfilePage/>
                </ProtectedRoute>
                <ProtectedRoute path={"/order"}>
                    <Redirect to={"/"}/>
                </ProtectedRoute>
                <Route path="*">
                    <NotFoundPage/>
                </Route>
            </Switch>
            {background &&
                <Route path={"/ingredients/:id"}>
                    <IngredientModalPage/>
                </Route>}
            {background &&
                <ProtectedRoute path={"/order"} exact>
                    <SendOrderModalPage/>
                </ProtectedRoute>}
            {background &&
                <ProtectedRoute path={"/profile/orders/:id"}>
                    <FeedIdPage/>
                </ProtectedRoute>}
            {background &&
                <ProtectedRoute path={"/feed/:id"}>
                    <FeedIdPage/>
                </ProtectedRoute>}

        </>
    );
}

export default App;
