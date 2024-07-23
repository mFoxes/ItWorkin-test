import { useAppSelector } from '../../../../shared/hooks/useAppSelector';
import { Todo } from '../todo/todo';
import './todoList.scss';

export const TodoList = () => {
    const todoList = useAppSelector((store) => store.home.todoList);

    return (
        <div className="todo-list">
            <div className="todo-list__container">
                {todoList.map((todo) => (
                    <Todo key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    );
};
