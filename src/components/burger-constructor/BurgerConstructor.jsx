import ConstructorListElement from "../constructor-list-element/constructorListElement";
import container from '../burger-ingredients/BurgerIngredients.module.css'
import style from './BurgerConstructor.module.css'
import scroller from '../app/App.module.css'
import {BUN, getPartOfBurgerData} from "../inredients/Ingredients";
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Total from "../total/Total";
import PropTypes from "prop-types";
import {ingredientsPropTypes} from "../../utils/propTypesTemplates";

const BurgerConstructor = ({data}) => {

    const bun = getPartOfBurgerData(BUN, data);

    return (
        <section className={container.container}>
            <ul className={style.cardsContainer}>
                <div className={style.cardsScrollerContainer}>
                    {/*Нет смысла сейчас доставать это из data, т.к. потом будем доставть это из state BurgerIngredients. Захардкодил*/}
                    <ConstructorListElement
                        key={0}
                        {...bun[0]}
                        type={'top'}
                        name={`${bun[0].name} (верх)`}
                    />
                    <div className={`${scroller.scrollerConstructor} ${style.cardsScroller}`}>
                        {getPartOfBurgerData('inner', data).map((item, index) => {
                            return (<ConstructorListElement
                                    key={index}
                                    {...item}
                                    type={''}
                                />
                            )
                        })}
                    </div>
                    {/*Нет смысла сейчас доставать это из data, т.к. потом будем доставть это из state BurgerIngredients*/}
                    <ConstructorListElement
                        key={data.length}
                        {...bun[0]}
                        type={'bottom'}
                        name={`${bun[0].name} (низ)`}
                    />
                </div>
            </ul>
            <div className={style.totalContainer}>
                {/*Тотал будет собираться из стейта*/}
                <Total
                    price={123456}/>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired
}

export default BurgerConstructor;
