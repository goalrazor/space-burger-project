import React from "react";
import container from "./history.module.css";
import scrollerStyle from "../../pages/constructor-page/constructorPage.module.css";
import {OrderCards} from "../order-cards/orderCards";

export const History = ({orders}) => {
    return (
        <section className={container.container}>
            <div className={scrollerStyle.scroller}>
                <OrderCards orders={orders} parentPath={"/profile/orders"}/>
            </div>
        </section>
    )
}
