import styled from 'styled-components/native';
import { TextInput } from 'react-native-gesture-handler';

interface InputContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<InputContainerProps>`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 48px;

  padding: 4px 16px;
  border: 1px solid #bbb;
  border-color: ${props => (props.isFocused ? '#fcc735' : '#bbb')};
  border-radius: 4px;

  background: #bbb;
`;

export const StyledInput = styled(TextInput)`
  margin-left: 8px;

  font-size: 16px;
  color: #444;
`;
