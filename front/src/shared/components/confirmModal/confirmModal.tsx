import React, { ReactNode } from 'react';
import { BasicModal } from '../basicModal/basicModal';
import { BasicModalButton } from '../basicModalButton/basicModalButton';
import { LoadingState } from '../../constants/loadingState';

interface ConfirmModalProps {
    title?: string;
    isLoading?: boolean;
    onConfirm?: () => void;
    onClose?: () => void;
    children?: ReactNode;
}

export const ConfirmModal = ({
    title,
    isLoading = false,
    onConfirm,
    onClose,
    children
}: ConfirmModalProps) => {
    const handleConfirm = () => {
        onConfirm && onConfirm();
    };

    const handleClose = () => {
        if (!isLoading) {
            onClose && onClose();
        }
    };

    const tools = (
        <>
            <BasicModalButton disabled={isLoading} className="cancel" onClick={handleClose}>
                Отмена
            </BasicModalButton>
            <BasicModalButton disabled={isLoading} className="confirm" onClick={handleConfirm}>
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
