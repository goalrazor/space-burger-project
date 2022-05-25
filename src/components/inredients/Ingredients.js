import style from "../burger-ingredients/BurgerIngredients.module.css";
import Card from "../card/Card";
import data from "../../utils/data";

const BUN = 'Булки'
const SAUCE = 'Соусы'
const MAIN = 'Начинки'

const getPartOfBurgerData = (children) => {
    let dataString;
    switch (children) {
        case BUN:
            dataString = 'bun';
            break;
        case SAUCE:
            dataString = 'sauce';
            break;
        case MAIN:
            dataString = 'main';
            break;
    }
    return data.filter(item => {
        return item.type === dataString
    });
}

const Ingredients = ({children}) => {
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
