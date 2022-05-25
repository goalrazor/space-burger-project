import style from './Card.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const Card = ({image, price, name}) => {
    return (
        <div className={`${style.card} ${'mt-6 mb-10'}`}>
            <img src={image} alt={name}/>
            <p style={{
                display: 'flex',
                justifyContent: 'center',
            }}
               className={'text text_type_digits-default mt-1 mb-1'}>
                {price}
                <CurrencyIcon type="primary"/>
            </p>
            <p style={{
                margin: 'auto',
                textAlign: 'center'
            }}
               className={'text text_type_main-default'}>
                {name}
            </p>
        </div>
    )
}

export default Card
