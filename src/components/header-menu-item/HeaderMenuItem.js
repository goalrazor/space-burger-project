import React from "react";
import header from './../app-header/AppHeader.module.css'

const HeaderMenuItem = ({Icon, children, className}) => {
    return (
        <div
            className={`${className} ${'m-4'}`}
        >
            <Icon/>
            <p className={header.headerMenuItemText}>
                {children}
            </p>
        </div>
    )
}

export default HeaderMenuItem;
