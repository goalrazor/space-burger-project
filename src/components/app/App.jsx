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
import BurgerIngredientsContext from "../../services/context/burger-ingredients-context";

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
            .catch(error => console.error('Ошибка при получении ингредиентов с сервера', error))
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
                    <OrderDetails {...orderDetailsModalShow}/>
                </Modal>
            }
            <AppHeader/>
            <BurgerIngredientsContext.Provider value={ingredients}>
                <div
                    className={style.content}>
                    <BurgerIngredients setModalShow={setIngredientsDetailsModalShow}/>
                    <BurgerConstructor setModalShow={setOrderDetailsModalShow}/>
                </div>
            </BurgerIngredientsContext.Provider>
        </div>
    );
}

export default App;
