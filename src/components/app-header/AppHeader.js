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
        <ListIcon type={'primary'}/>
    )
}

const ProfileMenuIcon = () => {
    return (
        <ProfileIcon type={'primary'}/>
    )
}

const AppHeader = () => {
    return (
        <header className={header.header}>
            <nav className={header.headerMenu}>
                <HeaderMenuItem
                    className={header.headerMenuItem}
                    Icon={BurgerMenuIcon}
                    iconClassName={header.headerIcon}
                >
                    Конструктор
                </HeaderMenuItem>
                <HeaderMenuItem
                    className={header.headerMenuItem}
                    Icon={ListMenuIcon}
                >
                    Лента заказов
                </HeaderMenuItem>
            </nav>
            <div className={'m-6'}>
                <Logo/>
            </div>
            <HeaderMenuItem
                className={header.headerMenuItem}
                Icon={ProfileMenuIcon}
            >
                Лента заказов
            </HeaderMenuItem>
        </header>
    );
}

export default AppHeader;
