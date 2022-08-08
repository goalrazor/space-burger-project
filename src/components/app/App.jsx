import '../../pages/constructor-page/constructorPage.module.css';
import {CLOSE_INGREDIENT_MODAL} from "../../services/actions/burger-ingredients";
import {useDispatch} from "react-redux";
import {CLOSE_ORDER_MODAL} from "../../services/actions/burger-constructor-ingredients";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ConstructorPage} from "../../pages/constructor-page/constructorPage";
import {LoginPage} from "../../pages/login-page/loginPage";
import {RegistrationPage} from "../../pages/registration-page/registrationPage";
import {ForgotPasswordPage} from "../../pages/forgot-password-page/forgotPasswordPage";
import {ResetPasswordPage} from "../../pages/reset-password-page/resetPasswordPage";
import {ProfilePage} from "../../pages/profile-page/profilePage";
import {NotFoundPage} from "../../pages/not-found-page/notFoundPage";
import AppHeader from "../app-header/AppHeader";
import {ProtectedRoute} from "../protected-route";
import {AuthorizedRoute} from "../AuthorizedRoute";
import {IngredientDetailsPage} from "../../pages/ingredient-details-page/ingredientDetailsPage";

function App() {
    const dispatch = useDispatch();

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
            <Router>
                <AppHeader/>
                <Switch>
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

                    <IngredientDetailsPage handleClose={handleClose} handleEscKeydown={handleEscKeydown}/>

                    <Route path="*">
                        <NotFoundPage/>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
