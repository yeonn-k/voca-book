import React from 'react';
import { createPortal } from 'react-dom';

import ModalContainer from '../components/modal/ModalContainer';

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const useModal = ({ children }: ModalProps) => {
    const container = document.getElementById('modal-root')!;
    return createPortal(<ModalContainer>{children}</ModalContainer>, container);
};

export default useModal;
