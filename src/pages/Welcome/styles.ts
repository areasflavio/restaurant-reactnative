import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;

  padding: 24px;

  background: #1e90ff;
`;

export const Header = styled.View`
  margin-top: 64px;
`;

export const HeaderText = styled.Text`
  font-family: 'Poppins-Medium';
  font-size: 32px;
  color: #fff;
`;

export const MainContent = styled.View`
  margin: auto 0;
`;

export const MainContentText = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 40px;
  color: #fff;
`;

export const EnterButton = styled.TouchableOpacity`
  align-items: center;

  padding: 16px;
  border-radius: 8px;

  background: #fcc735;
`;

export const EnterButtonText = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 16px;
`;
