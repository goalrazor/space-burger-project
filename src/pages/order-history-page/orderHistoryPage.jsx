import React, {useEffect} from "react";
import style from "./historyPage.module.css";
import {History} from "../../components/history/history";
import {ProfileNav} from "../../components/profile-nav/profileNav";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/webSocket";
import {useDispatch} from "react-redux";
import {getCookie} from "../../utils/cookie";
import {WS_URL_AUTH} from "../../utils/constants";

export const OrderHistoryPage = () => {
    const dispatch = useDispatch()
    const token = getCookie("accessToken")

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: `${WS_URL_AUTH}?token=${token}`
        })
        // dispatch({
        //     type: WS_CONNECTION_START,
        //     payload: WS_URL_ALL
        // })
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED});
        }
    }, [])
    return (
        <section className={style.content}>
            <ProfileNav/>
            <History/>
        </section>
    )
}
