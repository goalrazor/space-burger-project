import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const Total = ({price}: { price: string }) => {
    return (
        <>
            <p style={{
                display: 'flex',
                justifyContent: 'center',
            }}
               className={'text text_type_digits-default mt-1 mb-1'}>
                {price}
                <CurrencyIcon type="primary"/>
            </p>
        </>
    )
}

export default Total;
