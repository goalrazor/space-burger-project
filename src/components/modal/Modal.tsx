import React, {FC, useEffect} from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import modalStyles from './Modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {useHistory} from "react-router-dom";
import {useDispatch} from "../../services/hooks/hooks";
import {CLOSE_ORDER_MODAL} from "../../services/actions/burger-constructor-ingredients";

const modalsContainer: Element = document.querySelector('#modals') as Element;

interface IModalProps {
    title: string,
    handleClose: () => void
}

const Modal: FC<IModalProps> = ({title, children, handleClose}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const closeModals = () => {
        history.goBack()
        dispatch({
            type: CLOSE_ORDER_MODAL
        })
    }

    const handleEscKeydown = (e: KeyboardEvent) => {
        e.key === "Escape" && handleClose();
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEscKeydown);

        return () => {
            document.removeEventListener('keydown', handleEscKeydown);
        };
        // eslint-disable-next-line
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

export default Modal;
