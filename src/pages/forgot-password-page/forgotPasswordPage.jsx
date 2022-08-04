import React, {useState} from 'react'
import style from "../../components/form/form.module.css";
import {Form} from "../../components/form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

export function ForgotPasswordPage() {
    const [form, setValue] = useState({email: "", password: ""});

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    return (
        <div className={style.formContainer}>
            <Form header={"Восстановление пароля"} buttonText={"Восстановить"}>
                <Input
                    type={"email"}
                    placeholder={"Укажите e-mail"}
                    value={form.email}
                    name={"email"}
                    onChange={onChange}/>
            </Form>
            <p className={`text text_type_main-default text_color_inactive mt-20 ${style.text}`}>Вспомнили пароль?
                <Link
                    to="/login"
                    className={`text text_type_main-default ml-2 ${style.link}`}>Войти</Link></p>

        </div>
    )
}
