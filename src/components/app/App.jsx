import React, {useEffect, useState} from 'react';
import './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import style from './App.module.css'
import api from "../../api/Api";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import OrderDetails from "../order-details/OrderDetails";

function App() {


    const [ingredients, setIngredients] = useState(null)
    const [ingredientsDetailsModalShow, setIngredientsDetailsModalShow] = useState({show: false})
    const [orderDetailsModalShow, setOrderDetailsModalShow] = useState({show: false})

    useEffect(() => {
        handleRequest();
    }, [])

    const closeAllModals = () => {
        setIngredientsDetailsModalShow({
            ...ingredientsDetailsModalShow,
            show: false
        });
        setOrderDetailsModalShow({
            ...orderDetailsModalShow,
            show: false
        });
        // тут же закрываем и другие модалки
    };

    const handleEscKeydown = (e) => {
        e.key === "Escape" && closeAllModals();
    };

    const handleRequest = () => {
        api
            .getIngredients()
            .then(response => {
                setIngredients(response.data)
            })
    }

    return (
        <div className="App">
            {ingredientsDetailsModalShow.show &&
                <Modal
                    title="Детали ингредиента"
                    onOverlayClick={closeAllModals}
                    onEscKeydown={handleEscKeydown}
                >
                    <IngredientDetails props={ingredientsDetailsModalShow}/>
                </Modal>
            }
            {orderDetailsModalShow.show &&
                <Modal
                    title=""
                    onOverlayClick={closeAllModals}
                    onEscKeydown={handleEscKeydown}
                >
                    <OrderDetails props={orderDetailsModalShow}/>
                </Modal>
            }
            <AppHeader/>
            <div
                className={style.content}>
                {ingredients && <BurgerIngredients data={ingredients} setModalShow={setIngredientsDetailsModalShow}/>}
                {ingredients && <BurgerConstructor data={ingredients} setModalShow={setOrderDetailsModalShow}/>}
            </div>
        </div>
    );
}

export default App;
