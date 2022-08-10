import React from 'react'
import modalsStyles from './ModalOverlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = ({handleClose}) => {
    return (
        <div className={modalsStyles.modalOverlay} onClick={handleClose}/>
    );
};

ModalOverlay.propTypes = {
    handleClose: PropTypes.func.isRequired
}

export default ModalOverlay;
