import ConstructorListElement from "../constructor-list-element/constructorListElement";
import container from '../burger-ingredients/BurgerIngredients.module.css'
import style from './BurgerConstructor.module.css'
import scroller from '../app/App.module.css'
import {getPartOfBurgerData} from "../inredients/Ingredients";
import {Button} from '@ya.praktikum/react-developer-burger-ui-components'
import Total from "../total/Total";

const BurgerConstructor = () => {
    return (
        <section className={container.container}>
            <ul className={style.cardsContainer}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                    {/*Нет смысла сейчас доставать это из data, т.к. потом будем доставть это из state BurgerIngredients. Захардкодил*/}
                    <ConstructorListElement
                        key={'"60666c42cc7b410027a1a9b1"'}
                        type={'top'}
                        name={'Краторная булка N-200i'}
                        price={'1255'}
                        image={'https://code.s3.yandex.net/react/code/bun-02.png'}
                    />
                    <div style={{display: 'flex', flexDirection: 'column', gap: '16px', alignContent: 'center'}}
                         className={scroller.scrollerConstructor}>
                        {getPartOfBurgerData('inner').map(item => {
                            return (<ConstructorListElement
                                    key={item._id}
                                    {...item}
                                    type={''}
                                />
                            )
                        })}
                    </div>
                    {/*Нет смысла сейчас доставать это из data, т.к. потом будем доставть это из state BurgerIngredients*/}
                    <ConstructorListElement
                        key={'60666c42cc7b410027a1a9b2'}
                        type={'bottom'}
                        name={'Флюоресцентная булка R2-D3'}
                        price={'988'}
                        image={'https://code.s3.yandex.net/react/code/bun-01.png'}
                    />
                </div>
            </ul>
            <div className={style.totalContainer}>
                {/*Тотал будет собираться из стейта*/}
                <Total
                    price={"123456"}/>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;
