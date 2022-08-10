import React, {useCallback, useEffect, useState} from 'react'
import formStyle from "../../components/form/form.module.css";
import style from "./profilePage.module.css"
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProfileInfo, logout, refreshToken, setProfileInfo} from "../../services/actions/auth";
import {getCookie} from "../../utils/cookie";
import {useForm} from "../../services/hooks/useForm";

export function ProfilePage() {
    const {formData, handleInputChange, setFormData} = useForm({name: "", email: "", password: ""});
    const {name, email, password} = formData;
    const [isEditButtonsShown, setEditButtonShown] = useState({isButtonsShown: false, inputActive: false})
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(store => store.authReducer.user)
    const location = useLocation()

    useEffect(() => {
        async function checkUser() {
            await dispatch(refreshToken(localStorage.getItem("refreshToken")))
                .then(() => dispatch(getProfileInfo(getCookie("accessToken"))))
                    .then((res) => {
                        setFormData({
                                name: res.user.name,
                                email: res.user.email,
                                password: ''
                            }
                        )
                    })
                    .catch(() => {
                        history.replace("/login")
                    })
            }

            checkUser();
        // eslint-disable-next-line
        }, []
    )

    const toggleButtonsShown = useCallback(() => {
            setEditButtonShown({
                isButtonsShown: !isEditButtonsShown.isButtonsShown,
                inputActive: !isEditButtonsShown.inputActive
            })
        }, [isEditButtonsShown]
    )

    const submitProfileChange = useCallback(
        async (e) => {
            e.preventDefault()
            await dispatch(refreshToken(localStorage.getItem("refreshToken")))
                .then(() => {
                    if (name !== user.name) {
                        dispatch(setProfileInfo(getCookie("accessToken"), {name: name}))
                    }
                    if (email !== user.email) {
                        dispatch(setProfileInfo(getCookie("accessToken"), {email: email}))
                    }
                })
                .catch((err) => {
                    console.error(err)
                    history.replace("/login")
                })
        }, [formData, dispatch, user, history])


    const cancelProfileChange = useCallback(
        () => {
            setFormData({
                name: user.name,
                email: user.email
            })
            toggleButtonsShown()
        }, [user, toggleButtonsShown])

    const handleLogout = () => {
        dispatch(logout(localStorage.getItem("refreshToken")))
            .catch((err) => {
                console.error("Не удалось выполнить выход", err)
            })
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('refreshToken');
    }

    return (
        <div className={formStyle.formContainer}>
            <nav className={style.navigation}>
                <ul className={style.list}>
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
            {name &&
                <form className={formStyle.form} onSubmit={submitProfileChange}>
                    <div className={`mt-6 ${formStyle.input}`}>
                        <Input
                            type={"text"}
                            placeholder={"Имя"}
                            value={name}
                            name={"name"}
                            onChange={handleInputChange}
                            icon={"EditIcon"}
                            onIconClick={toggleButtonsShown}
                            disabled={!isEditButtonsShown.inputActive}
                        />
                        <Input
                            type={"email"}
                            placeholder={"Логин"}
                            value={email}
                            name={"email"}
                            onChange={handleInputChange}
                            icon={"EditIcon"}
                            onIconClick={toggleButtonsShown}
                            disabled={!isEditButtonsShown.inputActive}
                        />
                        <Input
                            type={"text"}
                            placeholder={"Пароль"}
                            value={password}
                            name={"password"}
                            onChange={handleInputChange}
                            icon={"EditIcon"}
                            onIconClick={toggleButtonsShown}
                            disabled={!isEditButtonsShown.inputActive}
                        />
                    </div>
                    {isEditButtonsShown.isButtonsShown &&
                        <div>
                            <Button onClick={submitProfileChange}>
                                Сохранить
                            </Button>
                            <Button onClick={cancelProfileChange}>
                                Отмена
                            </Button>
                        </div>
                    }
                </form>
            }
        </div>
    )
}
