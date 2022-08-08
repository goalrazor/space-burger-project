import React, {useEffect, useState} from 'react'
import ingredientDetailsStyle from './IngredientDetails.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {
    getIngredients,
    SET_INGREDIENT_MODAL_CLOSED,
    SET_INGREDIENT_MODAL_SHOW
} from "../../services/actions/burger-ingredients";

const IngredientDetails = () => {
    const statsTextStyle = 'text text_type_main-default text_color_inactive';
    const statsDigitsStyle = 'text text_type_digits-default text_color_inactive';

    const {id} = useParams()
    const dispatch = useDispatch()
    const [ingredient, setIngredient] = useState({})

    useEffect(
        () => {
            async function getData() {
                await dispatch(getIngredients())
                    .then((res) => {
                        const ingredient = res.find(item => item._id === id)
                        setIngredient({...ingredient})
                    })
            }

            getData()
        }, [dispatch, id])

    const location = useLocation();
    const background = location.state?.background;

    useEffect(() => {
        //...если компонент не в модальном окне, то не меняем стейт
        background && dispatch({
            type: SET_INGREDIENT_MODAL_SHOW
        })
        return () => {
            background && dispatch({
                type: SET_INGREDIENT_MODAL_CLOSED
            })
        }
    }, [background, dispatch])


    const ingredients
        = useSelector(store => store.ingredientReducer.ingredients)

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
