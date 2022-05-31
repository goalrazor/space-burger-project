import React, {useEffect, useState} from 'react';
import './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import style from './App.module.css'
import api from "../../api/Api";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";

function App() {


    const [ingredients, setIngredients] = useState(null)
    const [modalShow, setModalShow] = useState({show: false})

    useEffect(() => {
        handleRequest();
    }, [])

    const closeAllModals = () => {
        setModalShow({
            ...modalShow,
            show: false
        });
        console.log(modalShow)
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

    console.log(ingredients)
    return (
        <div className="App">
            {modalShow.show &&
                <Modal
                    title="Детали ингредиента"
                    onOverlayClick={closeAllModals}
                    onEscKeydown={handleEscKeydown}
                >
                    <IngredientDetails props={modalShow}/>
                </Modal>
            }
            <AppHeader/>
            <div
                className={style.content}>
                {ingredients && <BurgerIngredients data={ingredients} setModalShow={setModalShow}/>}
                {ingredients && <BurgerConstructor data={ingredients}/>}
            </div>
        </div>
    );
}

export default App;
