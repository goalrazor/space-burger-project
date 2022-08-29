import React, {useCallback} from 'react'
import {Link, useHistory, useLocation} from "react-router-dom";
import style from "../../components/form/form.module.css";
import {Form} from "../../components/form/Form"
import {EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {login} from "../../services/actions/auth/authThunk";
import {useDispatch} from "../../services/hooks/hooks";
import {setCookie} from "../../utils/cookie";
import {useForm} from "../../services/hooks/useForm";
import {TBackgroundLocation} from "../../services/types";


export function LoginPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation<Location & TBackgroundLocation>()

    const {formData, handleInputChange} = useForm({email: "", password: ""});

    const {email, password} = formData;

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault()
            await dispatch(login(email, password))
                .then((res: { accessToken: string; refreshToken: string; }) => {
                    setCookie("accessToken", res.accessToken.split('Bearer ')[1])
                    localStorage.setItem("refreshToken", res.refreshToken)
                })
                .then(() => {
                    history.replace({pathname: location?.state?.from.pathname || '/'})
                })
        },
        // eslint-disable-next-line
        [dispatch, formData, history, location]
    )

    return (
        <div className={`${style.formContainerOnlyForm} ${style.formContainer}`}>
            <Form header={"Вход"} buttonText={"Войти"} handleSubmit={handleSubmit}>
                <EmailInput
                    value={email}
                    name={"email"}
                    onChange={handleInputChange}/>
                <PasswordInput
                    value={password}
                    name={"password"}
                    onChange={handleInputChange}/>
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
