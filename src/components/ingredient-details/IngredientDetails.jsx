import React, {useEffect} from 'react'
import ingredientDetailsStyle from './IngredientDetails.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {SET_INGREDIENT_MODAL_CLOSED, SET_INGREDIENT_MODAL_SHOW} from "../../services/actions/burger-ingredients";

const IngredientDetails = () => {
    const statsTextStyle = 'text text_type_main-default text_color_inactive';
    const statsDigitsStyle = 'text text_type_digits-default text_color_inactive';

    const {id} = useParams()
    const dispatch = useDispatch()

    const location = useLocation();
    const background = location.state?.background;

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

    let ingredient;
    const ingredients
        = useSelector(store => store.ingredientReducer.ingredients)
    if (ingredients.length > 0) {
        ingredient = ingredients.find(item => item._id === id)
    }

    return (
        <>
            {ingredients.length > 0 &&
                <div className={ingredientDetailsStyle.ingredientDetailsContainer}>
                    <img
                        className={ingredientDetailsStyle.image}
                        src={ingredient.image_large}
                        alt={ingredient.name}/>
                    <p
                        className={'text text_type_main-medium mt-4 mb-8'}>
                        {ingredient.name}
                    </p>
                    <ul className={ingredientDetailsStyle.stats}>
                        <li className={ingredientDetailsStyle.stat}>
                            <p className={statsTextStyle}>
                                Калории,ккал
                            </p>
                            <p className={statsDigitsStyle}>
                                {ingredient.calories}
                            </p>
                        </li>
                        <li className={ingredientDetailsStyle.stat}>
                            <p className={statsTextStyle}>
                                Белки, г
                            </p>
                            <p className={statsDigitsStyle}>
                                {ingredient.proteins}
                            </p>
                        </li>
                        <li className={ingredientDetailsStyle.stat}>
                            <p className={statsTextStyle}>
                                Жиры, г
                            </p>
                            <p className={statsDigitsStyle}>
                                {ingredient.fat}
                            </p>
                        </li>
                        <li className={ingredientDetailsStyle.stat}>
                            <p className={statsTextStyle}>
                                Углеводы, г
                            </p>
                            <p className={statsDigitsStyle}>
                                {ingredient.carbohydrates}
                            </p>
                        </li>
                    </ul>
                </div>
            }
        </>
    )
}

export default IngredientDetails;
