import { useListState } from 'hooks/useListState';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import { Input } from './Input';
import { TodoLists } from './TodoList';

export const Todos = function () {
  const [value, setValue] = useState('');
  const { state: todoList, addTodo, removeTodo, toggleTodo } = useListState();
  const handleSubmit = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      addTodo(value);
      setValue('');
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Container>
      <Heading>Todos</Heading>
      <Input
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        value={value}
      />
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
