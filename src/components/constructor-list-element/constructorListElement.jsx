import style from "../burger-constructor/BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {cartPropTypes} from "../../utils/propTypesTemplates";
import PropTypes from "prop-types";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DECREASE_INGREDIENT_COUNT, DELETE_INGREDIENT, TOTAL_PRICE} from "../../services/actions/burger-ingredients";
import {useDrag, useDrop} from "react-dnd";

const ConstructorListElement = ({type, name, price, image, uuid, _id, index, moveCardHandler}) => {
    const burgerConstructorIngredientsLength = useSelector(store => store.ingredientReducer.constructorIngredients.filter(item => item.type !== 'bun').length)
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch({
                type: TOTAL_PRICE,
            })
        }, [dispatch, uuid]
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
        dispatch({
            type: TOTAL_PRICE,
        })
    }

    const [{isDragging}, dragRef] = useDrag({
        type: 'constructor-ingredient',
        item: {index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1

    const [, dropRef] = useDrop({
        accept: 'constructor-ingredient',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCardHandler(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const ref = useRef(null)
    dragRef(dropRef(ref));

    return (
        <div className={style.constructorListContainer} style={{opacity}} ref={ref}>
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
