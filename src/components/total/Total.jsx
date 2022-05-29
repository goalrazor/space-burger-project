import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import style from '../card/Card.module.css'

const Total = ({price}) => {
    return (
        <>
            <p className={`${style.price} ${'text text_type_digits-default mt-1 mb-1'}`}>
                {price}
                <CurrencyIcon type="primary"/>
            </p>
        </>
    )
}

export default Total;
