import React, {useCallback} from 'react'
import style from "../../components/form/form.module.css";
import {Form} from "../../components/form/Form";
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {register} from "../../services/actions/auth/authThunk";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "../../services/hooks/useForm";

export function RegistrationPage() {
    const dispatch = useDispatch()
    const user = useSelector(store => store.authReducer.user)
    const {formData, handleInputChange} = useForm({email: "", password: "", name: ""});
    const {email, password, name} = formData;

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault()
            dispatch(
                register(email, password, name)
            )
            // eslint-disable-next-line
        }, [dispatch, formData]
    )

    if (user.name) {
        return (
            <Redirect to={"/"}/>
        )
    }

    return (
        <div className={`${style.formContainerOnlyForm} ${style.formContainer}`}>
            <Form header={"Регистрация"} buttonText={"Зарегистрироваться"} handleSubmit={handleSubmit}>
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    value={name}
                    name={"name"}
                    onChange={handleInputChange}/>
                <EmailInput
                    value={email}
                    name={"email"}
                    onChange={handleInputChange}/>
                <PasswordInput
                    value={password}
                    name={"password"}
                    onChange={handleInputChange}/>
            </Form>
            <p className={`text text_type_main-default text_color_inactive mt-20 ${style.text}`}>Уже зарегистрированы?
                <Link
                    to="/login"
                    className={`text text_type_main-default ml-2 ${style.link}`}>Войти</Link></p>

        </div>
    )
}
