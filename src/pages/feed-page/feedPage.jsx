import React from "react";
import style from "../constructor-page/constructorPage.module.css";
import {Feed} from "../../components/feed/feed";
import {FeedBoard} from "../../components/feed-board/feedBoard";
import {orders} from "../../utils/mockData";

export const FeedPage = () => {
    return (
        <section className={style.content}>
            <Feed orders={orders.orders}/>
            <FeedBoard orders={orders.orders} total={orders.total} totalToday={orders.totalToday}/>
        </section>
    )
}
