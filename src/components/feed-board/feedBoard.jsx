import React from "react";
import container from "../burger-ingredients/BurgerIngredients.module.css";
import style from "./feedBoard.module.css";

export const FeedBoard = ({orders, total, totalToday}) => {
    return (
        <section className={container.container}>
            <div className={style.container}>
                <div className={style.containerRow}>
                    <div className={style.numsContainer}>
                        <p className="text text_type_main-medium pb-6">Готовы:</p>
                        <ul className={style.list}>
                            {orders.map(item => {
                                if (item.status === 'done') {
                                    return (
                                        <li className={`text text_type_digits-default text_color_success ${style.nums}`}
                                            key={item.number}>
                                            {item.number}
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                    <div>
                        <p className="text text_type_main-medium pb-6">В работе:</p>
                        <ul>
                            {orders.map(item => {
                                if (item.status === 'pending') {
                                    return (
                                        <li className="text text_type_digits-default" key={item.number}>
                                            {item.number}
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                </div>
                <div>
                    <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
                    <p className={`text text_type_digits-large`}>{total}</p>
                </div>
                <div>
                    <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
                    <p className={`text text_type_digits-large`}>{totalToday}</p>
                </div>
            </div>
        </section>
    )
}
