import { Formik, FormikValues } from 'formik';
import React, { ReactNode } from 'react';
import * as Yup from 'yup';
import { EditorFormSettings } from '../../types/editorFormSettings';
import { EditorFormField } from '../editorFormField/editorFormField';
import './editorForm.scss';

interface EditorFormProps<T> {
    initialValues: T;
    validationSchema?: Yup.AnyObjectSchema;
    settings: EditorFormSettings[];
    onSubmit: (data: T) => void;
    children?: ReactNode;
    isLoading?: boolean;
}

export const EditorForm = <T extends FormikValues>({
    initialValues,
    validationSchema,
    settings,
    onSubmit,
    children,
    isLoading
}: EditorFormProps<T>) => {
    const handleSubmit = (data: T) => {
        onSubmit && onSubmit(data);
    };

    return (
        <Formik<T>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="editor-form">
                    <div className="editor-form__fields">
                        {settings.map((i) => (
                            <EditorFormField isLoading={isLoading} {...i} />
                        ))}
                    </div>
                    <div className="editor-form__tools">{children}</div>
                </form>
            )}
        </Formik>
    );
};
