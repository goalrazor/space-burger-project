import React from 'react'
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderMenuItem from "../header-menu-item/HeaderMenuItem";
import header from "./AppHeader.module.css"
import {Link, useRouteMatch} from "react-router-dom";


const BurgerMenuIcon = ({type}) => {
    if (!type) {
        type = 'secondary'
    }
    return (
        <BurgerIcon type={`${type}`}/>
    )
}

const ListMenuIcon = ({type}) => {
    if (!type) {
        type = 'secondary'
    }
    return (
        <ListIcon type={`${type}`}/>
    )
}

const ProfileMenuIcon = ({type}) => {
    if (!type) {
        type = 'secondary'
    }
    return (
        <ProfileIcon type={`${type}`}/>
    )
}

const AppHeader = () => {
    const isConstructorActive = useRouteMatch({
        path: ["/", "/ingredients/:id", "/order"],
        exact: true
    })

    const isListActive = useRouteMatch('/list');

    const isProfileActive = useRouteMatch('/profile');

    return (
        <header className={header.header}>
            <div
                className={header.headerContainer}>
                <nav className={header.headerMenu}>
                    <HeaderMenuItem
                        className={`${header.headerMenuItem} `}
                        icon={BurgerMenuIcon}
                        iconStatus={isConstructorActive ? 'primary' : 'secondary'}
                        match={{
                            path: ["/", "/ingredients/:id", "/order"],
                            exact: true
                        }}
                        path={"/"}
                    >
                        Конструктор
                    </HeaderMenuItem>
                    <HeaderMenuItem
                        className={`${header.headerMenuItem} text text_type_main-default text_color_inactive`}
                        icon={ListMenuIcon}
                        iconStatus={isListActive ? 'primary' : 'secondary'}
                        path={"/list"}
                    >
                        Лента заказов
                    </HeaderMenuItem>
                </nav>
                <Link to={"/"} className={`${header.logo} ${'m-6'}`}>
                    <Logo/>
                </Link>
                <HeaderMenuItem
                    className={`${header.headerMenuItem} text text_type_main-default text_color_inactive`}
                    icon={ProfileMenuIcon}
                    iconStatus={isProfileActive ? 'primary' : 'secondary'}
                    path={"/profile"}
                >
                    Личный кабинет
                </HeaderMenuItem>
            </div>
        </header>
    );
}

export default AppHeader;
