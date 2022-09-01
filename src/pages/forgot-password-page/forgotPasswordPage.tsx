import React, {FormEvent} from 'react'
import style from "../../components/form/form.module.css";
import {Form} from "../../components/form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {resetPassword} from "../../services/actions/auth/authThunk";
import {useDispatch} from "../../services/hooks/hooks";
import {useForm} from "../../services/hooks/useForm";

export function ForgotPasswordPage() {
    const history = useHistory()
    const dispatch = useDispatch()
    const {formData, handleInputChange} = useForm({email: ""});
    const {email} = formData;

    const handleClick = (e: FormEvent<Element>) => {
        e.preventDefault()
        dispatch(resetPassword(email))
            .then(() => history.replace("/reset-password"))
            .then(() => alert(`Письмо с кодом восстановления пароля выслано на электронную почту ${email}`))
            .catch((error: any) => console.error(error))
    }

    return (
        <div className={`${style.formContainerOnlyForm} ${style.formContainer}`}>
            <Form header={"Восстановление пароля"} buttonText={"Восстановить"} handleSubmit={handleClick}>
                <Input
                    type={"email"}
                    placeholder={"Укажите e-mail"}
                    value={email}
                    name={"email"}
                    onChange={handleInputChange}/>
            </Form>
            <p className={`text text_type_main-default text_color_inactive mt-20 ${style.text}`}>Вспомнили пароль?
                <Link
                    to="/login"
                    className={`text text_type_main-default ml-2 ${style.link}`}>Войти</Link></p>

        </div>
    )
}
