import React from 'react';
import { ModalStyles } from './ModalStyles';
import { IoCloseSharp } from 'react-icons/io5';

const Modal = ({children, isOpen, closeModal, type, ...otherProps}) => {

    const handleModalContainerClick = e => e.stopPropagation();

    return (
        <ModalStyles 
            isOpen={isOpen} 
            onClick={otherProps.important ? null : closeModal} 
            minWidth={otherProps.minWidth}
            maxWidth={otherProps.maxWidth}
            minHeight={otherProps.minHeight}
            maxHeight={otherProps.maxHeight}
            background={otherProps.background}
            color={otherProps.color}
        >
            <div className="modal-container" onClick={handleModalContainerClick}>
                { type === 'cancel' && <div className="modal-close-text" onClick={closeModal}>Cancelar</div> }
                { type === 'close' && <button className="modal-close" onClick={closeModal}><IoCloseSharp /></button> }
                {children}
            </div>
        </ModalStyles>
    )
}

export default Modal;