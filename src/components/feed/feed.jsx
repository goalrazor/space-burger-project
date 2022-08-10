import React from "react";
import container from "../burger-ingredients/BurgerIngredients.module.css";
import style from "./feed.module.css";
import scrollerStyle from "../../pages/constructor-page/constructorPage.module.css";
import {Link} from "react-router-dom";
import {FeedCard} from "../feed-card/feedCard";

export const Feed = ({orders}) => {
    return (
        <section className={container.container}>
            <h1 className={`${'mt-10 mb-5 text text_type_main-large'}`}>
                Лента заказов
            </h1>
            <div className={scrollerStyle.scroller}>
                <ul className={style.list}>
                    {orders.map(item => {
                        return (
                            <Link to={`/feed/${item._id}`} key={item._id} className={style.link}>
                                <li>
                                    <FeedCard order={item}/>
                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}
