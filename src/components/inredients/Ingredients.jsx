import style from "../burger-ingredients/BurgerIngredients.module.css";
import Card from "../card/Card";
import {ingredientsPropTypes} from "../../utils/propTypesTemplates";
import PropTypes from "prop-types";
import React from "react";

export const BUN = 'Булки'
export const SAUCE = 'Соусы'
export const MAIN = 'Начинки'

const switchDataString = (key) => {
    let dataString;
    switch (key) {
        case BUN:
            dataString = 'bun';
            break;
        case SAUCE:
            dataString = 'sauce';
            break;
        case MAIN:
            dataString = 'main';
            break;
        default:
            dataString = 'inner';
    }

    return dataString;
}

const filterBurgerData = (dataString, data) => {
    return data.filter(item => {
        return item.type === dataString
    });

}

export const getPartOfBurgerData = (children, data) => {
    const dataString = switchDataString(children);
    let partOfBurger;
    if (dataString !== 'inner') {
        partOfBurger = (filterBurgerData(dataString, data));
        return partOfBurger;
    } else {
        partOfBurger = filterBurgerData(switchDataString(MAIN), data)
            .concat(filterBurgerData(switchDataString(SAUCE), data));
        return partOfBurger;
    }
}

const Ingredients = ({children, data, setModalShow}) => {
    return (
        <>
            <h2 id={children} className={'text text_type_main-medium'}>
                {children}
            </h2>
            <div className={style.cardsContainer}>
                {getPartOfBurgerData(children, data).map(item => {
                    return (<Card
                            key={item._id}
                            setModalShow={setModalShow}
                            {...item}
                        />
                    )
                })}
            </div>
        </>
    )
}

Ingredients.propTypes = {
    data: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
    children: PropTypes.string
}

export default Ingredients;
