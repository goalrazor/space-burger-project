import React, {useEffect, useReducer} from "react";
import style from './feedIdPage.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from "../../services/hooks/hooks"
import {useParams} from "react-router-dom";
import {OrderIngredientsInfo} from "../../components/order-ingredients-info/orderIngredientsInfo";
import scrollerStyle from "../constructor-page/constructorPage.module.css";
import {formatDate} from "../../utils/utils";
import api from "../../api/Api";
import {TCard, TOrder} from "../../services/types";

type TFeedIdState = {
    countedIngredients: ReadonlyArray<TCard>,
    orderIngredients: Array<TCard>,
    price: number,
    order: TOrder
}

const feedIdInitState: TFeedIdState = {
    countedIngredients: [],
    orderIngredients: [],
    price: 0,
    order: {
        _id: "",
        createdAt: "",
        ingredients: [],
        name: "",
        number: 0,
        status: "",
        updatedAt: ""
    },
};


export const FeedIdPage = () => {
    const {id} = useParams<{ id: string }>()
    const [feedState, setFeedState] = useReducer((feedState: TFeedIdState, newFeedState: TFeedIdState) => ({...feedState, ...newFeedState}),
        feedIdInitState
    );
    useEffect(() => {
        async function getOrder() {
            await api.getOrderByNumber(id)
                .then(res => {
                    return setFeedState({
                        ...feedState,
                        order: res.orders[0] as TOrder
                    });
                })
        }

        getOrder();
    }, [])
    const ingredients: ReadonlyArray<TCard> = useSelector(store => store.ingredientReducer.ingredients) as ReadonlyArray<TCard>

    useEffect(() => {
        const getIngredients = () => {
            return feedState.order?.ingredients.map((item: string) => {
                    return ingredients.find(ingredient => {
                        return ingredient._id === item
                    })
                }
            ) as TCard[]
        }
        setFeedState({
            ...feedState,
            orderIngredients: getIngredients(),
            price: getIngredients().reduce((prevVal: any, item: { price: number; }) => prevVal + item?.price, 0)
        })
    }, [feedState.order, ingredients])

    useEffect(() => {
        if (feedState.orderIngredients && feedState.orderIngredients[0] !== undefined) {
            setFeedState({
                ...feedState,
                countedIngredients: getCountedItems(feedState.orderIngredients)
            })
        }
    }, [feedState.orderIngredients])

    const getCountedItems = (items: TCard[]) => {
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

        let result: TCard[] = []
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
        <> {feedState.order &&
            <div className={style.container}>
                <p className='text text_type_digits-default'>#{feedState.order.number}</p>
                <h1 className={`${style.name} text text_type_main-medium pt-10`}>{feedState.order.name}</h1>
                <p className={`${style.status} text text_type_main-default pt-3`}>
                    {feedState.order.status === 'done' ? 'Выполнен' : feedState.order.status === 'pending' ? 'Готовится' : feedState.order.status === 'created' ? 'Создан' : 'Выполнен'}
                </p>
                <h2 className={`${style.order} text text_type_main-medium pt-15`}>Состав:</h2>
                <div className={`${scrollerStyle.scroller} ${scrollerStyle.orderInfoScroller}`}>
                    {feedState.countedIngredients &&
                        <>
                            {feedState.countedIngredients.map((item: TCard & { count?: number | undefined; }) => {
                                return (
                                    <OrderIngredientsInfo key={item._id} ingredient={item}/>
                                )
                            })
                            }
                        </>
                    }
                </div>
                <div className={`${style.price} pb-10 mt-10`}>
                    <p className="text text_type_main-default text_color_inactive">{formatDate(feedState.order.createdAt)}</p>
                    {feedState.price && <div className={style.price}>
                        <p className='text text_type_digits-default pr-2'>{feedState.price}</p>
                        <CurrencyIcon type="primary"/>
                    </div>}
                </div>
            </div>
        }
        </>
    )
}
