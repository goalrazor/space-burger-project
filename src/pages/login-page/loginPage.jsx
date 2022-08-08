import React, {useCallback, useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import style from "../../components/form/form.module.css";
import {Form} from "../../components/form/Form"
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {login} from "../../services/actions/auth";
import {useDispatch} from "react-redux";
import {setCookie} from "../../utils/cookie";


export function LoginPage() {
    const dispatch = useDispatch()
    const [form, setValue] = useState({email: "", password: ""});
    const history = useHistory()

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    const handleButtonClick = useCallback(
        async (e) => {
            e.preventDefault()
            await dispatch(login(form.email, form.password))
                .then((res) => {
                    setCookie("accessToken", res.accessToken.split('Bearer ')[1])
                    localStorage.setItem("refreshToken", res.refreshToken)
                })
                .then(() => {
                    history.replace("/")
                })
        }, [dispatch, form, history]
    )

    return (
        <div className={style.formContainer}>
            <Form header={"Вход"} buttonText={"Войти"} handleClick={handleButtonClick}>
                <EmailInput
                    value={form.email}
                    name={"email"}
                    onChange={onChange}/>
                <PasswordInput
                    value={form.password}
                    name={"password"}
                    onChange={onChange}/>
            </Form>
            <p className={`text text_type_main-default text_color_inactive mt-20 ${style.text}`}>Вы новый
                пользователь?
                <Link
                    to="/register"
                    className={`text text_type_main-default ml-2 ${style.link}`}>Зарегистрироваться</Link></p>
            <p className={`text text_type_main-default text_color_inactive mt-4 ${style.text}`}>Забыли пароль?
                <Link
                    to="/forgot-password"
                    className={`text text_type_main-default ml-2 ${style.link}`}>Восстановить пароль</Link></p>
        </div>
    )
}
