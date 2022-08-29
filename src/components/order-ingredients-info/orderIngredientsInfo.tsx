import React from "react";
import {IngredientImage} from "../feed-card/feedCard";
import style from './orderIngredientsInfo.module.css'
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TCard} from "../../services/types";

export const OrderIngredientsInfo = ({ingredient}: { ingredient: TCard & { count?: number } }) => {

    return (
        <ul className={style.list}>
            <li className={style.listElement}>
                <div className={style.ingredient}>
                    <IngredientImage images={[{url: ingredient.image}]}/>
                    <p className={`text text_type_main-default pl-4`}>{ingredient.name}</p>
                </div>
                <div className={style.price}>
                    <p className='text text_type_digits-default pr-2'>{`${ingredient.count} x ${ingredient.price}`}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </li>
        </ul>
    )
}
