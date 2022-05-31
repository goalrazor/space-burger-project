import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import modalStyles from './Modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'

const modalsContainer = document.querySelector('#modals');

const Modal = ({title, onOverlayClick, onEscKeydown, children}) => {
    // При монтировании компонента (открытии модалки) навешиваем на document обработчик Esc
    // При демонтаже компонента (закрытии модалки) удаляем обработчик
    useEffect(() => {
        document.addEventListener('keydown', onEscKeydown);

        return () => {
            document.removeEventListener('keydown', onEscKeydown);
        };
    }, []);

    // Рендерим модалку в соответствующий DOM-элемент
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

export default Modal;
