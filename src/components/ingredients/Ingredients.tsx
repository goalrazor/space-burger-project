import style from "../burger-ingredients/BurgerIngredients.module.css";
import Card from "../card/Card";
import React, {FC} from "react";
import {TCard} from "../../services/types";

export const BUN = 'Булки'
export const SAUCE = 'Соусы'
export const MAIN = 'Начинки'

const switchDataString = (key: string) => {
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

const filterBurgerData = (dataString: string, data: ReadonlyArray<TCard>) => {
    return data.filter(item => {
        return item.type === dataString
    });

}

export const getPartOfBurgerData = (children: string, data: ReadonlyArray<TCard>) => {
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

interface IIngredientData {
    data: ReadonlyArray<TCard>,
    tab: string
}

const Ingredients: FC<IIngredientData> = ({children, data, tab}) => {
    return (
        <>
            <h2 id={tab} className={'text text_type_main-medium'}>
                {children}
            </h2>
            <div className={style.cardsContainer}>
                {getPartOfBurgerData(tab, data).map(item => {
                    return (
                        <Card
                            key={item._id}
                            {...item}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default Ingredients;
