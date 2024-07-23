import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from "@nestjs/common";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { TodoService } from "./todo.service";
import { TodoDto } from "./dto/todo.dto";
import { Todo as TodoModelDto } from "./todo.model";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Todos")
@Controller("api/todos")
export class TodoController {
    constructor(private postService: TodoService) {}

    @Get()
    @ApiOperation({ summary: "Получение всех todo" })
    @ApiResponse({ status: 200, type: [TodoModelDto] })
    getTodos() {
        return this.postService.getTodos();
    }

    @Post()
    @ApiOperation({ summary: "Создание todo" })
    @ApiResponse({ status: 200, type: TodoModelDto })
    createTodo(@Body() dto: CreateTodoDto) {
        return this.postService.createTodo(dto);
    }

    @Put()
    @ApiOperation({ summary: "Обновление todo" })
    @ApiResponse({ status: 200, type: TodoModelDto })
    updateTodo(@Body() dto: TodoDto, @Query() query: { id: string }) {
        return this.postService.updateTodo(query.id, dto);
    }

    @Delete()
    @ApiOperation({ summary: "Удалить todo" })
    @ApiResponse({ status: 200 })
    deleteTodo(@Query() query: { id: string }) {
        console.log("query", query);
        return this.postService.deleteTodo(query.id);
    }
}
