import React from 'react';
import './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";

function App() {
    return (
        <div className="App">
            <AppHeader/>
            <div style={{
                display: "flex",
                gap: '40px',
                minWidth: '1240px',
                margin: 'auto',

            }}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </div>
        </div>
    );
}

export default App;
