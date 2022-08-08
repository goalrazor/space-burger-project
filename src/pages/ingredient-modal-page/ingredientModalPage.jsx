import Modal from "../../components/modal/Modal";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import React from "react";
import {useHistory} from "react-router-dom";

export function IngredientModalPage({handleClose, handleEscKeydown}) {
    const history = useHistory()
    return (
        <Modal title="Детали ингредиента"
               handleClose={() => {
                   handleClose()
                   history.goBack()
               }}
               handleEscKeydown={(e) => {
                   handleEscKeydown(e)
                   history.goBack()
               }}>
            <IngredientDetails/>
        </Modal>
    )
}
