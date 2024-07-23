import { EditorModal } from '../../../../shared/components/editorModal/editorModal';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { useAppSelector } from '../../../../shared/hooks/useAppSelector';
import { EditorFormSettings } from '../../../../shared/types/editorFormSettings';
import {
    createTodo,
    getTodoList,
    setCurrentTodo,
    setIsTodoModalOpen,
    updateTodo
} from '../../slices/homeSlice';
import { TodoData } from '../../types/todoData';
import { TodoDataCreate } from '../../types/todoDataCreate';
import { todoEditorSchema } from './schemas/todoEditorSchema';

interface TodoEditorModalProps {
    onSave?: () => void;
}

export const TodoEditorModal = ({ onSave }: TodoEditorModalProps) => {
    const dispatch = useAppDispatch();

    const currentTodo = useAppSelector((store) => store.home.currentTodo);
    const isEditorModalOpen = useAppSelector((store) => store.home.isEditorModalOpen);

    const isEditorLoading = useAppSelector((store) => store.home.isEditorLoading);

    const handleSave = async (data: TodoDataCreate) => {
        let resp = null;
        if (currentTodo !== null) {
            resp = await dispatch(
                updateTodo({ id: currentTodo.id, todo: { id: currentTodo.id, ...data } })
            );
        } else {
            resp = await dispatch(createTodo(data));
        }

        if (resp.meta.requestStatus === 'fulfilled') {
            await handleClose();
            onSave && onSave();
        }
    };

    const handleClose = async () => {
        await dispatch(setIsTodoModalOpen(false));
        if (currentTodo !== null) {
            await dispatch(setCurrentTodo(null));
        }
    };

    const settings: EditorFormSettings[] = [
        {
            title: 'Название',
            name: 'title'
        },
        {
            title: 'Описание',
            name: 'description'
        },
        {
            title: 'Дата создания',
            name: 'createDate',
            fieldType: 'date'
        }
    ];

    const initialValues: TodoDataCreate = {
        title: '',
        description: '',
        createDate: ''
    };

    if (!isEditorModalOpen) {
        return <></>;
    }

    return (
        <EditorModal<TodoDataCreate>
            title={currentTodo === null ? 'Создание' : 'Рекдактирование'}
            settings={settings}
            initialValues={currentTodo ?? initialValues}
            validationSchema={todoEditorSchema}
            onSave={handleSave}
            onClose={handleClose}
        />
    );
};
