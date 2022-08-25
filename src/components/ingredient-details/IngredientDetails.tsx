import React, {useEffect} from 'react'
import ingredientDetailsStyle from './IngredientDetails.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {SET_INGREDIENT_MODAL_CLOSED, SET_INGREDIENT_MODAL_SHOW} from "../../services/actions/burger-ingredients";
import {TBackgroundLocation, TCard} from "../../services/types";

const IngredientDetails = () => {
    const statsTextStyle = 'text text_type_main-default text_color_inactive';
    const statsDigitsStyle = 'text text_type_digits-default text_color_inactive';

    const {id} = useParams<{ id: string }>()
    const dispatch = useDispatch()

    const location = useLocation<Location & TBackgroundLocation>();
    const background = location.state?.background

    useEffect(() => {
        background && dispatch({
            type: SET_INGREDIENT_MODAL_SHOW
        })
        return () => {
            background && dispatch({
                type: SET_INGREDIENT_MODAL_CLOSED
            })
        }
    }, [background, dispatch])

    let ingredient: TCard = {
        _id: "",
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        image: "",
        image_large: "",
        image_mobile: "",
        ingredientCount: 0,
        name: "",
        price: 0,
        proteins: 0,
        type: ""
    };

    const ingredients: ReadonlyArray<TCard>
        = useSelector<{ ingredientReducer: any }>(store => store.ingredientReducer.ingredients) as ReadonlyArray<TCard>
    //fixme
    if (ingredients.length > 0) {
        ingredient = ingredients.find((item: { _id: string; }) => item._id === id) as TCard
    }

    const {image_large, name, calories, proteins, fat, carbohydrates} = ingredient

    return (
        <>
            {ingredient &&
                <div className={ingredientDetailsStyle.ingredientDetailsContainer}>
                    <img
                        className={ingredientDetailsStyle.image}
                        src={image_large}
                        alt={name}/>
                    <p
                        className={'text text_type_main-medium mt-4 mb-8'}>
                        {name}
                    </p>
                    <ul className={ingredientDetailsStyle.stats}>
                        <li className={ingredientDetailsStyle.stat}>
                            <p className={statsTextStyle}>
                                Калории,ккал
                            </p>
                            <p className={statsDigitsStyle}>
                                {calories}
                            </p>
                        </li>
                        <li className={ingredientDetailsStyle.stat}>
                            <p className={statsTextStyle}>
                                Белки, г
                            </p>
                            <p className={statsDigitsStyle}>
                                {proteins}
                            </p>
                        </li>
                        <li className={ingredientDetailsStyle.stat}>
                            <p className={statsTextStyle}>
                                Жиры, г
                            </p>
                            <p className={statsDigitsStyle}>
                                {fat}
                            </p>
                        </li>
                        <li className={ingredientDetailsStyle.stat}>
                            <p className={statsTextStyle}>
                                Углеводы, г
                            </p>
                            <p className={statsDigitsStyle}>
                                {carbohydrates}
                            </p>
                        </li>
                    </ul>
                </div>
            }
        </>
    )
}

export default IngredientDetails;
