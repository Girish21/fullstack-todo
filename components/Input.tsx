import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { MdCheckBox, MdImage } from 'react-icons/md';
import styled from 'styled-components';
import { IconButton } from './Button';
import { ClickAwayListener } from './ClickAwayListener';

type InputProp = {
  value: string;
  handleSubmit: (event: KeyboardEvent) => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

type EditableTextAreaType = {
  focused: boolean;
  setFocus: (state: boolean) => void;
};

type NoteTextfieldType = {
  focused: boolean;
};

const EditableTextArea: FC<EditableTextAreaType> = function ({
  setFocus,
  focused,
}) {
  return (
    <NoteTextfield
      focused={focused}
      role='textarea'
      contentEditable
      onClick={() => setFocus(true)}
      onFocus={() => setFocus(true)}
    />
  );
};

export const Input: FC<InputProp> = function ({
  value,
  handleSubmit,
  handleChange,
}) {
  const [focused, setFocused] = useState(false);

  const setFocusState = (state: boolean) => setFocused(state);

  return (
    <ClickAwayListener onClickAway={() => setFocusState(false)}>
      <FormContainer>
        <EditableTextArea setFocus={setFocusState} focused={focused} />
        <ButtonContainer>
          <IconButton opacity={0.6}>
            <MdCheckBox />
          </IconButton>
          <IconButton opacity={0.6}>
            <MdImage />
          </IconButton>
        </ButtonContainer>
      </FormContainer>
    </ClickAwayListener>
  );
};

const FormContainer = styled.div`
  width: 35rem;
  margin: 0 auto;
  background-color: var(--bg);
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--divider);
  border-radius: 8px;
  padding: 0 1rem;
`;

const NoteTextfield = styled.div<NoteTextfieldType>`
  flex: 1;
  cursor: text;
  display: block;
  overflow: hidden;

  &:empty::before {
    content: 'Take a note...';
    color: inherit;
    opacity: 0.8;
    font-size: ${(props) => (props.focused ? '0.875rem' : '1rem')};
  }

  &:active,
  &:focus {
    outline: 0;
  }
`;

const ButtonContainer = styled.div`
  & button {
    margin-right: 8px;

    &:last-of-type {
      margin: 0;
    }
  }
`;
