import React, {FC} from "react";
import style from "../feed/feed.module.css";
import {NavLink, useLocation} from "react-router-dom";
import {FeedCard} from "../feed-card/feedCard";
import {TOrder} from "../../services/types";

interface IOrders {
    orders: ReadonlyArray<TOrder>
}

export const OrderCards: FC<IOrders & { parentPath: string }> = ({orders, parentPath}) => {
    const location = useLocation()
    return (
        <ul className={style.listElement}>
            {orders.map(item => {
                return (
                    <NavLink to={{
                        pathname: `${parentPath}/${item.order.number}`,
                        state: {background: location}
                    }}
                             key={item.order._id} className={style.link}>
                        <li>
                            <FeedCard order={item.order}/>
                        </li>
                    </NavLink>
                )
            })}
        </ul>
    )
}
