import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { todoApi } from '../apis/todoApi';
import { TodoData } from '../types/todoData';
import { LoadingState } from '../../../shared/constants/loadingState';
import { TodoDataCreate } from '../types/todoDataCreate';
import { toast } from 'react-toastify';

const sliceName = 'home';

interface initialState {
    todoList: TodoData[];
    currentTodo: TodoData | null;

    isEditorModalOpen: boolean;
    isConfirmModalOpen: boolean;

    isLoading: LoadingState;
    isEditorLoading: LoadingState;
    isConfirmLoading: LoadingState;
}

const initialState: initialState = {
    todoList: [],
    currentTodo: null,

    isEditorModalOpen: false,
    isConfirmModalOpen: false,

    isEditorLoading: LoadingState.Empty,
    isConfirmLoading: LoadingState.Empty,
    isLoading: LoadingState.Empty
};

export const getTodoList = createAsyncThunk<TodoData[]>(
    `${sliceName}/getTodoList`,
    async (_, thunkAPI) => {
        try {
            const response = await todoApi.getTodoList();
            return response.data;
        } catch {
            console.log('error');
            toast.error('Ошибка сервера', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
            return thunkAPI.rejectWithValue('Error!');
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
            toast.error('Ошибка сервера', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
            return thunkAPI.rejectWithValue('Error!');
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
            toast.error('Ошибка сервера', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
            return thunkAPI.rejectWithValue('Error!');
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
            toast.error('Ошибка сервера', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            });
            return thunkAPI.rejectWithValue('Error!');
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

        builder.addCase(createTodo.pending, (state) => {
            state.isEditorLoading = LoadingState.Pending;
        });
        builder.addCase(createTodo.fulfilled, (state) => {
            state.isEditorLoading = LoadingState.Fulfilled;
        });
        builder.addCase(createTodo.rejected, (state) => {
            state.isEditorLoading = LoadingState.Rejected;
        });

        builder.addCase(updateTodo.pending, (state) => {
            state.isEditorLoading = LoadingState.Pending;
        });
        builder.addCase(updateTodo.fulfilled, (state) => {
            state.isEditorLoading = LoadingState.Fulfilled;
        });
        builder.addCase(updateTodo.rejected, (state) => {
            state.isEditorLoading = LoadingState.Rejected;
        });

        builder.addCase(deleteTodo.pending, (state) => {
            state.isConfirmLoading = LoadingState.Pending;
        });
        builder.addCase(deleteTodo.fulfilled, (state) => {
            state.isConfirmLoading = LoadingState.Fulfilled;
        });
        builder.addCase(deleteTodo.rejected, (state) => {
            state.isConfirmLoading = LoadingState.Rejected;
        });
    }
});

export const { setInitialState, setIsTodoModalOpen, setIsConfirmModalOpen, setCurrentTodo } =
    homeSlice.actions;

export default homeSlice.reducer;
