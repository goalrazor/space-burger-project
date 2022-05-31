import React from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './BurgerIngredients.module.css'
import scrollerStyle from '../app/App.module.css'
import Ingredients, {BUN, MAIN, SAUCE} from "../inredients/Ingredients";
import PropTypes from "prop-types";
import {ingredientsPropTypes} from "../../utils/propTypesTemplates";

const Tabs = () => {
    const [current, setCurrent] = React.useState(BUN)

    return (
        <div className={`${style.tab} ${'mb-10'}`}>
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

const BurgerIngredients = ({data, setModalShow}) => {
    return (
        <section className={style.container}>
            <h1 className={`${'mt-10 mb-5 text text_type_main-large'}`}>
                Соберите бургер
            </h1>
            <Tabs/>
            <div className={scrollerStyle.scroller}>
                <Ingredients data={data} setModalShow={setModalShow}>
                    {BUN}
                </Ingredients>
                <Ingredients data={data} setModalShow={setModalShow}>
                    {SAUCE}
                </Ingredients>
                <Ingredients data={data} setModalShow={setModalShow}>
                    {MAIN}
                </Ingredients>
            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
}

export default BurgerIngredients
