import React from 'react';
import './editorFormField.scss';
import { ErrorMessage, FormikValues, useField, useFormikContext } from 'formik';
import classNames from 'classnames';
import { EditorFormSettings } from '../../types/editorFormSettings';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface EditorFormField extends EditorFormSettings {}

export const EditorFormField = ({ name, title, fieldType }: EditorFormField) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta, helpers] = useField(name);

    const getInputByType = () => {
        switch (fieldType) {
            case 'date':
                return (
                    <DatePicker
                        className="editor-form-field__input"
                        {...field}
                        value={(field.value && new Date(field.value)) || null}
                        selected={(field.value && new Date(field.value)) || null}
                        onChange={(value) => setFieldValue(field.name, value?.toISOString())}
                    />
                );
            default:
                return <input className="editor-form-field__input" {...field} />;
        }
    };

    return (
        <div className={classNames('editor-form-field', { error: meta.touched && meta.error })}>
            <label htmlFor={name} className="editor-form-field__label">
                {title}
            </label>
            {getInputByType()}
            <div className="editor-form-field__error">
                <ErrorMessage name={name} component="div" />
            </div>
        </div>
    );
};
