import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderMenuItem from "../header-menu-item/HeaderMenuItem";
import header from "./AppHeader.module.css"


const BurgerMenuIcon = () => {
    return (
        <BurgerIcon type={'primary'}/>
    )
}

const ListMenuIcon = () => {
    return (
        <ListIcon type={'secondary'}/>
    )
}

const ProfileMenuIcon = () => {
    return (
        <ProfileIcon type={'secondary'}/>
    )
}

const AppHeader = () => {
    return (
        <header className={header.header}>
            <div
                className={header.headerContainer}>
                <nav className={header.headerMenu}>
                    <HeaderMenuItem
                        className={`${header.headerMenuItem} `}
                        Icon={BurgerMenuIcon}
                    >
                        Конструктор
                    </HeaderMenuItem>
                    <HeaderMenuItem
                        className={`${header.headerMenuItem} text text_type_main-default text_color_inactive`}
                        Icon={ListMenuIcon}
                    >
                        Лента заказов
                    </HeaderMenuItem>
                </nav>
                <div className={`${header.logo} ${'m-6'}`}>
                    <Logo/>
                </div>
                <HeaderMenuItem
                    className={`${header.headerMenuItem} text text_type_main-default text_color_inactive`}
                    Icon={ProfileMenuIcon}
                >
                    Лента заказов
                </HeaderMenuItem>
            </div>
        </header>
    );
}

export default AppHeader;
