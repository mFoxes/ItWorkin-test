import React, { MouseEvent, ReactNode } from 'react';
import './basicModal.scss';

interface BasicModal {
    title?: string;
    onClose?: () => void;
    children?: ReactNode;
    tools?: ReactNode;
}

export const BasicModal = ({ title, onClose, children, tools }: BasicModal) => {
    const handleBackgroundClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        onClose && onClose();
    };

    const handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        <div className="basic-modal" onClick={handleBackgroundClick}>
            <div className="basic-modal__container" onClick={handleContainerClick}>
                {title && <div className="basic-modal__title">{title}</div>}

                <div className="basic-modal__content">{children}</div>

                {tools && <div className="basic-modal__tools">{tools}</div>}
            </div>
        </div>
    );
};
