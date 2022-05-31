import ingredientDetailsStyle from './IngredientDetails.module.css'

const IngredientDetails = (props) => {
    const statsTextStyle = 'text text_type_main-default text_color_inactive';
    const statsDigitsStyle = 'text text_type_digits-default text_color_inactive';
    return (
        <div className={ingredientDetailsStyle.ingredientDetailsContainer}>
            <img
                className={ingredientDetailsStyle.image}
                src={props.props.image_large}
                alt={props.props.name}/>
            <p
                className={'text text_type_main-medium mt-4 mb-8'}>
                {props.props.name}
            </p>
            <ul className={ingredientDetailsStyle.stats}>
                <li className={ingredientDetailsStyle.stat}>
                    <p className={statsTextStyle}>
                        Калории,ккал
                    </p>
                    <p className={statsDigitsStyle}>
                        {props.props.calories}
                    </p>
                </li>
                <li className={ingredientDetailsStyle.stat}>
                    <p className={statsTextStyle}>
                        Белки, г
                    </p>
                    <p className={statsDigitsStyle}>
                        {props.props.proteins}
                    </p>
                </li>
                <li className={ingredientDetailsStyle.stat}>
                    <p className={statsTextStyle}>
                        Жиры, г
                    </p>
                    <p className={statsDigitsStyle}>
                        {props.props.fat}
                    </p>
                </li>
                <li className={ingredientDetailsStyle.stat}>
                    <p className={statsTextStyle}>
                        Углеводы, г
                    </p>
                    <p className={statsDigitsStyle}>
                        {props.props.carbohydrates}
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default IngredientDetails;
