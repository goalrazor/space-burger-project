import ConstructorListElement from "../constructor-list-element/constructorListElement";
import container from '../burger-ingredients/BurgerIngredients.module.css'
import style from './BurgerConstructor.module.css'
import scroller from '../app/App.module.css'
import {BUN, getPartOfBurgerData} from "../inredients/Ingredients";
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Total from "../total/Total";
import api from "../../api/Api";
import {useDispatch, useSelector} from "react-redux";
import {SET_ORDER_DETAILS} from "../../services/actions/burger-constructor-ingredients";

const BurgerConstructor = () => {
    const data = useSelector(store => store.ingredientReducer.ingredients);
    const bun = data ? getPartOfBurgerData(BUN, data) : null;
    const dispatch = useDispatch();

    const submitOrderOnClickHandler = () => {
        api
            .saveOrder({
                ingredients: data.map((item) => {
                    return item._id
                })
            })
            .then(response => {
                dispatch({
                    type: SET_ORDER_DETAILS,
                    details: response
                })
            })
            .catch(error => console.error('Ошибка при отправки заказа на сервер', error))
    }

    return (
        <section className={container.container}>
                <ul className={style.cardsContainer}>
                    {data && <div className={style.cardsScrollerContainer}>
                        <ConstructorListElement
                            key={0}
                            {...bun[0]}
                            type={'top'}
                            name={`${bun[0]?.name} (верх)`}
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
                        <ConstructorListElement
                            key={data.length + 1}
                            {...bun[0]}
                            type={'bottom'}
                            name={`${bun[0]?.name} (низ)`}
                        />
                    </div>}
                </ul>

            <div className={style.totalContainer}>
                <Total/>
                <div onClick={submitOrderOnClickHandler}>
                    <Button type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default BurgerConstructor;
