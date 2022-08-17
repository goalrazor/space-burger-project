import React, {useEffect, useState} from "react";
import style from './feedIdPage.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {useParams, useRouteMatch} from "react-router-dom";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/webSocket";
import {OrderIngredientsInfo} from "../../components/order-ingredients-info/orderIngredientsInfo";
import scrollerStyle from "../constructor-page/constructorPage.module.css";
import {formatDate} from "../../utils/utils";
import {getCookie} from "../../utils/cookie";
import {WS_URL_ALL, WS_URL_AUTH} from "../../utils/constants";

export const FeedIdPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const orders = useSelector(store => store.wsReducer.orders)
    const [order, setOrder] = useState(null)
    const [orderIngredients, setOrderIngredients] = useState([])
    const [price, setPrice] = useState(0)
    let match = useRouteMatch();
    const profilePath = '/profile/orders/:id';
    const token = getCookie("accessToken")

    useEffect(() => {
        if (!order) {
            match.path === profilePath ?
                dispatch({
                    type: WS_CONNECTION_START,
                    payload: `${WS_URL_AUTH}?token=${token}`
                }) :
                dispatch({
                    type: WS_CONNECTION_START,
                    payload: WS_URL_ALL
                })
        }
        setOrder(orders?.find(item => item._id === id))
        return () => {
            dispatch({
                type: WS_CONNECTION_CLOSED
            })
        }
    }, [])
    const ingredients = useSelector(store => store.ingredientReducer.ingredients)

    useEffect(() => {
        setOrderIngredients(
            order?.ingredients.map(item => {
                return ingredients.find(ingredient => {
                    return ingredient._id === item
                })
            })
        )
        setPrice(() => {
            return orderIngredients?.reduce((prevVal, item) => prevVal + item?.price, 0)
        })
    }, [order])

    const getCountedItems = (items) => {
        let count = 1;
        const countedItems = items?.sort().map((current, index) => {
            if (current.type === 'bun') {
                return {...current, count: 2}
            }
            if (items[index + 1] && items[index + 1]._id === current._id) {
                count++
                return {...current, count: count}
            }
            count = 1;
            return {...current, count: count}
        })

        let result = []
        Array.from(new Set(items)).forEach(item => {
            const filteredIds = countedItems.filter(current => {
                if (item._id === current._id) {
                    return item
                }
            })

            const max = filteredIds.reduce((acc, curr) => {
                if (acc.count > curr.count) {
                    return acc
                } else {
                    return curr
                }
            });
            result.push(max)
        })
        return result
    }

    return (
        <> {order &&
            <div className={style.container}>
                <p className='text text_type_digits-default'>#{order.number}</p>
                <h1 className={`${style.name} text text_type_main-medium pt-10`}>{order.name}</h1>
                <p className={`${style.status} text text_type_main-default pt-3`}>
                    {order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : 'Выполнен'}
                </p>
                <h2 className={`${style.order} text text_type_main-medium pt-15`}>Состав:</h2>
                <div className={`${scrollerStyle.scroller} ${scrollerStyle.orderInfoScroller}`}>
                    {orderIngredients &&
                        <>
                            {getCountedItems(orderIngredients).map(item => {
                                return (
                                    <OrderIngredientsInfo key={item._id} ingredient={item}/>
                                )
                            })
                            }
                        </>
                    }
                </div>
                <div className={`${style.price} pb-10 mt-10`}>
                    <p className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</p>
                    {price && <div className={style.price}>
                        <p className='text text_type_digits-default pr-2'>{price}</p>
                        <CurrencyIcon type="primary"/>
                    </div>}
                </div>
            </div>
        }
        </>
    )
}
