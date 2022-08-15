import React from "react";
import style from "../feed/feed.module.css";
import {Link} from "react-router-dom";
import {FeedCard} from "../feed-card/feedCard";

export const OrderCards = ({orders, parentPath}) => {
    return (
        <ul className={style.listElement}>
            {orders.map(item => {
                return (
                    <Link to={`${parentPath}/${item._id}`} key={item._id} className={style.link}>
                        <li>
                            <FeedCard order={item}/>
                        </li>
                    </Link>
                )
            })}
        </ul>
    )
}
