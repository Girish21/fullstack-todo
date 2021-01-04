import {
  ComponentPropsWithRef,
  FC,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from 'react';
import { MdCheckBox, MdImage } from 'react-icons/md';
import styled, { StyledComponent } from 'styled-components';
import { IconButton } from './Button';
import { ClickAwayListener } from './ClickAwayListener';

type InputProp = {
  handleSubmit: (value: string) => void;
};

type NoteTextfieldType = {
  focused?: boolean;
};

type EditableTextAreaType = {
  focused: boolean;
  setFocus?: (state: boolean) => void;
  Component: StyledComponent<'div', any, NoteTextfieldType, never>;
} & ComponentPropsWithRef<'div'>;

const EditableTextArea = forwardRef<HTMLDivElement, EditableTextAreaType>(
  function EditableTextArea({ setFocus, focused, Component, ...props }, ref) {
    return (
      <Component
        {...props}
        ref={ref}
        focused={focused}
        role='textarea'
        contentEditable
        onClick={() => (setFocus ? setFocus(true) : undefined)}
        onFocus={() => (setFocus ? setFocus(true) : undefined)}
      />
    );
  },
);

export const Input: FC<InputProp> = function ({ handleSubmit }) {
  const [focused, setFocused] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const titleRefCallback = useCallback((ele: HTMLDivElement) => {
    titleRef.current = ele;
  }, []);

  const bodyRefCallback = useCallback((ele: HTMLDivElement) => {
    bodyRef.current = ele;
  }, []);

  const setFocusState = (state: boolean) => setFocused(state);

  const checkFocus = () => {
    if (
      (titleRef.current !== null && titleRef.current.innerText.length !== 0) ||
      (bodyRef.current !== null && bodyRef.current.innerText.length !== 0)
    ) {
      handleSubmit(bodyRef.current.innerText);
      bodyRef.current.innerText = '';
    }
    setFocused(false);
  };

  return (
    <FormContainer onClickAway={checkFocus}>
      {focused && (
        <EditableTextArea
          Component={TitleTextfield}
          focused={focused}
          ref={titleRefCallback}
        />
      )}
      <Container>
        <EditableTextArea
          Component={NoteTextfield}
          setFocus={setFocusState}
          focused={focused}
          ref={bodyRefCallback}
        />
        {!focused && (
          <ButtonContainer>
            <IconButton opacity={0.6}>
              <MdCheckBox />
            </IconButton>
            <IconButton opacity={0.6}>
              <MdImage />
            </IconButton>
          </ButtonContainer>
        )}
      </Container>
    </FormContainer>
  );
};

const FormContainer = styled(ClickAwayListener)`
  width: 35rem;
  margin: 0 auto;
  background-color: var(--bg);
  position: relative;
  border: 1px solid var(--divider);
  border-radius: 8px;
  padding: 0 1rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditableField = styled.div<NoteTextfieldType>`
  flex: 1;
  cursor: text;
  display: block;
  overflow: hidden;

  &:active,
  &:focus {
    outline: 0;
  }
`;

const NoteTextfield = styled(EditableField)`
  margin: ${(props) => (props.focused ? '1rem 0' : '')};
  font-size: 1rem;

  &:empty::before {
    content: 'Take a note...';
    color: inherit;
    opacity: 0.8;
    font-size: ${(props) => (props.focused ? '0.875rem' : '1rem')};
  }
`;

const TitleTextfield = styled(EditableField)`
  margin-top: 1rem;
  font-size: 1.2rem;

  &:empty::before {
    content: 'Title';
    font-size: '1.5rem';
    font-weight: 500;
    color: var(--text-alt);
    opacity: 0.6;
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
