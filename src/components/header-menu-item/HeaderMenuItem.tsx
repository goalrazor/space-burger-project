import React from "react";
import header from './../app-header/AppHeader.module.css'

const HeaderMenuItem = ({Icon, className, children}: { Icon: any, className: string, children: string }) => {
    return (
        <div
            className={`${className} ${'m-4'}`}
        >
            <Icon/>
            <p className={`${header.headerMenuItemText} ${'text text_type_main-default'}`}>
                {children}
            </p>
        </div>
    )
}

export default HeaderMenuItem;
