import React, {useCallback, useEffect, useState} from 'react'
import formStyle from "../../components/form/form.module.css";
import style from "./profilePage.module.css"
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProfileInfo, refreshToken, setProfileInfo} from "../../services/actions/auth";
import {getCookie} from "../../utils/cookie";

export function ProfilePage() {
    const [form, setValue] = useState({name: "", email: "", password: ""});
    const [isEditButtonsShown, setEditButtonShown] = useState({isButtonsShown: false, inputActive: false})
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(store => store.authReducer.user)

    useEffect(() => {
            async function checkUser() {
                await dispatch(refreshToken(localStorage.getItem("refreshToken")))
                    .then(() => dispatch(getProfileInfo(getCookie("accessToken"))))
                    .then((res) => {
                        setValue({
                                name: res.user.name,
                                email: res.user.email
                            }
                        )
                    })
                    .catch(() => {
                        console.log("profilePage")
                        history.replace("/login")
                    })
            }

            checkUser();
        }, []
    )

    const toggleButtonsShown = () => {
        setEditButtonShown({
            isButtonsShown: !isEditButtonsShown.isButtonsShown,
            inputActive: !isEditButtonsShown.inputActive
        })
    }

    const submitProfileChange = useCallback(
        async (e) => {
            e.preventDefault()
            await dispatch(refreshToken(localStorage.getItem("refreshToken")))
                .then(() => {
                    if (form.name !== user.name) {
                        dispatch(setProfileInfo(getCookie("accessToken"), {name: form.name}))
                    }
                    if (form.email !== user.email) {
                        dispatch(setProfileInfo(getCookie("accessToken"), {email: form.email}))
                    }
                })
                .catch((err) => {
                    console.error(err)
                    history.replace("/login")
                })
        }, [form, dispatch, user])


    const cancelProfileChange = useCallback(
        () => {
            setValue({
                name: user.name,
                email: user.email
            })
            toggleButtonsShown()
        }, [form, user])

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };
    return (
        <div className={formStyle.formContainer}>
            <nav className={style.navigation}>
                <ul className={style.list}>
                    <li className={style.listElement}>
                        <Link className={`text text_type_main-medium ${style.link}`} to={"/profile"}>Профиль</Link>
                    </li>
                    <li className={style.listElement}>
                        <Link className={`text text_type_main-medium text_color_inactive ${style.link}`}
                              to={"/profile/orders"}>История заказов</Link>
                    </li>
                    <li className={style.listElement}>
                        <Link className={`text text_type_main-medium text_color_inactive ${style.link}`}
                              to={"/"}>Выход</Link>
                    </li>
                </ul>
                <p className={"text text_type_main-small text_color_inactive mt-20"}>В этом разделе вы можете
                    изменить свои персональные данные</p>
            </nav>
            <form className={formStyle.form}>
                <div className={`mt-6 ${formStyle.input}`}>
                    <Input
                        type={"text"}
                        placeholder={"Имя"}
                        value={form.name}
                        name={"name"}
                        onChange={onChange}
                        icon={"EditIcon"}
                        onIconClick={toggleButtonsShown}
                        disabled={!isEditButtonsShown.inputActive}
                    />
                    <Input
                        type={"email"}
                        placeholder={"Логин"}
                        value={form.email}
                        name={"email"}
                        onChange={onChange}
                        icon={"EditIcon"}
                        onIconClick={toggleButtonsShown}
                        disabled={!isEditButtonsShown.inputActive}
                    />
                    <Input
                        type={"text"}
                        placeholder={"Пароль"}
                        value={form.password}
                        name={"password"}
                        onChange={onChange}
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
                        <a onClick={cancelProfileChange}>
                            Отмена
                        </a>
                    </div>
                }
            </form>
        </div>
    )
}
