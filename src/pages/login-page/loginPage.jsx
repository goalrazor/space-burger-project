import React, {useState} from 'react'
import {Link} from "react-router-dom";
import style from "../../components/form/form.module.css";
import {Form} from "../../components/form/Form"
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";


export function LoginPage() {
    const [form, setValue] = useState({email: "", password: ""});

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    return (
        <div className={style.formContainer}>
            <Form header={"Вход"} buttonText={"Войти"}>
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
