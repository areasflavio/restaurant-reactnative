import React from 'react';
import Input from '../../components/Input';

import { Container, Header } from './styles';

const Dashboard: React.FC = () => (
  <Container>
    <Header>
      <Input icon="search" placeholder="What food are you looking for?" />
    </Header>
  </Container>
);

export default Dashboard;
