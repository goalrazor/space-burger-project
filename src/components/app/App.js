import React from 'react';
import './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";

function App() {
    return (
        <div className="App">
            <AppHeader/>
            <BurgerIngredients/>
        </div>
    );
}

export default App;
