import { useListState } from 'hooks/useListState';
import styled from 'styled-components';
import { Input } from './Input';
import { TodoLists } from './TodoList';

export const Todos = function () {
  const { state: todoList, addTodo, removeTodo, toggleTodo } = useListState();
  const handleSubmit = (value: string) => {
    addTodo(value);
  };

  return (
    <Container>
      <Heading>Todos</Heading>
      <Input handleSubmit={handleSubmit} />
      <TodoLists
        todoList={todoList}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 1rem 0.4rem;
`;

const Heading = styled.h1`
  font-size: 3rem;
  margin: 0 0 1rem;
  padding: 0;
  text-align: center;
  color: var(--text-secondary);
`;
