import React, {useEffect, useState} from 'react';
import './App.module.css';
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import style from './App.module.css'
import api from "../../api/Api";

function App() {


    const [ingredients, setIngredients] = useState(null)

    useEffect(() => {
        handleRequest();
    }, [])

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
            <AppHeader/>
            <div className={style.content}>
                {ingredients && <BurgerIngredients data={ingredients}/>}
                {ingredients && <BurgerConstructor data={ingredients}/>}
            </div>
        </div>
    );
}

export default App;
