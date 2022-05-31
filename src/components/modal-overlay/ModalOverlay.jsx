import modalsStyles from './ModalOverlay.module.css'

const ModalOverlay = ({onClick}) => {
    // пропс onClick - это колбэк для клика по подложке, который закрывает модальное окно

    return (
        <div className={modalsStyles.modalOverlay} onClick={onClick}/>
    );
};

export default ModalOverlay;
