import Modal from "../../components/modal/Modal";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import React from "react";
import {useHistory} from "react-router-dom";

export function IngredientModalPage() {
    const history = useHistory()
    return (
        <Modal title="Детали ингредиента"
               handleClose={() => {
                   history.goBack()
               }}
        >
            <IngredientDetails/>
        </Modal>
    )
}

