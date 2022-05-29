import React from 'react';
import './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import style from './App.module.css'
import data from '../../utils/data'

function App() {
    return (
        <div className="App">
            <AppHeader/>
            <div className={style.content}>
                <BurgerIngredients data={data}/>
                <BurgerConstructor data={data}/>
            </div>
        </div>
    );
}

export default App;
