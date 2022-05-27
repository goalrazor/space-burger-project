import style from "../burger-constructor/BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const ConstructorListElement = ({type, name, price, image}: { type: any, name: string, price: any, image: string }) => {
    return (
        <div style={{display: 'flex', alignItems: 'center', height: '80px'}}>
            <div className={style.dragIco}>
                {!type && <DragIcon type="primary"/>}
            </div>
            <ConstructorElement
                type={type}
                isLocked={!!type}
                text={name}
                price={price}
                thumbnail={image}
            />
        </div>
    )
}

export default ConstructorListElement;
