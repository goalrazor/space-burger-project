import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import modalStyles from './Modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";

const modalsContainer = document.querySelector('#modals');

const Modal = ({title, onOverlayClick, onEscKeydown, children}) => {
    useEffect(() => {
        document.addEventListener('keydown', onEscKeydown);

        return () => {
            document.removeEventListener('keydown', onEscKeydown);
        };
    }, []);

    return ReactDOM.createPortal(
        (
            <>
                <div className={`${modalStyles.modalsContainer}`}>
                    <h3 className={'text text_type_main-large ml-10 mt-10'}>{title}</h3>
                    <div className={modalStyles.closeButton} onClick={onOverlayClick}>
                        <CloseIcon type="primary"/>
                    </div>
                    {children}
                </div>
                <ModalOverlay onClick={onOverlayClick}/>
            </>
        ),
        modalsContainer
    );
};

Modal.propTypes = {
    title: PropTypes.string,
    onOverlayClick: PropTypes.func.isRequired,
    onEskKeydown: PropTypes.func,
    children: PropTypes.element.isRequired
}

export default Modal;
