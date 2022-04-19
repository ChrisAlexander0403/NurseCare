import { useState } from 'react';

const useModal = (initialValue, action) => {
    const [isOpen, setIsOpen] = useState(initialValue ? initialValue : false);
    
    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        if (action) action(-1);
        setIsOpen(false);
    }

    return [isOpen, openModal, closeModal];
}

export default useModal;