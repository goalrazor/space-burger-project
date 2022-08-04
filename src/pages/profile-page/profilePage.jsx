import React, {useState} from 'react'
import formStyle from "../../components/form/form.module.css";
import style from "./profilePage.module.css"
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

export function ProfilePage() {
    const [form, setValue] = useState({name: "GHJ", email: "fjdk@dhjks.ru", password: "gdhsj"}); //todo доставать имя и другие данные из харнилища

    const onChange = e => {
        setValue({...form, [e.target.name]: e.target.value});
    };
    return (
        <div className={formStyle.formContainer}>
            <div>

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

            </div>
            <form className={formStyle.form}>
                <div className={`mt-6 ${formStyle.input}`}>
                    <Input
                        type={"text"}
                        placeholder={"Имя"}
                        value={form.name}
                        name={"name"}
                        onChange={onChange}
                        icon={"EditIcon"}
                    />
                    <Input
                        type={"email"}
                        placeholder={"Логин"}
                        value={form.email}
                        name={"email"}
                        onChange={onChange}
                        icon={"EditIcon"}
                    />
                    <Input
                        type={"text"}
                        placeholder={"Пароль"}
                        value={form.password}
                        name={"password"}
                        onChange={onChange}
                        icon={"EditIcon"}
                    />
                </div>
            </form>
        </div>
    )
}
