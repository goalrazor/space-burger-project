import React from 'react';
import {Link} from 'react-router-dom';
import style from './notFoundPage.module.css'
import linkStyle from "../../components/form/form.module.css";

export const NotFoundPage = () => (
    <div className={style.notFound}>
        <h1 className={`text text_type_main-large mt-20 ${linkStyle.text}`}>404 - Not Found!
            <Link className={`text text_type_main-default ml-2 ${linkStyle.link}`} to="/">Go Home</Link>
        </h1>
    </div>
);
