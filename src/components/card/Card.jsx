import style from './Card.module.css'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {cartPropTypes} from "../../utils/propTypesTemplates";
import PropTypes from "prop-types";

const Card = (props) => {

    const setCardState = () => {
        props.setModalShow({
            ...props,
            show: true
        });
    }

    return (
        <div className={`${style.dragIco} ${'mt-6 mb-10'}`}
             onClick={setCardState}>
            <Counter count={233} size="small"/>
            <img src={props.image} alt={props.name}/>
            <p className={`${style.price} ${'text text_type_digits-default mt-1 mb-1'}`}>
                {props.price}
                <CurrencyIcon type="primary"/>
            </p>
            <p className={`${style.name} ${'text text_type_main-default'}`}>
                {props.name}
            </p>
        </div>
    )
}

Card.propTypes = {
    props: cartPropTypes,
    setModalShow: PropTypes.func.isRequired
}

export default Card
