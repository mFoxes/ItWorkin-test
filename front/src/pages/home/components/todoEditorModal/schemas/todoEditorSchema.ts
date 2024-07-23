import * as Yup from 'yup';

export const todoEditorSchema = Yup.object().shape({
    title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    description: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    createDate: Yup.date().required('Required')
});
