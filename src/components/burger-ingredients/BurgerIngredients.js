import React from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './BurgerIngredients.module.css'
import Ingredients from "../inredients/Ingredients";

const Tabs = () => {
    const [current, setCurrent] = React.useState('one')
    return (
        <div style={{display: 'flex'}} className={'mb-10'}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                One
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Two
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Three
            </Tab>
        </div>
    )
}

const BurgerIngredients = () => {
    return (
        <section className={style.constructorContainer}>
            <h1 className={`${'mt-10 mb-5 text text_type_main-large'}`}>
                Соберите бургер
            </h1>
            <Tabs/>
            <div style={{
                overflowY: 'auto',
                maxHeight: '716px',
                scrollbarWidth: '8px',
                scrollbarColor: '#8585AD',
            }}>
                <Ingredients>
                    Булки
                </Ingredients>
                <Ingredients>
                    Соусы
                </Ingredients>
                <Ingredients>
                    Начинки
                </Ingredients>
            </div>
        </section>
    )
}

export default BurgerIngredients
