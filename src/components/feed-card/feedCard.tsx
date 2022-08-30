import React, {FC, useEffect, useRef, useState} from "react";
import style from "./feedCard.module.css"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "../../services/hooks/hooks";
import {v4 as uuidv4} from 'uuid';
import {formatDate} from "../../utils/utils";
import {TCard, TOrder} from "../../services/types";

interface IIngredientImagesProps {
    images: ReadonlyArray<{ url: string, uuid?: string }>
    grouped?: boolean
}

export const IngredientImage: FC<IIngredientImagesProps> = ({images, grouped}) => {
    return (
        <div className={`${style.gradientRing}`}>
            <div className={`${style.background}`}>
                <img className={grouped ? `${style.groupedImage} ${style.image}` : `${style.image}`}
                     src={images[0]?.url}
                     alt={""}
                />
                {grouped &&
                    <p className={`text_type_digits-default ${style.groupedImageText}`}>{`+${images.length}`}</p>}
            </div>
        </div>
    )
}

interface IImages {
    url: string,
    uuid: string
}

interface IFeedCardProps {
    order: TOrder
}

export const FeedCard: FC<IFeedCardProps> = ({order}) => {
    const {number, createdAt, name,} = order;
    const allIngredients = useSelector(store => store.ingredientReducer.ingredients)
    const [imageToRender, setImageToRender] = useState<ReadonlyArray<IImages>>([])
    const [groupedImages, setGroupedImages] = useState<ReadonlyArray<IImages>>([])
    const [price, setPrice] = useState(0)

    const getState = (orderIngredients: ReadonlyArray<TCard>) => {
        if (orderIngredients && orderIngredients.length > 0) {
            const allImages = orderIngredients.map(item => {
                return item?.image
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

    const orderIngredients = useRef<ReadonlyArray<TCard>>()
    useEffect(() => {
        orderIngredients.current = order.ingredients?.map(item => {
            return allIngredients.find((ingredient: { _id: string; }) => {
                return ingredient._id === item
            })
        }) as ReadonlyArray<TCard>;
        getState(orderIngredients.current);
    }, [order, allIngredients])

    return (
        <div className={style.feedCard}>
            <div className={style.feedCardHeader}>
                <p className="text text_type_digits-default">{`#${number}`}</p>
                <p className="text text_type_main-default text_color_inactive">{formatDate(createdAt)}</p>
            </div>
            <p className="text text_type_main-medium">{name}</p>
            <div className={style.contentContainer}>
                {imageToRender &&
                    <ul className={style.images}>
                        {groupedImages.length > 0 &&
                            <li className={style.imageRow} key={groupedImages[0].uuid}>
                                <IngredientImage images={groupedImages} grouped={true}/>
                            </li>}
                        {imageToRender.map((image) => {
                            const arrForImages: Array<IImages> = [];
                            arrForImages.push(image)
                            return (
                                <li className={style.imageRow} key={image.uuid}>
                                    <IngredientImage images={arrForImages}/>
                                </li>
                            )
                        })}
                    </ul>
                }
                <p className={`${style.price} text text_type_digits-default mt-1 mb-1`}>
                    {price}
                    <CurrencyIcon type="primary"/>
                </p>
            </div>
        </div>
    )
}
