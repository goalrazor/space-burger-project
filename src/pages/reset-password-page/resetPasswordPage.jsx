import React, {useCallback, useState} from 'react'
import style from "../../components/form/form.module.css";
import {Form} from "../../components/form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import api from "../../api/Api";

export function ResetPasswordPage() {
    const [form, setValue] = useState({password: "", keyword: ""});
    const [icon, setIcon] = useState({icon: "ShowIcon"})

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZWJjYjQ4NDJkMzRhMDAxYzI3ZjAwMiIsImlhdCI6MTY1OTYyMDE2OCwiZXhwIjoxNjU5NjIxMzY4fQ.wfyECJMiJh7XdTRAh6E_0j99WxlLVywKct7GltbN8KI"

    const handleClick = useCallback(
        e => {
            e.preventDefault()
            api.setNewPassword(form.password, token)
                .then(response => console.log(response))
                .then((response) => {
                    if (response.success) {
                        return response
                    }
                })
                .then(() => history.replace("/login"))
                .then(() => alert(`Пароль успешно изменен. Пожалуйста, войдите заново`))
                .catch(error => console.error(error))
        },
        [form]
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
                    onIconClick={(e) => {
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
