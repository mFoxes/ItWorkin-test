import React, { ReactNode } from 'react';
import { BasicModal } from '../basicModal/basicModal';
import { BasicModalButton } from '../basicModalButton/basicModalButton';

interface ConfirmModalProps {
    title?: string;
    onConfirm?: () => void;
    onClose?: () => void;
    children?: ReactNode;
}

export const ConfirmModal = ({ title, onConfirm, onClose, children }: ConfirmModalProps) => {
    const handleConfirm = () => {
        onConfirm && onConfirm();
    };

    const handleClose = () => {
        onClose && onClose();
    };

    const tools = (
        <>
            <BasicModalButton className="cancel" onClick={handleClose}>
                Отмена
            </BasicModalButton>
            <BasicModalButton className="confirm" onClick={handleConfirm}>
                Подтвердить
            </BasicModalButton>
        </>
    );

    return (
        <BasicModal title={title} onClose={handleClose} tools={tools}>
            {children}
        </BasicModal>
    );
};
