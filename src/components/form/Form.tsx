import React, {FC} from "react";
import style from "./form.module.css";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

interface IFormProps {
    header: string,
    buttonText: string,
    handleSubmit: () => void
}

export const Form: FC<IFormProps> = ({header, buttonText, handleSubmit, children}) => {
    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <h1 className={`text text_type_main-default ${style.text}`}>{header}</h1>
            <div className={`mt-6 ${style.input}`}>
                {children}
            </div>
            <div className={style.button}>
                <Button size={"medium"}>
                    {buttonText}
                </Button>
            </div>
        </form>
    )
}
