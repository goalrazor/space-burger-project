import React from "react";
import style from "./historyPage.module.css";
import {orders} from "../../utils/mockData";
import {History} from "../../components/history/history";
import {ProfileNav} from "../../components/profile-nav/profileNav";

export const OrderHistoryPage = () => {
    return (
        <section className={style.content}>
            <ProfileNav/>
            <History orders={orders.orders}/>
        </section>
    )
}
