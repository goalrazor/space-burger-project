import React from "react";
import container from "./history.module.css";
import scrollerStyle from "../../pages/constructor-page/constructorPage.module.css";
import {OrderCards} from "../order-cards/orderCards";
import {useSelector} from "../../services/hooks/hooks";
import {Link} from "react-router-dom";
import style from "../form/form.module.css";
import {TOrder} from "../../services/types";

export const History = () => {
    const orders: Array<TOrder> = useSelector(store => store.wsReducer.orders) as Array<TOrder>;
    //fixme

    return (
        <section className={container.container}>
            <div className={scrollerStyle.scroller}>
                {orders ?
                    <OrderCards orders={orders.reverse()} parentPath={"/profile/orders"}/>
                    :
                    <p className={`text text_type_main-default ${style.text}`}>У вас нет ни одного заказа. Чтобы сделать
                        заказ, перейдите в <Link className={style.link} to={'/'}>конструктор</Link> и сделайте заказ</p>
                }
            </div>
        </section>
    )
}
