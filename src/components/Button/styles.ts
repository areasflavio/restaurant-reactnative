import styled from 'styled-components/native';

interface ButtonProps {
  type: 'success' | 'regular';
}

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<ButtonProps>`
  flex-direction: row;
  align-items: center;

  border-radius: 8px;

  background: ${props => (props.type === 'success' ? '#3ABC4B' : '#fcc735')};
`;

export const ButtonText = styled.Text`
  flex: 1;

  font-family: 'Poppins-Medium';
  font-size: 16px;
  line-height: 22px;
  text-align: center;
`;

export const IconContainer = styled.View<ButtonProps>`
  padding: 16px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  background: ${props => (props.type === 'success' ? '#67D66B' : '#fddb7e')};
`;
