import React, { useEffect, useState } from 'react';
import './home.scss';
import { TodoList } from './components/todoList/todoList';
import { useAppDispatch } from '../../shared/hooks/useAppDispatch';
import { getTodoList, setInitialState, setIsTodoModalOpen } from './slices/homeSlice';
import { TodoEditorModal } from './components/todoEditorModal/todoEditorModal';
import { TodoConfirmModal } from './components/todoConfirmationModal/todoConfirmationModal';
import { useAppSelector } from '../../shared/hooks/useAppSelector';
import { LoadingState } from '../../shared/constants/loadingState';

export const Home = () => {
    const dispatch = useAppDispatch();

    const isLoading = useAppSelector((state) => state.home.isLoading);

    const handleTodoCreate = () => {
        dispatch(setIsTodoModalOpen(true));
    };

    const handleTodoSave = () => {
        loadData();
    };

    const handleTodoDelete = () => {
        loadData();
    };

    const loadData = () => {
        dispatch(getTodoList());
    };

    useEffect(() => {
        loadData();
        return () => {
            dispatch(setInitialState());
        };
    }, []);

    if (isLoading === LoadingState.Pending) {
        return <>Loading...</>;
    }

    return (
        <>
            <div className="main">
                <div className="main__tools">
                    <button onClick={handleTodoCreate} className="main__btn-create">
                        Создать
                    </button>
                </div>
                <TodoList />
            </div>
            <TodoEditorModal onSave={handleTodoSave} />
            <TodoConfirmModal onConfirm={handleTodoDelete} />
        </>
    );
};
