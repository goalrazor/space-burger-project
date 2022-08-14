import React from 'react'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import style from "./constructorPage.module.css";
import BurgerIngredients from "../../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../../components/burger-constructor/BurgerConstructor";


export function ConstructorPage() {

    return (
        <div className="App">
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


