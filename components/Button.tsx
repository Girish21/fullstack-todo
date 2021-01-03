import styled from 'styled-components';

type IconButtonType = {
  large?: boolean;
  small?: boolean;
  opacity?: number;
};

export const BaseButton = styled.button`
  color: var(--text-primary);
  display: inline-flex;
  border: 0;
  outline: 0;
  padding: 0;
  margin: 0;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
  background-color: transparent;
`;

export const IconButton = styled(BaseButton)<IconButtonType>`
  flex: 0;
  padding: 12px;
  text-align: center;
  border-radius: 50%;
  transition: background-color 300ms ease;
  overflow: visible;

  &:hover {
    background-color: var(--button-hover);
  }

  & svg {
    font-size: ${(props) =>
      props.large ? '1.5rem' : props.small ? '0.875rem' : '1rem'};
    opacity: ${(props) => props.opacity || 1};
  }
`;
