import React from "react";
import style from "../feed/feed.module.css";
import {NavLink, useLocation} from "react-router-dom";
import {FeedCard} from "../feed-card/feedCard";
import PropTypes from "prop-types";

export const OrderCards = ({orders, parentPath}) => {
    const location = useLocation()
    return (
        <ul className={style.listElement}>
            {orders.map(item => {
                return (
                    <NavLink to={{
                        pathname: `${parentPath}/${item.number}`,
                        state: {background: location}
                    }}
                             key={item._id} className={style.link}>
                        <li>
                            <FeedCard order={item}/>
                        </li>
                    </NavLink>
                )
            })}
        </ul>
    )
}

OrderCards.protoTypes = {
    orders: PropTypes.object.isRequired,
    parentPath: PropTypes.string.isRequired
}
