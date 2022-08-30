import Modal from "../../components/modal/Modal";
import React, {useEffect} from "react";
import OrderDetails from "../../components/order-details/OrderDetails";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "../../services/hooks/hooks";
import {Loader} from "../../components/loader/Loader";
import {CLOSE_ORDER_MODAL, setOrder} from "../../services/actions/burger-constructor-ingredients";
import {getCookie} from "../../utils/cookie";
import {RESET_INGREDIENT_COUNT} from "../../services/actions/burger-ingredients";
import {refreshToken} from "../../services/actions/auth/authThunk";
import ModalOverlay from "../../components/modal-overlay/ModalOverlay";

export function SendOrderModalPage() {
    const history = useHistory()
    const data = useSelector(store => store.ingredientReducer.constructorIngredients);
    const dispatch = useDispatch()

    useEffect(() => {
            async function makeOrder() {
                return await dispatch(setOrder({
                        ingredients: data.map((item) => {
                            return item._id
                        })
                    },
                    getCookie('accessToken')))
                    .then(dispatch({
                        type: RESET_INGREDIENT_COUNT
                    }))
                    .then(dispatch({
                        type: CLOSE_ORDER_MODAL
                    }))
            }

            makeOrder()
                .catch((response) => {
                    if (response === "Ingredient ids must be provided") {
                        history.goBack()
                    } else {
                        dispatch(refreshToken(localStorage.getItem("refreshToken")))
                            .then(makeOrder())
                    }
                })

        }
        ,
        []
    )

    const orderNumber = useSelector(store => store.orderDetailsReducer.orderDetails.order?.number)
    return (
        <>
            {orderNumber ?
                <Modal title=""
                       handleClose={() => {
                           history.goBack()
                       }}
                >
                    <OrderDetails/>
                </Modal>
                :
                <>
                    <ModalOverlay/>
                    <Loader/>
                </>
            }
        </>
    )
}
