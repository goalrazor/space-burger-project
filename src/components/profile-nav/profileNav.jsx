import React from "react";
import style from "../../pages/profile-page/profilePage.module.css";
import {Link, useLocation} from "react-router-dom";
import {logout} from "../../services/actions/auth";
import {useDispatch} from "react-redux";
import {deleteCookie} from "../../utils/cookie";

export const ProfileNav = () => {
    const dispatch = useDispatch();
    const location = useLocation()

    const handleLogout = () => {
        dispatch(logout(localStorage.getItem("refreshToken")))
            .catch((err) => {
                console.error("Не удалось выполнить выход", err)
            })
        deleteCookie("accessToken")
        localStorage.removeItem('refreshToken');
    }

    return (
        <nav className={style.navigation}>
            <ul>
                <li className={style.listElement}>
                    <Link className={`${location.pathname === '/profile' ? 'text text_type_main-medium'
                        : 'text text_type_main-medium text_color_inactive'} ${style.link}`}
                          style={location.pathname === '/profile' ? {color: "#F2F2F3"} : {}}
                          to={"/profile"}>Профиль</Link>
                </li>
                <li className={style.listElement}>
                    <Link className={`${location.pathname === '/profile/orders' ? 'text text_type_main-medium'
                        : 'text text_type_main-medium text_color_inactive'} ${style.link}`}
                          style={location.pathname === '/profile/orders' ? {color: "#F2F2F3"} : {}}
                          to={"/profile/orders"}>История заказов</Link>
                </li>
                <li className={style.listElement}>
                    <Link to={"/login"} className={`text text_type_main-medium text_color_inactive ${style.link}`}
                          onClick={handleLogout}>Выход</Link>
                </li>
            </ul>
            <p className={"text text_type_main-small text_color_inactive mt-20"}>В этом разделе вы можете
                изменить свои персональные данные</p>
        </nav>
    )
}
