import classNames from 'classnames';
import { DetailedHTMLProps, HtmlHTMLAttributes, MouseEvent } from 'react';
import './basicModalButton.scss';

interface BasicModalButtonProps
    extends DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const BasicModalButton = ({ className, type, onClick, children }: BasicModalButtonProps) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        onClick && onClick(e);
    };

    return (
        <button
            className={classNames('basic-modal__btn', className)}
            type={type}
            onClick={handleClick}>
            {children}
        </button>
    );
};
