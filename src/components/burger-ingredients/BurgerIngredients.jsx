import React from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './BurgerIngredients.module.css'
import scrollerStyle from '../app/App.module.css'
import Ingredients, {BUN, MAIN, SAUCE} from "../inredients/Ingredients";
import {useSelector} from "react-redux";

const Tabs = () => {
    const [current, setCurrent] = React.useState(BUN);

    const goToViolation = (id) => {
        const violation = document.querySelector(`#` + id);
        violation.scrollIntoView({
            behavior: "smooth"
        });
        setCurrent(id);
    };

    return (
        <div className={`${style.tab} ${'mb-10'}`}>
            <Tab value={BUN} active={current === BUN} onClick={() => {
                goToViolation(BUN)
            }}>
                {BUN}
            </Tab>
            <Tab value={SAUCE} active={current === SAUCE} onClick={() => {
                goToViolation(SAUCE)
            }}>
                {SAUCE}
            </Tab>
            <Tab value={MAIN} active={current === MAIN} onClick={() => {
                goToViolation(MAIN)
            }}>
                {MAIN}
            </Tab>
        </div>
    )
}

const BurgerIngredients = () => {
    const data = useSelector(store => store.ingredientReducer.ingredients);
    return (
        <section className={style.container}>
            <h1 className={`${'mt-10 mb-5 text text_type_main-large'}`}>
                Соберите бургер
            </h1>
            <Tabs/>
            {data && <div className={scrollerStyle.scroller}>
                <Ingredients data={data}>
                    {BUN}
                </Ingredients>
                <Ingredients data={data}>
                    {SAUCE}
                </Ingredients>
                <Ingredients data={data}>
                    {MAIN}
                </Ingredients>
            </div>}
        </section>
    )
}

export default BurgerIngredients
