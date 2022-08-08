import React, {useEffect} from 'react'
import Modal from "../../components/modal/Modal";
import IngredientDetails from "../../components/ingredient-details/IngredientDetails";
import OrderDetails from "../../components/order-details/OrderDetails";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import style from "./constructorPage.module.css";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/burger-ingredients";


export function ConstructorPage({handleClose, handleEscKeydown}) {
    const isIngredientModalShown = useSelector(store => store.ingredientReducer.ingredientModalShow)
    const isOrderDetailsModalShown = useSelector(store => store.orderDetailsReducer.orderModalShown)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getIngredients())
    }, [dispatch]);

    return (
        <div className="App">
            {isIngredientModalShown &&
                <Modal title="Детали ингредиента"
                       handleClose={handleClose}
                       handleEscKeydown={handleEscKeydown}>
                    <IngredientDetails/>
                </Modal>
            }
            {isOrderDetailsModalShown &&
                <Modal title=""
                       handleClose={handleClose}
                       handleEscKeydown={handleEscKeydown}>
                    <OrderDetails/>
                </Modal>
            }
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
