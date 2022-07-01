import modalsStyles from './ModalOverlay.module.css'
import {useDispatch} from "react-redux";
import {CLOSE_INGREDIENT_MODAL} from "../../services/actions/burger-ingredients";
import {CLOSE_ORDER_MODAL} from "../../services/actions/burger-constructor-ingredients";

const ModalOverlay = () => {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch({
            type: CLOSE_INGREDIENT_MODAL
        });
        dispatch({
            type: CLOSE_ORDER_MODAL
        });
    }

    return (
        <div className={modalsStyles.modalOverlay} onClick={handleClose}/>
    );
};

export default ModalOverlay;
