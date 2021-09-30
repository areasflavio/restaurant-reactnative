import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { Category, Food } from './index';

interface CategoryContainerProps {
  selected: boolean;
}

interface CategoryTitleProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: flex-start;

  background: #fff;
`;

export const Header = styled.View`
  width: 100%;
  height: 32px;

  padding: 8px 24px 0;

  background: #1e90ff;
`;

export const Content = styled.View`
  flex: 1;

  padding: 0 24px;
`;

export const Title = styled.Text`
  margin-top: 48px;

  color: #0052a3;
  font-family: 'Poppins-Bold';
  font-size: 32px;
`;

export const CategoriesListContainer = styled.View`
  height: 112px;
`;

export const CategoriesList = styled(
  FlatList as new () => FlatList<Category>
)``;

export const CategoryContainer = styled(RectButton)<CategoryContainerProps>``;

export const CategoryImage = styled.Image`
  height: 64px;
  width: 64px;
`;

export const CategoryTitle = styled.Text<CategoryTitleProps>``;

export const FoodsListContainer = styled.View`
  flex: 1;
`;

export const FoodsList = styled(FlatList as new () => FlatList<Food>)``;

export const FoodContainer = styled(RectButton)<CategoryContainerProps>`
  flex-direction: row;
`;

export const FoodImage = styled.Image`
  height: 64px;
  width: 64px;
`;

export const FoodInfo = styled.View``;

export const FoodName = styled.Text``;

export const FoodDescription = styled.Text``;

export const FoodPrice = styled.Text``;
