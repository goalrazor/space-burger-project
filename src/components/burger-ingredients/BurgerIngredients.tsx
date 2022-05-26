import React from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './BurgerIngredients.module.css'
import scrollerStyle from '../app/App.module.css'
import Ingredients, {BUN, MAIN, SAUCE} from "../inredients/Ingredients";

const Tabs = () => {
    const [current, setCurrent] = React.useState(BUN)
    return (
        <div style={{display: 'flex'}} className={'mb-10'}>
            <Tab value={BUN} active={current === BUN} onClick={setCurrent}>
                {BUN}
            </Tab>
            <Tab value={SAUCE} active={current === SAUCE} onClick={setCurrent}>
                {SAUCE}
            </Tab>
            <Tab value={MAIN} active={current === MAIN} onClick={setCurrent}>
                {MAIN}
            </Tab>
        </div>
    )
}

const BurgerIngredients = () => {
    return (
        <section className={style.container}>
            <h1 className={`${'mt-10 mb-5 text text_type_main-large'}`}>
                Соберите бургер
            </h1>
            <Tabs/>
            <div className={scrollerStyle.scroller}>
                <Ingredients>
                    {BUN}
                </Ingredients>
                <Ingredients>
                    {SAUCE}
                </Ingredients>
                <Ingredients>
                    {MAIN}
                </Ingredients>
            </div>
        </section>
    )
}

export default BurgerIngredients
