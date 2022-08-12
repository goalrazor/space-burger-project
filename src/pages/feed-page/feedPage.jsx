import React, {useEffect} from "react";
import style from "../constructor-page/constructorPage.module.css";
import {Feed} from "../../components/feed/feed";
import {FeedBoard} from "../../components/feed-board/feedBoard";
import {useDispatch} from "react-redux";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START,} from "../../services/actions/webSocket";

export const FeedPage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START})
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED});
        }
    }, [dispatch])

    return (
        <section className={style.content}>
            <Feed/>
            <FeedBoard/>
        </section>
    )
}
