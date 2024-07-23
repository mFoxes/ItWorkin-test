import React, { ReactNode } from 'react';
import { BasicModal } from '../basicModal/basicModal';
import { BasicModalButton } from '../basicModalButton/basicModalButton';
import { EditorForm } from '../editorForm/editorForm';
import { FormikValues } from 'formik';
import * as Yup from 'yup';
import { EditorFormSettings } from '../../types/editorFormSettings';

interface EditorModalProps<T> {
    title?: string;
    initialValues: T;
    validationSchema?: Yup.AnyObjectSchema;
    settings: EditorFormSettings[];
    onSave?: (data: T) => void;
    onClose?: () => void;
}

export const EditorModal = <T extends FormikValues>({
    title,
    initialValues,
    validationSchema,
    settings,
    onSave,
    onClose
}: EditorModalProps<T>) => {
    const handleClose = () => {
        onClose && onClose();
    };

    const handleSubmit = (data: T) => {
        onSave && onSave(data);
    };

    const tools = (
        <>
            <BasicModalButton className="cancel" onClick={handleClose}>
                Отмена
            </BasicModalButton>
            <BasicModalButton className="save" type="submit">
                Сохранить
            </BasicModalButton>
        </>
    );

    return (
        <BasicModal title={title} onClose={handleClose}>
            <EditorForm
                settings={settings}
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={handleSubmit}>
                {tools}
            </EditorForm>
        </BasicModal>
    );
};
