import React, {useEffect, useState} from "react";
import style from "./feedCard.module.css"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {v4 as uuidv4} from 'uuid';

export const FeedCard = ({order}) => {
    const {number, createdAt, name,} = order;
    const ingredients = useSelector(store => store.ingredientReducer.ingredients)
    const [imageToRender, setImageToRender] = useState([])
    const [groupedImages, setGroupedImages] = useState([])
    const [price, setPrice] = useState(0)

    const getOrderIngredients = () => {
        return order.ingredients.map(item => {
            return ingredients.find(ingredient => {
                return ingredient._id === item
            })
        })
    }

    const getDoubles = (allImages) => {
        return allImages.reduce(function (acc, el) {
            if (acc[el] || 0) {
                acc[el] = allImages[el.price]
            }
            return acc;
        }, {});
    }

    const getState = (orderIngredients) => {
        if (orderIngredients.length > 0) {
            const allImages = orderIngredients.map(item => {
                return item.image
            })
            setImageToRender(() => {
                return Array.from(new Set(allImages))
                    .sort()
                    .reverse()
                    .slice(0, 5)
                    .map(item => {
                        return {url: item, uuid: uuidv4()}
                    })
            })

            setGroupedImages(() => {
                return allImages.slice(5).map(item => {
                    return {url: item, uuid: uuidv4()}
                })
            })

            setPrice(() => {
                return orderIngredients.reduce((prevVal, item) => prevVal + item?.price, 0)
            })
        }
    }

    let orderIngredients = [];
    useEffect(() => {
        orderIngredients = getOrderIngredients()
        getState(orderIngredients);
    }, [order])


    return (
        <div className={style.feedCard}>
            <div className={style.feedCardHeader}>
                <p className="text text_type_digits-default">{`#${number}`}</p>
                <p className="text text_type_main-default text_color_inactive">{createdAt}</p>
            </div>
            <p className="text text_type_main-medium">{name}</p>
            <div className={style.contentContainer}>
                {imageToRender &&
                    <ul className={style.images}>
                        {groupedImages.length > 0 &&
                            <li className={style.imageRow} key={groupedImages[0].uuid}>
                                <div className={`${style.gradientRing}`}>
                                    <div className={`${style.background}`}>
                                        <img className={`${style.groupedImage} ${style.image} `}
                                             src={groupedImages[0].url}/>
                                        <p className={`text_type_digits-default ${style.groupedImageText}`}>{`+${groupedImages.length}`}</p>
                                    </div>
                                </div>
                            </li>}
                        {imageToRender.map((image) => {
                            return (
                                <li className={style.imageRow} key={image.uuid}>
                                    <div className={style.gradientRing}>
                                        <div className={style.background}>
                                            <img className={style.image} src={image.url}/>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                }
                <p className={`${style.price} ${'text text_type_digits-default mt-1 mb-1'}`}>
                    {price}
                    <CurrencyIcon type="primary"/>
                </p>
            </div>
        </div>
    )
}
