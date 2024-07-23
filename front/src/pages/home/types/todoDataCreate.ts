import { TodoData } from './todoData';

export interface TodoDataCreate extends Omit<TodoData, 'id'> {}
