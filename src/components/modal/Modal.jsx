import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import modalStyles from './Modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {CLOSE_INGREDIENT_MODAL} from "../../services/actions/burger-ingredients";
import {CLOSE_ORDER_MODAL} from "../../services/actions/burger-constructor-ingredients";

const modalsContainer = document.querySelector('#modals');

const Modal = ({title, children}) => {
    const dispatch = useDispatch();

    const closeModals = () => {
        dispatch({
            type: CLOSE_INGREDIENT_MODAL
        });
        dispatch({
            type: CLOSE_ORDER_MODAL
        });
    }

    useEffect(() => {
        document.addEventListener('keydown', closeModals);

        return () => {
            document.removeEventListener('keydown', closeModals);
        };
    }, []);

    return ReactDOM.createPortal(
        (
            <>
                <div className={`${modalStyles.modalsContainer}`}>
                    <h3 className={'text text_type_main-large ml-10 mt-10'}>{title}</h3>
                    <div className={modalStyles.closeButton} onClick={closeModals}>
                        <CloseIcon type="primary"/>
                    </div>
                    {children}
                </div>
                <ModalOverlay/>
            </>
        ),
        modalsContainer
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired
}

export default Modal;
