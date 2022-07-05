import React, {useEffect} from 'react';
import './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import style from './App.module.css'
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import OrderDetails from "../order-details/OrderDetails";
import {getIngredients} from "../../services/actions/burger-ingredients";
import {useDispatch, useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
    const dispatch = useDispatch();
    const isIngredientModalShown = useSelector(store => store.ingredientReducer.ingredientModalShow)
    const isOrderDetailsModalShown = useSelector(store => store.orderDetailsReducer.orderModalShown)

    useEffect(() => {
        dispatch(
            getIngredients())
    }, [dispatch]);


    return (
        <div className="App">
            {isIngredientModalShown &&
                <Modal title="Детали ингредиента">
                    <IngredientDetails/>
                </Modal>
            }
            {isOrderDetailsModalShown &&
                <Modal title="">
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
