import ConstructorListElement from "../constructor-list-element/constructorListElement";
import container from '../burger-ingredients/BurgerIngredients.module.css'
import style from './BurgerConstructor.module.css'
import scroller from '../app/App.module.css'
import {BUN, getPartOfBurgerData} from "../inredients/Ingredients";
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Total from "../total/Total";
import {useDispatch, useSelector} from "react-redux";
import {setOrder} from "../../services/actions/burger-constructor-ingredients";
import {useDrop} from "react-dnd";
import {v4 as uuidv4} from 'uuid';
import {ADD_INGREDIENT, INCREASE_INGREDIENT_COUNT} from "../../services/actions/burger-ingredients";

const BurgerConstructor = () => {
    const data = useSelector(store => store.ingredientReducer.constructorIngredients);
    const bun = data ? getPartOfBurgerData(BUN, data) : null;
    const dispatch = useDispatch();

    const submitOrderOnClickHandler = () => {
        dispatch(setOrder({
            ingredients: data.map((item) => {
                return item._id
            })
        }))
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop({props}) {
            dispatch({
                type: ADD_INGREDIENT,
                payload: {...props, uuid: uuidv4()}
            })
            dispatch({
                type: INCREASE_INGREDIENT_COUNT,
                ingredient: props
            })
        },
    });

    return (
        <section className={container.container} ref={dropTarget}>
            <ul className={style.cardsContainer}>
                {data.length !== 0 ?
                    <div className={style.cardsScrollerContainer}>
                        {bun.length !== 0 ? <ConstructorListElement
                            key={0}
                            {...bun[0]}
                            type={'top'}
                            name={`${bun[0]?.name} (верх)`}
                        /> : ''}
                        <div className={`${scroller.scrollerConstructor} ${style.cardsScroller}`}>
                            {getPartOfBurgerData('inner', data).map((item, index) => {
                                return (<ConstructorListElement
                                        key={index}
                                        {...item}
                                        type={''}
                                        index={index}
                                    />
                                )
                            })}
                        </div>
                        {bun.length !== 0 ? <ConstructorListElement
                            key={data.length + 1}
                            {...bun[0]}
                            type={'bottom'}
                            name={`${bun[0]?.name} (низ)`}
                        /> : ''}
                    </div> :
                    ''}
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
