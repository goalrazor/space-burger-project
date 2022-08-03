import React, {useState} from 'react'
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import style from "./loginPage.module.css";


export function LoginPage() {
    const [form, setValue] = useState({email: "", password: ""});

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };
    return (
        <div className={style.formContainer}>
            <form className={style.form}>
                <h1 className={`text text_type_main-default ${style.text}`}>Вход</h1>
                {/*<Input*/}
                {/*    type={"email"}*/}
                {/*    placeholder={"Email"}*/}
                {/*    value={form.email}*/}
                {/*    name={"email"}*/}
                {/*    onChange={onChange}*/}
                {/*    errorText={"Ой, произошла ошибка!"}*/}
                {/*    icon={"EditIcon"}>*/}
                {/*    error={true}*/}
                {/*</Input>*/}
                <div className={`mt-6 ${style.input}`}>
                    <EmailInput
                        value={form.email}
                        name={"email"}
                        onChange={onChange}>
                    </EmailInput>
                    <PasswordInput
                        value={form.password}
                        name={"password"}
                        onChange={onChange}/>
                </div>
                <div className={style.button}>
                    <Button size={"medium"} onClick={() => console.log(form)}> {/*todo onclick*/}
                        Войти
                    </Button>
                </div>
                <p className={`text text_type_main-default text_color_inactive mt-20 ${style.text}`}>Вы новый
                    пользователь?
                    <Link
                        to="/register"
                        className={`text text_type_main-default ml-2 ${style.link}`}>Зарегистрироваться</Link></p>
                <p className={`text text_type_main-default text_color_inactive mt-4 ${style.text}`}>Забыли пароль?
                    <Link
                        to="/forgot-password"
                        className={`text text_type_main-default ml-2 ${style.link}`}>Восстановить пароль</Link></p>
            </form>
        </div>
    )
}
