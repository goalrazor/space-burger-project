import React, {useCallback, useEffect, useState} from 'react'
import style from "../../components/form/form.module.css";
import {Form} from "../../components/form/Form";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {getCookie} from "../../utils/cookie";
import {useDispatch, useSelector} from "../../services/hooks/hooks";
import {setNewPassword} from "../../services/actions/auth/authThunk";
import {useForm} from "../../services/hooks/useForm";
import {TICons} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

export function ResetPasswordPage() {
    const [icon, setIcon] = useState<{ icon: keyof TICons }>({icon: 'ShowIcon'})
    const history = useHistory()
    const passwordWasSent = useSelector(store => store.authReducer.resetPasswordWasSent)
    const dispatch = useDispatch()

    const {formData, handleInputChange} = useForm({password: "", keyword: ""});
    const {password, keyword} = formData;
    useEffect(
        () => {
            if (!passwordWasSent) {
                history.replace("/forgot-password")
            }
            // eslint-disable-next-line
        }, []
    )

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault()
            await dispatch(setNewPassword(password, getCookie("accessToken")))
                .then((response: { success: boolean; }) => {
                    if (response.success) {
                        return response
                    }
                })
                .then(() => history.replace("/login"))
                .then(() => alert(`Пароль успешно изменен. Пожалуйста, войдите заново`))
                .catch((error: any) => console.error(error))
        },
        // eslint-disable-next-line
        [formData, history, dispatch]
    );

    return (
        <div className={`${style.formContainerOnlyForm} ${style.formContainer}`}>
            <Form header={"Восстановление пароля"} buttonText={"Сохранить"} handleSubmit={handleSubmit}>
                <Input
                    type={"text"}
                    placeholder={"Введите новый пароль"}
                    value={password}
                    name={"password"}
                    onChange={handleInputChange}
                    onIconClick={() => {
                        setIcon({
                            icon: icon.icon === 'ShowIcon' ? 'HideIcon' : 'ShowIcon'
                        })
                    }}
                    icon={icon.icon}
                />
                <Input
                    type={"text"}
                    placeholder={"Введите код из письма"}
                    value={keyword}
                    name={"keyword"}
                    onChange={handleInputChange}
                />
            </Form>
            <p className={`text text_type_main-default text_color_inactive mt-20 ${style.text}`}>Вспомнили пароль?
                <Link
                    to="/login"
                    className={`text text_type_main-default ml-2 ${style.link}`}>Войти</Link></p>

        </div>
    )
}
