import React, {useEffect} from 'react';
import './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import style from './App.module.css'
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import OrderDetails from "../order-details/OrderDetails";
import {CLOSE_INGREDIENT_MODAL, getIngredients} from "../../services/actions/burger-ingredients";
import {useDispatch, useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {CLOSE_ORDER_MODAL} from "../../services/actions/burger-constructor-ingredients";

function App() {
    const dispatch = useDispatch();
    const isIngredientModalShown = useSelector(store => store.ingredientReducer.ingredientModalShow)
    const isOrderDetailsModalShown = useSelector(store => store.orderDetailsReducer.orderModalShown)

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
            <AppHeader/>
            <DndProvider backend={HTML5Backend}>
                <div
                    className={style.content}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </div>
            </DndProvider>
        </div>
    );
}

export default App;
