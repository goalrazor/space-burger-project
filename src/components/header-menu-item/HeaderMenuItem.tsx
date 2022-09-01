import React, {FC} from "react";
import header from './../app-header/AppHeader.module.css'
import {Link, useRouteMatch} from "react-router-dom";
import {TIconProps} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

type TIconTypes = 'secondary' | 'primary' | 'error' | 'success';

interface IHeaderMenuProps {
    icon: ({type}: TIconProps) => JSX.Element,
    iconStatus: TIconTypes,
    className: string,
    path: string,
    match?: { path: string[]; exact: true; }
}

const HeaderMenuItem: FC<IHeaderMenuProps> = ({icon: Icon, iconStatus, className, path, match, children}) => {
    const isLinkActive = useRouteMatch(match || path);
    return (
        <Link className={header.link} to={`${path}`}>
            <div className={`${className} m-4`}>
                <Icon type={iconStatus}/>
                <p className={`${header.headerMenuItemText} text text_type_main-default  ${isLinkActive ? 'text_color_primary'
                    : 'text_color_inactive'}`}>
                    {children}
                </p>
            </div>
        </Link>
    )
}

export default HeaderMenuItem;
