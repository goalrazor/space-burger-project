import React, {useCallback, useState} from 'react'
import style from "../../components/form/form.module.css";
import {Form} from "../../components/form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import api from "../../api/Api";

export function ForgotPasswordPage() {
    const history = useHistory()
    const [form, setValue] = useState({email: "", password: ""});
    const [isPasswordSent, setIsPasswordSent] = useState(false)
    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    const handleClick = useCallback(
        e => {
            e.preventDefault()
            api.resetPassword({email: form.email})
                .then(response => console.log(response))
                .then(response => setIsPasswordSent(response.success))
                .then(() => history.replace("/reset-password"))
                .then(() => alert(`Письмо с кодом восстановления пароля выслано на электронную почту ${form.email}`))
                .catch(error => console.error(error))
        },
        [form]
    );

    return (
        <div className={style.formContainer}>
            <Form header={"Восстановление пароля"} buttonText={"Восстановить"} handleClick={handleClick}>
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
