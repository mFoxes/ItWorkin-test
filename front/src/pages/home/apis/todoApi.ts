import { appAxios } from '../../../shared/apis/appAxios';
import { TodoData } from '../types/todoData';
import { TodoDataCreate } from '../types/todoDataCreate';

export const todoApi = {
    getTodoList: async () => {
        return await appAxios.get('api/todos');
    },
    createTodo: async (data: TodoDataCreate) => {
        return await appAxios.post('api/todos', data);
    },
    updateTodo: async (id: number, data: TodoData) => {
        return await appAxios.put('api/todos', data, { params: { id } });
    },
    deleteTodo: async (id: number) => {
        return await appAxios.delete('api/todos', { params: { id } });
    }
};
