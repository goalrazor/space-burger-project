import React from "react";
import header from './../app-header/AppHeader.module.css'
import PropTypes from "prop-types";
import {Link, useRouteMatch} from "react-router-dom";

const HeaderMenuItem = ({icon: Icon, iconStatus, className, path, match, children}) => {
    const isLinkActive = useRouteMatch(match || path);
    return (
        <Link className={header.link} to={`${path}`}>
            <div className={`${className} ${'m-4'}`}>
                <Icon type={iconStatus}/>
                <p className={`${header.headerMenuItemText} text text_type_main-default  ${isLinkActive ? 'text_color_primary'
                    : 'text_color_inactive'}`}>
                    {children}
                </p>
            </div>
        </Link>
    )
}

HeaderMenuItem.propTypes = {
    icon: PropTypes.elementType.isRequired,
    className: PropTypes.string.isRequired,
    iconStatus: PropTypes.string,
    path: PropTypes.string.isRequired,
    match: PropTypes.object,
}

export default HeaderMenuItem;
