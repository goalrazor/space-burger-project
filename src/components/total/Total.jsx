import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import style from '../card/Card.module.css'
import {useSelector} from "react-redux";

const Total = () => {
    const totalPrice = useSelector(store => store.ingredientReducer.totalPrice)
    return (
        <>
            <p className={`${style.price} ${'text text_type_digits-default mt-1 mb-1'}`}>
                {totalPrice}
                <CurrencyIcon type="primary"/>
            </p>
        </>
    )
}

export default Total;
