import React from "react";
import style from "./feedCard.module.css"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export const FeedCard = ({order}) => {
    const {number, createdAt, name,} = order;
    const mockedImgList = [
        "https://code.s3.yandex.net/react/code/bun-02.png",
        "https://code.s3.yandex.net/react/code/bun-02.png",
        "https://code.s3.yandex.net/react/code/bun-02.png",
        "https://code.s3.yandex.net/react/code/bun-02.png",
        "https://code.s3.yandex.net/react/code/bun-02.png",
    ]

    return (
        <div className={style.feedCard}>
            <div className={style.feedCardHeader}>
                <p className="text text_type_digits-default">{`#${number}`}</p>
                <p className="text text_type_main-default text_color_inactive">{createdAt}</p>
            </div>
            <p className="text text_type_main-medium">{name}</p>
            <div className={style.contentContainer}>
                {/*Тут нужен массив картинок. Брать их по id из общего списка ингредиентов. Пока мокаем данные todo*/}
                <ul className={style.images}>
                    {mockedImgList.map((image, index) => {
                        return (
                            <li>
                                <img className={style.image} src={image} key={index}/>
                            </li>
                        )
                    })}
                </ul>
                <p className={`${style.price} ${'text text_type_digits-default mt-1 mb-1'}`}>
                    {123456}
                    <CurrencyIcon type="primary"/>
                </p>
            </div>
        </div>
    )
}
