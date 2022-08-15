import React from "react";
import container from "../burger-ingredients/BurgerIngredients.module.css";
import scrollerStyle from "../../pages/constructor-page/constructorPage.module.css";
import {OrderCards} from "../order-cards/orderCards";
import {useSelector} from "react-redux";

export const Feed = () => {
    const orders = useSelector(store => store.wsReducer.orders);

    return (
        <section className={container.container}>
            <h1 className={`${'mt-10 mb-5 text text_type_main-large'}`}>
                Лента заказов
            </h1>
            <div className={`${scrollerStyle.scroller}`}>
                <OrderCards orders={orders} parentPath={"/feed"}/>
            </div>
        </section>
    )
}
