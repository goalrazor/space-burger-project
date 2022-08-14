import React, {useCallback, useEffect, useState} from 'react'
import formStyle from "../../components/form/form.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProfileInfo, refreshToken, setProfileInfo} from "../../services/actions/auth";
import {getCookie} from "../../utils/cookie";
import {useForm} from "../../services/hooks/useForm";
import {ProfileNav} from "../../components/profile-nav/profileNav";
import {Loader} from "../../components/loader/Loader";

export function ProfilePage() {
    const {formData, handleInputChange, setFormData} = useForm({name: "", email: "", password: ""});
    const {name, email, password} = formData;
    const [isEditButtonsShown, setEditButtonShown] = useState({isButtonsShown: false, inputActive: false})
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(store => store.authReducer.user)

    useEffect(() => {
        async function checkUser() {
            await dispatch(refreshToken(localStorage.getItem("refreshToken")))
                .then(() => dispatch(getProfileInfo(getCookie("accessToken"))))
                .then((res) => {
                    setFormData({
                            name: res.user.name,
                            email: res.user.email,
                            password: ''
                        }
                    )
                })
                .catch(() => {
                    history.replace("/login")
                    })
            }

            checkUser();
        // eslint-disable-next-line
        }, []
    )

    const toggleButtonsShown = useCallback(() => {
            setEditButtonShown({
                isButtonsShown: !isEditButtonsShown.isButtonsShown,
                inputActive: !isEditButtonsShown.inputActive
            })
        }, [isEditButtonsShown]
    )

    const submitProfileChange = useCallback(
        async (e) => {
            e.preventDefault()
            await dispatch(refreshToken(localStorage.getItem("refreshToken")))
                .then(() => {
                    if (name !== user.name) {
                        dispatch(setProfileInfo(getCookie("accessToken"), {name: name}))
                    }
                    if (email !== user.email) {
                        dispatch(setProfileInfo(getCookie("accessToken"), {email: email}))
                    }
                })
                .catch((err) => {
                    console.error(err)
                    history.replace("/login")
                })
        }, // eslint-disable-next-line
        [formData, dispatch, user, history])


    const cancelProfileChange = useCallback(
        () => {
            setFormData({
                name: user.name,
                email: user.email
            })
            toggleButtonsShown()
        },
        // eslint-disable-next-line
        [user, toggleButtonsShown])

    return (
        <div className={formStyle.formContainer}>
            {name ?
                <>
                    <ProfileNav/>
                    <form className={formStyle.form} onSubmit={submitProfileChange}>
                        <div className={`mt-6 ${formStyle.input}`}>
                            <Input
                                type={"text"}
                                placeholder={"Имя"}
                                value={name}
                                name={"name"}
                                onChange={handleInputChange}
                                icon={"EditIcon"}
                                onIconClick={toggleButtonsShown}
                                disabled={!isEditButtonsShown.inputActive}
                            />
                            <Input
                                type={"email"}
                                placeholder={"Логин"}
                                value={email}
                                name={"email"}
                                onChange={handleInputChange}
                                icon={"EditIcon"}
                                onIconClick={toggleButtonsShown}
                                disabled={!isEditButtonsShown.inputActive}
                            />
                            <Input
                                type={"text"}
                                placeholder={"Пароль"}
                                value={password}
                                name={"password"}
                                onChange={handleInputChange}
                                icon={"EditIcon"}
                                onIconClick={toggleButtonsShown}
                                disabled={!isEditButtonsShown.inputActive}
                            />
                        </div>
                        {isEditButtonsShown.isButtonsShown &&
                            <div>
                                <Button onClick={submitProfileChange}>
                                    Сохранить
                                </Button>
                                <Button onClick={cancelProfileChange}>
                                    Отмена
                                </Button>
                            </div>
                        }
                    </form>
                </>
                :
                <Loader/>
            }
        </div>
    )
}
