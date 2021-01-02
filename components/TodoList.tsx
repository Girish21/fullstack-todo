import { FC } from 'react';
import styled from 'styled-components';
import { TodoItem } from 'types';

type TodoListProps = {
  todoList: TodoItem[];
  removeTodo: (id: string) => void;
};

export const TodoLists: FC<TodoListProps> = function ({
  todoList,
  removeTodo,
}) {
  return (
    <TodoList>
      {todoList.map(({ id, todo }) => (
        <TodoListItem key={id} onClick={() => removeTodo(id)}>
          {todo}
        </TodoListItem>
      ))}
    </TodoList>
  );
};

const TodoList = styled.ul`
  padding: 8px 0;
  margin: 1rem auto;
  list-style: none;
  width: 35rem;
`;

const TodoListItem = styled.li`
  margin: 0 0 1rem;
  padding: 1rem;
  color: var(--text-primary);
  border: 0.1rem solid var(--divider);
`;
