import React from "react";
import {Route, Switch, useLocation} from "react-router-dom";
import {IngredientModalPage} from "../ingredient-modal-page/ingredientModalPage";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import PropTypes from "prop-types";

export function IngredientDetailsPage({handleClose, handleEscKeydown}) {
    const location = useLocation();
    const background = location.state && location.state.background;
    return (
        <>
            <Switch location={background || location}>
                <Route path={"/ingredients/:id"}>
                    <IngredientDetails/>
                </Route>
            </Switch>
            {background &&
                <Route path={"/ingredients/:id"}>
                    <IngredientModalPage handleClose={handleClose} handleEscKeydown={handleEscKeydown}/>
                </Route>}
        </>
    )
}

IngredientDetailsPage.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleEscKeydown: PropTypes.func.isRequired,
}
