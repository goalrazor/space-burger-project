import style from "../burger-ingredients/BurgerIngredients.module.css";
import Card from "../card/Card";
import data from "../../utils/data";

export const BUN = 'Булки'
export const SAUCE = 'Соусы'
export const MAIN = 'Начинки'

const switchDataString = (key: string) => {
    let dataString: string;
    switch (key) {
        case BUN:
            dataString = 'bun';
            break;
        case SAUCE:
            dataString = 'sauce';
            break;
        case MAIN:
            dataString = 'main';
            break;
        default:
            dataString = 'inner';
    }

    return dataString;
}

const filterBurgerData = (dataString: string) => {
    return data.filter(item => {
        return item.type === dataString
    });

}

export const getPartOfBurgerData = (children: any) => {
    const dataString = switchDataString(children);
    let partOfBurger;
    if (dataString !== 'inner') {
        partOfBurger = (filterBurgerData(dataString));
        return partOfBurger;
    } else {
        partOfBurger = filterBurgerData(switchDataString(MAIN)).concat(filterBurgerData(switchDataString(SAUCE)));
        return partOfBurger;
    }
}

const Ingredients = ({children}: { children: any }) => {
    return (
        <>
            <h2 className={'text text_type_main-medium'}>
                {children}
            </h2>
            <div className={style.cardsContainer}>
                {getPartOfBurgerData(children).map(item => {
                    return (<Card
                            key={item._id}
                            {...item}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default Ingredients;
