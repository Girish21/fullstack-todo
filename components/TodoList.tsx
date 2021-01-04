import { FC, MouseEvent } from 'react';
import styled from 'styled-components';
import { TodoItem } from 'types';

type TodoListProps = {
  todoList: TodoItem[];
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
};

type StyledDone = {
  done: boolean;
};

export const TodoLists: FC<TodoListProps> = function ({
  todoList,
  removeTodo,
  toggleTodo,
}) {
  const deleteHandler = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    removeTodo(id);
  };

  return (
    <TodoList>
      {todoList.map(({ id, todo, done }) => (
        <TodoListItem key={id} onClick={() => toggleTodo(id)}>
          <TodoText done={done}>{todo}</TodoText>
          <TodoDelete onClick={(e) => deleteHandler(e, id)}>X</TodoDelete>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoText = styled.div<StyledDone>`
  min-width: 0;
  flex: 1;
  text-decoration: ${(props) => (props.done ? 'line-through' : 'none')};
  white-space: pre;
`;

const TodoDelete = styled.button`
  background-color: var(--error);
  color: var(--text-primary);
  border: 0;
  padding: 0.2rem 0.8rem;
  font-size: 1rem;
  border-radius: 2px;
  cursor: pointer;

  &:focus,
  &:active {
    outline: 0;
  }
`;
