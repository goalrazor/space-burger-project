import style from "../burger-constructor/BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {FC, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "../../services/hooks/hooks";
import {DECREASE_INGREDIENT_COUNT, DELETE_INGREDIENT, TOTAL_PRICE} from "../../services/actions/burger-ingredients";
import {useDrag, useDrop} from "react-dnd";
import {TCard} from "../../services/types";

const ConstructorListElement: FC<TCard & {
    index: number,
    position?: 'top' | 'bottom'
    moveCardHandler?: (dragIndex: number, hoverIndex: number) => void
}>
    = ({position, name, price, image, uuid, _id, index, moveCardHandler}) => {
    const burgerConstructorIngredientsLength = useSelector(store => store.ingredientReducer.constructorIngredients.filter((item) => item.type !== 'bun').length)
    const dispatch = useDispatch();

    useEffect(() => {
            dispatch({
                type: TOTAL_PRICE,
            })
        }, [dispatch, uuid]
    )

    const deleteIngredient = (uuid: string | undefined) => {
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
        hover(item: any, monitor) {
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
            const hoverClientY: number = clientOffset?.y as number - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            if (moveCardHandler) {
                moveCardHandler(dragIndex, hoverIndex);
            }
            item.index = hoverIndex;
        },
    });

    const ref = useRef<HTMLDivElement>(null)
    dragRef(dropRef(ref));

    return (
        <div className={style.constructorListContainer} style={{opacity}} ref={ref}>
            <div className={style.dragIco}>
                {!position && burgerConstructorIngredientsLength > 1 ? <DragIcon type="primary"/> : ''}
            </div>
            <ConstructorElement
                type={position}
                isLocked={!!position}
                text={name}
                price={price}
                thumbnail={image}
                handleClose={() => deleteIngredient(uuid)}
            />
        </div>
    )
}

export default ConstructorListElement;
