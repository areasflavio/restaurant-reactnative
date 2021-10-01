/* eslint-disable camelcase */
import React, { useCallback, useEffect, useState } from 'react';
import Input from '../../components/Input';

import api from '../../services/api';

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
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();

  useEffect(() => {
    async function loadFoods(): Promise<void> {
      const response = await api.get('/foods');

      setFoods(response.data);
    }

    loadFoods();
  }, []);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get('/categories');

      setCategories(response.data);
    }

    loadCategories();
  }, []);

  const handleSelectCategory = useCallback((id: number) => {
    setSelectedCategory(id);
  }, []);

  return (
    <Container>
      <Header>
        <Input icon="search" placeholder="What food are you looking for?" />
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
              <FoodContainer onPress={() => handleSelectCategory(food.id)}>
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
