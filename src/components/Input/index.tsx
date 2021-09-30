import React, { useCallback, useState } from 'react';
import { TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, StyledInput } from './styles';

interface InputProps extends TextInputProps {
  icon: string;
}

const Input: React.FC<InputProps> = ({ icon, value = '', ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!value);
  }, [value]);

  return (
    <Container isFocused={isFocused}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#fcc735' : '#8F8F8F'}
      />

      <StyledInput
        defaultValue={value}
        onFocus={handleInputFocused}
        onBlur={handleInputBlur}
        placeholderTextColor="#8F8F8F"
        {...rest}
      />
    </Container>
  );
};

export default Input;
