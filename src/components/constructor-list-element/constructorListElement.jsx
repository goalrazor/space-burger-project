import style from "../burger-constructor/BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {cartPropTypes} from "../../utils/propTypesTemplates";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TOTAL_PRICE} from "../../services/actions/burger-constructor-ingredients";
import {DECREASE_INGREDIENT_COUNT, DELETE_INGREDIENT} from "../../services/actions/burger-ingredients";

const ConstructorListElement = ({type, name, price, image, index}) => {
    const totalPrice = useSelector(store => store.priceReducer.totalPrice)
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch({
                type: TOTAL_PRICE,
                price: price ? price : totalPrice
            })
        }, [dispatch]
    )

    const deleteIngredient = (index) => {
        dispatch({
            type: DELETE_INGREDIENT,
            index: index
        })
        dispatch({
            type: DECREASE_INGREDIENT_COUNT,
        })
    }

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
                handleClose={() => deleteIngredient(index + 1)}
            />
        </div>
    )
}

ConstructorListElement.propTypes = {
    type: PropTypes.string.isRequired,
    cartPropTypes
}

export default ConstructorListElement;
