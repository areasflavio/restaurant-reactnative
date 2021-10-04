/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Input from '../../components/Input';

import api from '../../services/api';
import formatPrice from '../../utils/formatPrice';

import {
  Container,
  Header,
  Title,
  Content,
  CategoriesListContainer,
  CategoriesList,
  CategoryContainer,
  CategoryImage,
  CategoryTitle,
  FoodsListContainer,
  FoodsList,
  FoodContainer,
  FoodImageContainer,
  FoodImage,
  FoodInfo,
  FoodName,
  FoodDescription,
  FoodPrice,
} from './styles';

export interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  thumbnail_url: string;
  formattedPrice: string;
}

export interface Category {
  id: number;
  title: string;
  image_url: string;
}

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get('/categories');

      setCategories(response.data);
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get<Food[]>('/foods', {
        params: {
          category_like: selectedCategory,
          name_like: searchValue,
        },
      });

      const formattedData = response.data.map(food => ({
        ...food,
        formattedPrice: formatPrice(food.price),
      }));

      setFoods(formattedData);
    }

    loadFoods();
  }, [selectedCategory, searchValue]);

  const handleSelectCategory = useCallback(
    (id: number) => {
      if (selectedCategory === id) {
        setSelectedCategory(undefined);
      } else {
        setSelectedCategory(id);
      }
    },
    [selectedCategory]
  );

  async function handleNavigate(id: number): Promise<void> {
    navigation.navigate('FoodDetails', {
      id,
    });
  }

  return (
    <Container>
      <Header>
        <Input
          icon="search"
          placeholder="What food are you looking for?"
          value={searchValue}
          onChangeText={value => setSearchValue(value)}
        />
      </Header>

      <Content>
        <Title>Categories</Title>
        <CategoriesListContainer>
          <CategoriesList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={category => String(category.id)}
            renderItem={({ item: category }) => (
              <CategoryContainer
                selected={category.id === selectedCategory}
                onPress={() => handleSelectCategory(category.id)}
              >
                <CategoryImage source={{ uri: category.image_url }} />
                <CategoryTitle selected={category.id === selectedCategory}>
                  {category.title}
                </CategoryTitle>
              </CategoryContainer>
            )}
          />
        </CategoriesListContainer>

        <Title>Foods</Title>
        <FoodsListContainer>
          <FoodsList
            showsVerticalScrollIndicator={false}
            data={foods}
            keyExtractor={food => String(food.id)}
            renderItem={({ item: food }) => (
              <FoodContainer onPress={() => handleNavigate(food.id)}>
                <FoodImageContainer>
                  <FoodImage source={{ uri: food.thumbnail_url }} />
                </FoodImageContainer>

                <FoodInfo>
                  <FoodName>{food.name}</FoodName>
                  <FoodDescription>{food.description}</FoodDescription>
                  <FoodPrice>{food.formattedPrice}</FoodPrice>
                </FoodInfo>
              </FoodContainer>
            )}
          />
        </FoodsListContainer>
      </Content>
    </Container>
  );
};

export default Dashboard;
