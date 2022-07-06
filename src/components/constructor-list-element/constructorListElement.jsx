import style from "../burger-constructor/BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {cartPropTypes} from "../../utils/propTypesTemplates";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TOTAL_PRICE} from "../../services/actions/burger-constructor-ingredients";
import {DECREASE_INGREDIENT_COUNT, DELETE_INGREDIENT} from "../../services/actions/burger-ingredients";

const ConstructorListElement = ({type, name, price, image, uuid, _id}) => {
    const totalPrice = useSelector(store => store.priceReducer.totalPrice)
    const burgerConstructorIngredientsLength = useSelector(store => store.ingredientReducer.constructorIngredients.filter(item => item.type !== 'bun').length)
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch({
                type: TOTAL_PRICE,
                price: price ? price : totalPrice
            })
        }, [dispatch]
    )

    const deleteIngredient = () => {
        dispatch({
            type: DELETE_INGREDIENT,
            uuid: uuid
        })
        dispatch({
            type: DECREASE_INGREDIENT_COUNT,
            _id: _id
        })
    }

    return (
        <div className={style.constructorListContainer}>
            <div className={style.dragIco}>
                {type === '' && burgerConstructorIngredientsLength > 1 ? <DragIcon type="primary"/> : ''}
            </div>
            <ConstructorElement
                type={type}
                isLocked={!!type}
                text={name}
                price={price}
                thumbnail={image}
                handleClose={() => deleteIngredient(uuid)}
            />
        </div>
    )
}

ConstructorListElement.propTypes = {
    type: PropTypes.string.isRequired,
    cartPropTypes
}

export default ConstructorListElement;
