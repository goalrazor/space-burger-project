import Modal from "../../components/modal/Modal";
import React from "react";
import OrderDetails from "../../components/order-details/OrderDetails";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

export function SendOrderModalPage({handleClose, handleEscKeydown}) {
    const isOrderDetailsModalShown = useSelector(store => store.orderDetailsReducer.orderModalShown)
    return (
        <>
            {isOrderDetailsModalShown &&
                <Modal title=""
                       handleClose={() => {
                           handleClose()
                       }}
                       handleEscKeydown={(e) => {
                           handleEscKeydown(e)
                       }}>
                    <OrderDetails/>
                </Modal>
            }
        </>
    )
}

SendOrderModalPage.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleEscKeydown: PropTypes.func.isRequired,
}
