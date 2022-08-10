import React from "react";
import style from "../constructor-page/constructorPage.module.css";
import {Feed} from "../../components/feed/feed";
import {FeedBoard} from "../../components/feed-board/feedBoard";

export const FeedPage = () => {
    const mockData = {
        "success": true,
        "orders": [
            {
                "ingredients": [
                    "60d3463f7034a000269f45e7",
                    "60d3463f7034a000269f45e9",
                    "60d3463f7034a000269f45e8",
                    "60d3463f7034a000269f45ea"
                ],
                "_id": "jhgfe345",
                "name": "Space флюоресцентный бургер",
                "status": "done",
                "number": 1244,
                "createdAt": "2021-06-23T14:43:22.587Z",
                "updatedAt": "2021-06-23T14:43:22.603Z"
            },
            {
                "ingredients": [
                    "60d3463f7034a000269f45e7",
                    "60d3463f7034a000269f45e9",
                    "60d3463f7034a000269f45e8",
                    "60d3463f7034a000269f45ea"
                ],
                "_id": "123456",
                "name": "Space антарианский традиционный-галактический флюоресцентный бургер",
                "status": "pending",
                "number": 12456765,
                "createdAt": "2021-06-23T14:43:22.587Z",
                "updatedAt": "2021-06-23T14:43:22.603Z"
            },
            {
                "ingredients": [
                    "60d3463f7034a000269f45e7",
                    "60d3463f7034a000269f45e9",
                    "60d3463f7034a000269f45e8",
                    "60d3463f7034a000269f45ea"
                ],
                "_id": "65432",
                "status": "created",
                "name": "Space антарианский традиционный бургер",
                "number": 213456,
                "createdAt": "2021-06-23T14:43:22.587Z",
                "updatedAt": "2021-06-23T14:43:22.603Z"
            }
        ],
        "total": 3,
        "totalToday": 3
    }

    return (
        <section className={style.content}>
            <Feed orders={mockData.orders}/>
            <FeedBoard orders={mockData.orders} total={mockData.total} totalToday={mockData.totalToday}/>
        </section>
    )
}
