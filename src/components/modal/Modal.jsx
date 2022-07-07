import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import modalStyles from './Modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";

const modalsContainer = document.querySelector('#modals');

const Modal = ({title, children, handleClose, handleEscKeydown}) => {
    const closeModals = () => {
        handleClose()
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);

        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
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
                <ModalOverlay handleClose={closeModals}/>
            </>
        ),
        modalsContainer
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleEscKeydown: PropTypes.func.isRequired
}

export default Modal;
