import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import Button from '../../components/Button';

import {
  Container,
  Header,
  HeaderText,
  MainContent,
  MainContentText,
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

      <Button onPress={handleEnterApp} icon="log-in" type="regular">
        Entrar no Restaurant
      </Button>
    </Container>
  );
};

export default Welcome;
