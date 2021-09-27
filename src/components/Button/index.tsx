import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import { Container, ButtonText, IconContainer } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  icon: string;
  type: 'success' | 'regular';
}

const Button: React.FC<ButtonProps> = ({ children, icon, type, ...rest }) => {
  return (
    <Container type={type} {...rest}>
      <ButtonText style={{ color: type === 'success' ? '#fff' : '#000' }}>
        {children}
      </ButtonText>

      <IconContainer type={type}>
        <Icon
          name={icon}
          size={24}
          color={type === 'success' ? '#fff' : '#000'}
        />
      </IconContainer>
    </Container>
  );
};

export default Button;
