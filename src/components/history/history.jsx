import React from "react";
import container from "./history.module.css";
import scrollerStyle from "../../pages/constructor-page/constructorPage.module.css";
import {OrderCards} from "../order-cards/orderCards";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import style from "../form/form.module.css";

export const History = () => {
    const {orders} = useSelector(store => store.wsReducer);

    return (
        <section className={container.container}>
            <div className={scrollerStyle.scroller}>
                {orders.length > 0 ?
                    <OrderCards orders={orders} parentPath={"/profile/orders"}/>
                    :
                    <p className={`text text_type_main-default ${style.text}`}>У вас нет ни одного заказа. Чтобы сделать
                        заказ, перейдите в <Link className={style.link} to={'/'}>конструктор</Link> и сделайте заказ</p>
                }
            </div>
        </section>
    )
}
