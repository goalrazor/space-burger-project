import React, {useCallback, useEffect, useState} from 'react'
import style from "../../components/form/form.module.css";
import {Form} from "../../components/form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {getCookie} from "../../utils/cookie";
import {useDispatch, useSelector} from "react-redux";
import {setNewPassword} from "../../services/actions/auth";

export function ResetPasswordPage() {
    const [form, setValue] = useState({password: "", keyword: ""});
    const [icon, setIcon] = useState({icon: "ShowIcon"})
    const history = useHistory()
    const passwordWasSent = useSelector(store => store.authReducer.resetPasswordWasSent)
    const dispatch = useDispatch()

    useEffect(
        () => {
            if (!passwordWasSent) {
                history.replace("/forgot-password")
            }
            // eslint-disable-next-line
        }, []
    )

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    const handleClick = useCallback(
        async (e) => {
            e.preventDefault()
            await dispatch(setNewPassword(form.password, getCookie("accessToken")))
                .then((response) => {
                    if (response.success) {
                        return response
                    }
                })
                .then(() => history.replace("/login"))
                .then(() => alert(`Пароль успешно изменен. Пожалуйста, войдите заново`))
                .catch(error => console.error(error))
        },
        [form, history, dispatch]
    );

    return (
        <div className={style.formContainer}>
            <Form header={"Восстановление пароля"} buttonText={"Сохранить"} handleClick={handleClick}>
                <Input
                    type={"text"}
                    placeholder={"Введите новый пароль"}
                    value={form.password}
                    name={"password"}
                    onChange={onChange}
                    onIconClick={() => {
                        setIcon({
                            icon: icon.icon === "ShowIcon" ? "HideIcon" : "ShowIcon"
                        })
                    }}
                    icon={icon.icon}
                />
                <Input
                    type={"text"}
                    placeholder={"Введите код из письма"}
                    value={form.keyword}
                    name={"keyword"}
                    onChange={onChange}
                />
            </Form>
            <p className={`text text_type_main-default text_color_inactive mt-20 ${style.text}`}>Вспомнили пароль?
                <Link
                    to="/login"
                    className={`text text_type_main-default ml-2 ${style.link}`}>Войти</Link></p>

        </div>
    )
}
