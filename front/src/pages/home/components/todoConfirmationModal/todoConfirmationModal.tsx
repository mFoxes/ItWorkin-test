import React from 'react';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { deleteTodo, setCurrentTodo, setIsConfirmModalOpen } from '../../slices/homeSlice';
import { useAppSelector } from '../../../../shared/hooks/useAppSelector';
import { ConfirmModal } from '../../../../shared/components/confirmModal/confirmModal';

interface TodoConfirmModalProps {
    onConfirm?: () => void;
}

export const TodoConfirmModal = ({ onConfirm }: TodoConfirmModalProps) => {
    const dispatch = useAppDispatch();

    const currentTodo = useAppSelector((store) => store.home.currentTodo);
    const isConfirmModalOpen = useAppSelector((store) => store.home.isConfirmModalOpen);

    const handleConfirm = async () => {
        if (currentTodo) {
            const resp = await dispatch(deleteTodo(currentTodo.id));
            if (resp.meta.requestStatus === 'fulfilled') {
                handleClose();
                dispatch(setCurrentTodo(null));
                onConfirm && onConfirm();
            }
        }
    };

    const handleClose = () => {
        dispatch(setIsConfirmModalOpen(false));
    };

    if (!isConfirmModalOpen) {
        return <></>;
    }

    return (
        <ConfirmModal title="Подтверждение" onConfirm={handleConfirm} onClose={handleClose}>
            Вы действительно хотите удалить запись?
        </ConfirmModal>
    );
};
