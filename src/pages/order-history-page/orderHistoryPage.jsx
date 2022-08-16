import React, {useEffect} from "react";
import style from "./historyPage.module.css";
import {History} from "../../components/history/history";
import {ProfileNav} from "../../components/profile-nav/profileNav";
import {WS_AUTH_CONNECTION_START, WS_CONNECTION_CLOSED} from "../../services/actions/webSocket";
import {useDispatch} from "react-redux";

export const OrderHistoryPage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type: WS_AUTH_CONNECTION_START})
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
