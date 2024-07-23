import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { todoApi } from '../apis/todoApi';
import { TodoData } from '../types/todoData';
import { LoadingState } from '../../../shared/constants/loadingState';
import { TodoDataCreate } from '../types/todoDataCreate';

const sliceName = 'home';

interface initialState {
    todoList: TodoData[];
    currentTodo: TodoData | null;

    isEditorModalOpen: boolean;
    isConfirmModalOpen: boolean;

    isLoading: LoadingState;
}

const initialState: initialState = {
    todoList: [],
    currentTodo: null,

    isEditorModalOpen: false,
    isConfirmModalOpen: false,

    isLoading: LoadingState.Empty
};

export const getTodoList = createAsyncThunk<TodoData[]>(
    `${sliceName}/getTodoList`,
    async (_, thunkAPI) => {
        try {
            const response = await todoApi.getTodoList();
            return response.data;
        } catch {
            thunkAPI.rejectWithValue('Error!');
        }
    }
);

export const createTodo = createAsyncThunk<void, TodoDataCreate>(
    `${sliceName}/createTodo`,
    async (params, thunkAPI) => {
        try {
            const response = await todoApi.createTodo(params);
            return response.data;
        } catch {
            thunkAPI.rejectWithValue('Error!');
        }
    }
);

export const updateTodo = createAsyncThunk<void, { id: number; todo: TodoData }>(
    `${sliceName}/updateTodo`,
    async (params, thunkAPI) => {
        try {
            const { id, todo } = params;
            const response = await todoApi.updateTodo(id, todo);
            return response.data;
        } catch {
            thunkAPI.rejectWithValue('Error!');
        }
    }
);

export const deleteTodo = createAsyncThunk<void, number>(
    `${sliceName}/deleteTodo`,
    async (params, thunkAPI) => {
        try {
            const response = await todoApi.deleteTodo(params);
            return response.data;
        } catch {
            thunkAPI.rejectWithValue('Error!');
        }
    }
);

export const homeSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setInitialState: () => {
            return initialState;
        },
        setIsTodoModalOpen: (state, action) => {
            state.isEditorModalOpen = action.payload;
        },
        setIsConfirmModalOpen: (state, action) => {
            state.isConfirmModalOpen = action.payload;
        },
        setCurrentTodo: (state, action) => {
            state.currentTodo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTodoList.pending, (state) => {
            state.isLoading = LoadingState.Pending;
        });
        builder.addCase(getTodoList.fulfilled, (state, action) => {
            state.todoList = action.payload;
            state.isLoading = LoadingState.Fulfilled;
        });
        builder.addCase(getTodoList.rejected, (state) => {
            state.isLoading = LoadingState.Rejected;
        });
    }
});

export const { setInitialState, setIsTodoModalOpen, setIsConfirmModalOpen, setCurrentTodo } =
    homeSlice.actions;

export default homeSlice.reducer;
