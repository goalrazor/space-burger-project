import ingredientDetailsStyle from './IngredientDetails.module.css'
import Ingredients from "../inredients/Ingredients";
import {ingredientsPropTypes} from "../../utils/propTypesTemplates";
import {useSelector} from "react-redux";

const IngredientDetails = () => {
    const statsTextStyle = 'text text_type_main-default text_color_inactive';
    const statsDigitsStyle = 'text text_type_digits-default text_color_inactive';

    const {
        image_large,
        name,
        calories,
        proteins,
        fat,
        carbohydrates
    } = useSelector(store => store.ingredientReducer.currentIngredient)
    return (
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
    )
}

Ingredients.PropTypes = {
    props: ingredientsPropTypes.isRequired
}

export default IngredientDetails;
