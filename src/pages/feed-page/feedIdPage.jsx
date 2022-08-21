import React, {useEffect, useState} from "react";
import style from './feedIdPage.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {OrderIngredientsInfo} from "../../components/order-ingredients-info/orderIngredientsInfo";
import scrollerStyle from "../constructor-page/constructorPage.module.css";
import {formatDate} from "../../utils/utils";
import api from "../../api/Api";

export const FeedIdPage = () => {
    const {id} = useParams()
    const [order, setOrder] = useState(null)
    const [orderIngredients, setOrderIngredients] = useState(undefined)
    const [countedIngredients, setCountedIngredients] = useState(undefined)
    const [price, setPrice] = useState(0)

    useEffect(() => {
        async function getOrder() {
            await api.getOrderByNumber(id)
                .then(res => {
                    setOrder(res.orders[0])
                })
        }

        getOrder();
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
    }, [order, ingredients])

    useEffect(() => {
        console.log(orderIngredients)
        if (orderIngredients && orderIngredients[0] !== undefined) {
            setCountedIngredients(
                getCountedItems(orderIngredients)
            )
        }
    }, [orderIngredients])

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
                    {countedIngredients &&
                        <>
                            {countedIngredients.map(item => {
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
