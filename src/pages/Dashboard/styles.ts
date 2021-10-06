import { FlatList } from 'react-native';
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

export const CategoryContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<CategoryContainerProps>`
  align-items: center;

  padding: 8px 16px;
  margin-right: 16px;
  border-radius: 8px;
  border: 1px solid #bbb;
  border-color: ${props => (props.selected ? '#1e90ff' : '#bbb')};

  background: #f0f0f5;
`;

export const CategoryImage = styled.Image`
  height: 64px;
  width: 64px;
`;

export const CategoryTitle = styled.Text<CategoryTitleProps>`
  margin-top: auto;

  color: ${props => (props.selected ? '#1e90ff' : '#3d3d4d')};
`;

export const FoodsListContainer = styled.View`
  flex: 1;
`;

export const FoodsList = styled(FlatList as new () => FlatList<Food>)``;

export const FoodContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  flex-direction: row;

  margin-bottom: 16px;
`;

export const FoodImageContainer = styled.View`
  align-items: center;
  justify-content: center;

  padding: 8px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  background: #1e90ff;
`;

export const FoodImage = styled.Image`
  height: 64px;
  width: 64px;
`;

export const FoodInfo = styled.View`
  flex: 1;

  padding: 8px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;

  background: #f0f0f5;
`;

export const FoodName = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  color: #3d3d4d;
`;

export const FoodDescription = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  margin-top: 6px;
  color: #3d3d4d;
`;

export const FoodPrice = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  margin-top: 8px;
  font-weight: 600;
  color: #3abc4b;
`;
