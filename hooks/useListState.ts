import { useReducer } from 'react';
import { Action, TodoItem } from 'types';
import { v4 as uuid } from 'uuid';
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
    default:
      throw new Error('Should not be here!');
  }
};

export const useListState = function () {
  const [state, dispatch] = useReducer(reducer, []);
  const safeDispatch = useSafeDispatch<Action>(dispatch);

  const addTodo = (todo: string) => {
    safeDispatch({ type: 'add', data: { todo } });
  };

  const removeTodo = (id: string) => {
    safeDispatch({ type: 'delete', data: { id } });
  };

  return { state, addTodo, removeTodo };
};
