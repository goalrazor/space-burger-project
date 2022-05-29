import style from './Card.module.css'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {cartPropTypes} from "../../utils/propTypesTemplates";

const Card = ({image, price, name}) => {
    return (
        <div className={`${style.dragIco} ${'mt-6 mb-10'}`}>
            <Counter count={233} size="small"/>
            <img src={image} alt={name}/>
            <p className={`${style.price} ${'text text_type_digits-default mt-1 mb-1'}`}>
                {price}
                <CurrencyIcon type="primary"/>
            </p>
            <p className={`${style.name} ${'text text_type_main-default'}`}>
                {name}
            </p>
        </div>
    )
}

Card.propTypes = {
    cartPropTypes
}

export default Card
