import React, {useEffect} from 'react'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import style from "./constructorPage.module.css";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import {useDispatch} from "react-redux";
import {getIngredients} from "../../services/actions/burger-ingredients";
import {SendOrderModalPage} from "../send-order-modal-page/sendOrderModalPage";
import PropTypes from "prop-types";


export function ConstructorPage({handleClose, handleEscKeydown}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getIngredients())
    }, [dispatch]);

    return (
        <div className="App">
            <SendOrderModalPage handleClose={handleClose} handleEscKeydown={handleEscKeydown}/>
            <DndProvider backend={HTML5Backend}>
                <div
                    className={style.content}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </div>
            </DndProvider>
        </div>
    )
}

ConstructorPage.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleEscKeydown: PropTypes.func.isRequired,
}

