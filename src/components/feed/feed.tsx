import React from "react";
import container from "../burger-ingredients/BurgerIngredients.module.css";
import scrollerStyle from "../../pages/constructor-page/constructorPage.module.css";
import {OrderCards} from "../order-cards/orderCards";
import {useSelector} from "react-redux";
import {TOrder} from "../../services/types";

export const Feed = () => {
    const orders: ReadonlyArray<TOrder> = useSelector<{ wsReducer: any }>(store => store.wsReducer.orders) as ReadonlyArray<TOrder>;
    //fixme

    return (
        <section className={container.container}>
            <h1 className={`mt-10 mb-5 text text_type_main-large`}>
                Лента заказов
            </h1>
            <div className={`${scrollerStyle.scroller}`}>
                <OrderCards orders={orders} parentPath={"/feed"}/>
            </div>
        </section>
    )
}
