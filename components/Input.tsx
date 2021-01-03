import { ChangeEvent, FC, KeyboardEvent } from 'react';
import styled from 'styled-components';

type InputProp = {
  value: string;
  handleSubmit: (event: KeyboardEvent) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

type StyledProps = {
  value: string;
};

export const Input: FC<InputProp> = function ({
  value,
  handleSubmit,
  handleChange,
}) {
  return (
    <FormContainer>
      <StyledInput
        id='todo-input'
        onKeyUp={handleSubmit}
        onChange={handleChange}
        value={value}
        autoComplete='new-password'
      />
      <Label htmlFor='todo-input' className='label' value={value}>
        Add Todo
      </Label>
      <Underline value={value} />
    </FormContainer>
  );
};

const FormContainer = styled.div`
  position: sticky;
  height: 3.5rem;
  width: 30rem;
  margin: 0 auto;
  top: -1px;
  background-color: var(--bg);
  z-index: 100;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  height: 3rem;
  background: transparent;
  border: 0;
  color: var(--text-primary);
  font-size: 2rem;
  position: absolute;
  top: 0;
  left: 0;

  &:focus,
  &:active {
    outline: 0;
  }

  &:focus ~ div,
  &:active ~ div {
    background-color: var(--text-secondary);
    transform: translateY(5px);
  }

  &:focus ~ label,
  &:active ~ label {
    transform: translateY(-2rem) scale(0.8) translateX(-1rem);
  }
`;

const Label = styled.label<StyledProps>`
  position: absolute;
  top: 0;
  left: 0;
  color: var(--text-secondary);
  font-size: 2rem;
  transition: transform 200ms ease;
  transform: ${(props) =>
    props.value ? 'translateY(-2rem) scale(0.8) translateX(-1rem)' : ''};
  pointer-events: none;
`;

const Underline = styled.div<StyledProps>`
  height: 0.1rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: auto;
  transition: all 200ms ease-out;
  background-color: ${(props) =>
    props.value ? 'var(--text-secondary)' : '#666'};
  transform: ${(props) => (props.value ? 'translateY(5px)' : '')};
`;
