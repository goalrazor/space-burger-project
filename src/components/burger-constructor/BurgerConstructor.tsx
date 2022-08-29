import React, {useEffect} from 'react'
import ConstructorListElement from "../constructor-list-element/constructorListElement";
import container from '../burger-ingredients/BurgerIngredients.module.css'
import style from './BurgerConstructor.module.css'
import scroller from '../../pages/constructor-page/constructorPage.module.css'
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Total from "../total/Total";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {v4 as uuidv4} from 'uuid';
import {ADD_INGREDIENT, INCREASE_INGREDIENT_COUNT, MOVE_INGREDIENT} from "../../services/actions/burger-ingredients";
import {NavLink, useLocation} from "react-router-dom";
import {SET_CONSTRUCTOR_BUTTON_ENABLED} from "../../services/actions/burger-constructor-ingredients";
import {TCard} from "../../services/types";

const BurgerConstructor = () => {
    const data: ReadonlyArray<TCard> = useSelector<{ ingredientReducer: any }>(store => store.ingredientReducer.constructorIngredients) as ReadonlyArray<TCard>;
    //fixme
    const bun = data.filter(item => item.type === 'bun')
    const isButtonEnabled: boolean = useSelector<{ orderDetailsReducer: any }>(store => store.orderDetailsReducer.isOrderButtonEnabled) as boolean
    //fixme
    const dispatch = useDispatch();
    const location = useLocation()

    useEffect(() => {
        if (bun.length > 0 && data.filter(item => item.type !== 'bun').length > 0) {
            dispatch({
                type: SET_CONSTRUCTOR_BUTTON_ENABLED
            })
        }
    }, [data, bun, location, dispatch])

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop({props}: any) {
            //fixme подумать над any тут
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

    const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
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
                        {console.log}
                        {bun.length !== 0 ? <ConstructorListElement
                            {...bun[0]}
                            index={0}
                            position={'top'}
                            name={`${bun[0]?.name} (верх)`}
                            uuid={bun[0].uuid}
                        /> : ''}
                        <div className={`${scroller.scrollerConstructor} ${style.cardsScroller}`}>
                            {data.filter(item => item.type !== 'bun').map((item, index) => {
                                return (<ConstructorListElement
                                        key={item.uuid}
                                        {...item}
                                        index={index}
                                        moveCardHandler={moveCardHandler}
                                        uuid={item.uuid}
                                    />
                                )
                            })}
                        </div>
                        {bun.length !== 0 ? <ConstructorListElement
                            {...bun[0]}
                            position={'bottom'}
                            name={`${bun[0]?.name} (низ)`}
                            uuid={bun[0].uuid}
                            index={data.length}
                        /> : ''}
                    </div> :
                    ''}
            </ul>

            <div className={style.totalContainer}>
                <Total/>
                {isButtonEnabled ?
                    <NavLink className={isButtonEnabled ? style.activeButtonText : style.buttonText} to={{
                        pathname: `order`,
                        state: {background: location}
                    }}>
                        <Button type="primary" size="large" disabled={!isButtonEnabled}>
                            Оформить заказ
                        </Button>
                    </NavLink>
                    :
                    <Button type="primary" size="large" disabled={!isButtonEnabled}>
                        Оформить заказ
                    </Button>}
            </div>
        </section>
    )
}

export default BurgerConstructor;
