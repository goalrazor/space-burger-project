import React, {useEffect} from "react";
import style from "../constructor-page/constructorPage.module.css";
import {Feed} from "../../components/feed/feed";
import {FeedBoard} from "../../components/feed-board/feedBoard";
import {useDispatch} from "../../services/hooks/hooks";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START,} from "../../services/actions/webSocket";
import {WS_URL_ALL} from "../../utils/constants";

export const FeedPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: WS_URL_ALL
        })
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED});
        }
    }, [])

    return (
        <section className={style.content}>
            <Feed/>
            <FeedBoard/>
        </section>
    )
}
