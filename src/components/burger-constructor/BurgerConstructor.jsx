import React from 'react'
import ConstructorListElement from "../constructor-list-element/constructorListElement";
import container from '../burger-ingredients/BurgerIngredients.module.css'
import style from './BurgerConstructor.module.css'
import scroller from '../../pages/constructorPage.module.css'
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Total from "../total/Total";
import {useDispatch, useSelector} from "react-redux";
import {setOrder} from "../../services/actions/burger-constructor-ingredients";
import {useDrop} from "react-dnd";
import {v4 as uuidv4} from 'uuid';
import {ADD_INGREDIENT, INCREASE_INGREDIENT_COUNT, MOVE_INGREDIENT} from "../../services/actions/burger-ingredients";

const BurgerConstructor = () => {
    const data = useSelector(store => store.ingredientReducer.constructorIngredients);
    const bun = data.filter(item => item.type === 'bun')
    const dispatch = useDispatch();

    const submitOrderOnClickHandler = () => {
        if (bun.length > 0 && data.filter(item => item.type !== 'bun').length > 0) {
            dispatch(setOrder({
                ingredients: data.map((item) => {
                    return item._id
                })
            }))
        } else {
            console.log("Неверный состав заказа")
            alert("Неверный состав заказа. Пожалуйста, выберите булку и хотя бы один ингредиент")
        }
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop({props}) {
            dispatch({
                type: ADD_INGREDIENT,
                payload: {...props, uuid: uuidv4()}
            })
            dispatch({
                type: INCREASE_INGREDIENT_COUNT,
                ingredient: props
            })
        },
    });

    const moveCardHandler = (dragIndex, hoverIndex) => {
        const dragItem = data[dragIndex]

        if (dragItem) {
            dispatch({
                type: MOVE_INGREDIENT,
                hoverIndex: hoverIndex,
                dragIndex: dragIndex
            })
        }
    }

    return (
        <section className={container.container} ref={dropTarget}>
            <ul className={style.cardsContainer}>
                {data.length !== 0 ?
                    <div className={style.cardsScrollerContainer}>
                        {bun.length !== 0 ? <ConstructorListElement
                            {...bun[0]}
                            type={'top'}
                            name={`${bun[0]?.name} (верх)`}
                        /> : ''}
                        <div className={`${scroller.scrollerConstructor} ${style.cardsScroller}`}>
                            {data.filter(item => item.type !== 'bun').map((item, index) => {
                                return (<ConstructorListElement
                                        key={item.uuid}
                                        {...item}
                                        type={''}
                                        index={index}
                                        moveCardHandler={moveCardHandler}
                                    />
                                )
                            })}
                        </div>
                        {bun.length !== 0 ? <ConstructorListElement
                            {...bun[0]}
                            type={'bottom'}
                            name={`${bun[0]?.name} (низ)`}
                        /> : ''}
                    </div> :
                    ''}
            </ul>

            <div className={style.totalContainer}>
                <Total/>
                <div onClick={submitOrderOnClickHandler}>
                    <Button type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default BurgerConstructor;
