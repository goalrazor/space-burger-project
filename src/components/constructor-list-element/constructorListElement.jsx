import style from "../burger-constructor/BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {cartPropTypes} from "../../utils/propTypesTemplates";
import PropTypes from "prop-types";
import {useContext, useEffect} from "react";
import PriceContext from "../../context/price-context";

let total = 0;

const ConstructorListElement = ({type, name, price, image}) => {
    const {totalPriceDispatch} = useContext(PriceContext);

    useEffect(() => {
            total += price;
            totalPriceDispatch({type: 'set', payload: total})
        }, []
    )

    return (
        <div className={style.constructorListContainer}>
            <div className={style.dragIco}>
                {!type && <DragIcon type="primary"/>}
            </div>
            <ConstructorElement
                type={type}
                isLocked={!!type}
                text={name}
                price={price}
                thumbnail={image}
            />
        </div>
    )
}

ConstructorListElement.propTypes = {
    type: PropTypes.string.isRequired,
    cartPropTypes
}

export default ConstructorListElement;
