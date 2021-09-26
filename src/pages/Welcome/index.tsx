import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import {
  Container,
  Header,
  HeaderText,
  MainContent,
  MainContentText,
  EnterButton,
  EnterButtonText,
} from './styles';

const Welcome: React.FC = () => {
  const { navigate } = useNavigation();

  const handleEnterApp = useCallback(() => {
    navigate('Dashboard');
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderText>Restaurant ReactNative</HeaderText>
      </Header>

      <MainContent>
        <MainContentText>
          Uma verdadeira experiência gastronômica
        </MainContentText>
      </MainContent>

      <EnterButton onPress={handleEnterApp}>
        <EnterButtonText>Entrar no Restaurant</EnterButtonText>
      </EnterButton>
    </Container>
  );
};

export default Welcome;
