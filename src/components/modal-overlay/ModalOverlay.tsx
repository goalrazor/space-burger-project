import React from 'react'
import modalsStyles from './ModalOverlay.module.css'

const ModalOverlay = ({handleClose}: { handleClose?: () => void }) => {
    return (
        <div className={modalsStyles.modalOverlay} onClick={handleClose}/>
    );
};

export default ModalOverlay;
