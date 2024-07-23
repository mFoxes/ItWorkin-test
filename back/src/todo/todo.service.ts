import { Controller, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { Todo } from "./todo.model";
import { TodoDto } from "./dto/todo.dto";

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo) private todoRepository: typeof Todo) {}

    async getTodos() {
        const todos = await this.todoRepository.findAll({
            include: { all: true },
        });
        return todos;
    }

    async createTodo(dto: CreateTodoDto) {
        const todos = await this.todoRepository.create({
            ...dto,
        });
        return todos;
    }

    async updateTodo(id: string, dto: TodoDto) {
        const todo = await this.todoRepository
            .findOne({ where: { id: id } })
            .then(function (obj) {
                if (obj) return obj.update(dto);
                return Todo.create(dto);
            });
        return todo;
    }

    async deleteTodo(id: string) {
        const todo = await this.todoRepository.findOne({ where: { id: id } });

        await todo.destroy();
    }
}
