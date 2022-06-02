import modalsStyles from './ModalOverlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = ({onClick}) => {

    return (
        <div className={modalsStyles.modalOverlay} onClick={onClick}/>
    );
};

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default ModalOverlay;
