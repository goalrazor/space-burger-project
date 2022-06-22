import ConstructorListElement from "../constructor-list-element/constructorListElement";
import container from '../burger-ingredients/BurgerIngredients.module.css'
import style from './BurgerConstructor.module.css'
import scroller from '../app/App.module.css'
import {BUN, getPartOfBurgerData} from "../inredients/Ingredients";
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Total from "../total/Total";
import PropTypes from "prop-types";
import {useContext, useReducer} from "react";
import BurgerIngredientsContext from "../../services/context/burger-ingredients-context";
import api from "../../api/Api";
import PriceContext from "../../services/context/price-context";

const initialPriceState = {price: 0};

function reducer(state, action) {
    switch (action.type) {
        case 'set':
            return {price: action.payload};
        case 'reset':
            return initialPriceState;
        default:
            throw new Error();
    }
}

const BurgerConstructor = ({setModalShow}) => {
    const data = useContext(BurgerIngredientsContext);
    const bun = data ? getPartOfBurgerData(BUN, data) : null;
    const [totalPriceState, totalPriceDispatch] = useReducer(reducer, initialPriceState, undefined);

    const submitOrderOnClickHandler = () => {
        api
            .saveOrder({
                ingredients: data.map((item) => {
                    return item._id
                })
            })
            .then(response => {
                setModalShow({
                        ...response,
                        show: true
                    }
                );
            })
            .catch(error => console.error('Ошибка при отправки заказа на сервер', error))
    }

    return (
        <section className={container.container}>
            <PriceContext.Provider value={{totalPriceState, totalPriceDispatch}}>
                <ul className={style.cardsContainer}>
                    {data && <div className={style.cardsScrollerContainer}>
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
                        <ConstructorListElement
                            key={data.length}
                            {...bun[0]}
                            type={'bottom'}
                            name={`${bun[0].name} (низ)`}
                        />
                    </div>}
                </ul>
            </PriceContext.Provider>
            <div className={style.totalContainer}>
                <Total price={totalPriceState.price}/>
                <div onClick={submitOrderOnClickHandler}>
                    <Button type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    setModalShow: PropTypes.func.isRequired
}

export default BurgerConstructor;
