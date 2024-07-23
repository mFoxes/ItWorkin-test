import moment from 'moment';
import { ReactComponent as DeleteSvg } from '../../../../assets/svg/delete.svg';
import { ReactComponent as EditSvg } from '../../../../assets/svg/edit.svg';
import { useAppDispatch } from '../../../../shared/hooks/useAppDispatch';
import { setCurrentTodo, setIsConfirmModalOpen, setIsTodoModalOpen } from '../../slices/homeSlice';
import { TodoData } from '../../types/todoData';
import './todo.scss';

interface TodoProps {
    todo: TodoData;
}

export const Todo = ({ todo }: TodoProps) => {
    const { title, description, createDate } = todo;

    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        await dispatch(setCurrentTodo(todo));
        dispatch(setIsConfirmModalOpen(true));
    };

    const handleEdit = async () => {
        await dispatch(setCurrentTodo(todo));
        dispatch(setIsTodoModalOpen(true));
    };

    return (
        <div className="todo">
            <div className="todo__title">{title}</div>
            <div className="todo__description">{description}</div>
            <div className="todo__bottom">
                <div className="todo__date">
                    Дата создания: {moment(createDate).format('DD.MM.YYYY')}
                </div>
                <div className="todo__tools">
                    <button className="todo__delete" onClick={handleDelete}>
                        <DeleteSvg />
                    </button>
                    <button className="todo__edit" onClick={handleEdit}>
                        <EditSvg />
                    </button>
                </div>
            </div>
        </div>
    );
};
