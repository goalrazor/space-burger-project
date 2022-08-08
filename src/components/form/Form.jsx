import React from "react";
import style from "./form.module.css";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export function Form({header, buttonText, handleClick, children}) {
    return (
        <form className={style.form}>
            <h1 className={`text text_type_main-default ${style.text}`}>{header}</h1>
            <div className={`mt-6 ${style.input}`}>
                {children}
            </div>
            <div className={style.button}>
                <Button size={"medium"} onClick={handleClick}>
                    {buttonText}
                </Button>
            </div>
        </form>
    )
}

Form.propTypes = {
    header: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
}
