import { useEffect, useReducer } from 'react';
import { Action, TodoItem } from 'types';
import { v4 as uuid } from 'uuid';
import { useIsMounted } from './useIsMounted';
import { useSafeDispatch } from './useSafeDispatch';

const reducer: (
  state: TodoItem[] | [],
  action: Action,
) => TodoItem[] | [] = function (state, action) {
  switch (action.type) {
    case 'add':
      return [{ id: uuid(), done: false, todo: action.data.todo }, ...state];
    case 'delete': {
      if (state.length === 0) return state;

      const index = state.findIndex(
        (todo) => (todo as TodoItem).id === action.data.id,
      );
      return [...state.slice(0, index), ...state.slice(index + 1)];
    }
    case 'toggle_done': {
      if (state.length === 0) return state;

      const index = state.findIndex(
        (todo) => (todo as TodoItem).id === action.data.id,
      );
      const updatedTodo = { ...state[index], done: !state[index].done };
      return [...state.slice(0, index), updatedTodo, ...state.slice(index + 1)];
    }
    case 'init':
      return [...action.data];
    default:
      throw new Error('Should not be here!');
  }
};

export const useListState = function () {
  const mounted = useIsMounted();
  const [state, dispatch] = useReducer(reducer, []);
  const safeDispatch = useSafeDispatch<Action>(dispatch);

  useEffect(() => {
    safeDispatch({
      type: 'init',
      data: JSON.parse(window.localStorage.getItem('todos')) || [],
    });
  }, []);

  useEffect(() => {
    if (mounted) window.localStorage.setItem('todos', JSON.stringify(state));
  }, [state]);

  const addTodo = (todo: string) => {
    safeDispatch({ type: 'add', data: { todo } });
  };

  const removeTodo = (id: string) => {
    safeDispatch({ type: 'delete', data: { id } });
  };

  const toggleTodo = (id: string) => {
    safeDispatch({ type: 'toggle_done', data: { id } });
  };

  return { state, addTodo, removeTodo, toggleTodo };
};
