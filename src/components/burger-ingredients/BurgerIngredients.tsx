import React, {useEffect} from "react";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'

import style from './BurgerIngredients.module.css'
import scrollerStyle from '../../pages/constructor-page/constructorPage.module.css'
import Ingredients, {BUN, MAIN, SAUCE} from "../ingredients/Ingredients";
import {useDispatch, useSelector} from "../../services/hooks/hooks";
import {useInView} from "react-intersection-observer";
import {setCurrentTab} from "../../services/actions/burger-ingredients";
import {Loader} from "../loader/Loader";

const Tabs = () => {
    const currentTab = useSelector(store => store.ingredientReducer.currentTab)
    const dispatch = useDispatch();

    const goToViolation = (id: string) => {
        const violation = document.querySelector(`#` + id) as Element;
        violation.scrollIntoView({
            behavior: "smooth"
        });
        dispatch(setCurrentTab(id))
    };

    return (
        <div className={`${style.tab} mb-10`}>
            <Tab value={BUN} active={currentTab === BUN} onClick={() => {
                goToViolation(BUN)
            }}>
                {BUN}
            </Tab>
            <Tab value={SAUCE} active={currentTab === SAUCE} onClick={() => {
                goToViolation(SAUCE)
            }}>
                {SAUCE}
            </Tab>
            <Tab value={MAIN} active={currentTab === MAIN} onClick={() => {
                goToViolation(MAIN)
            }}>
                {MAIN}
            </Tab>
        </div>
    )
}

const BurgerIngredients = () => {
    const data = useSelector(store => store.ingredientReducer.ingredients);
    const [bunsRef, toBunsView] = useInView({threshold: 0});
    const [sauceRef, toSauceView] = useInView({threshold: 0});
    const [mainRef, toMainView] = useInView({threshold: 0});
    const dispatch = useDispatch();

    useEffect(() => {
        if (toBunsView) {
            dispatch(setCurrentTab(BUN))
        } else if (toSauceView) {
            dispatch(setCurrentTab(SAUCE))
        } else if (toMainView) {
            dispatch(setCurrentTab(MAIN))
        }
    }, [dispatch, toBunsView, toMainView, toSauceView]);

    return (
        <section className={style.container}>
            <h1 className={`mt-10 mb-5 text text_type_main-large`}>
                Соберите бургер
            </h1>
            <Tabs/>
            {data ?
                <div className={scrollerStyle.scroller}>
                    <div ref={bunsRef}>
                        <Ingredients data={data} tab={BUN}>
                            {BUN}
                        </Ingredients>
                    </div>
                    <div ref={sauceRef}>
                        <Ingredients data={data} tab={SAUCE}>
                            {SAUCE}
                        </Ingredients>
                    </div>
                    <div ref={mainRef}>
                        <Ingredients data={data} tab={MAIN}>
                            {MAIN}
                        </Ingredients>
                    </div>
                </div>
                :
                <Loader/>}
        </section>
    )
}

export default BurgerIngredients
