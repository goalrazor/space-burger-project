import React from "react";
import header from './../app-header/AppHeader.module.css'
import PropTypes from "prop-types";

const HeaderMenuItem = ({icon: Icon, className, children}) => {
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

HeaderMenuItem.propTypes = {
    icon: PropTypes.elementType.isRequired,
    className: PropTypes.string.isRequired
}

export default HeaderMenuItem;
