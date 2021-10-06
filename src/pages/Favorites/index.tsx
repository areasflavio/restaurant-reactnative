/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import api from '../../services/api';
import formatPrice from '../../utils/formatPrice';

import {
  Container,
  Header,
  Content,
  FoodContainer,
  FoodsList,
  FoodImageContainer,
  FoodImage,
  FoodInfo,
  FoodName,
  FoodDescription,
  FoodPrice,
  FoodsListContainer,
} from './styles';

interface Extra {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

export interface Food {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  thumbnail_url: string;
  formattedPrice: string;
  extras: Extra[];
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Food[]>([]);

  useFocusEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get<Food[]>('/favorites');

      const formattedFavorites = response.data.map(favorite => ({
        ...favorite,
        formattedPrice: formatPrice(favorite.price),
      }));

      setFavorites(formattedFavorites);
    }

    loadCategories();
  });

  return (
    <Container>
      <Header />

      <Content>
        <FoodsListContainer>
          <FoodsList
            showsVerticalScrollIndicator={false}
            data={favorites}
            keyExtractor={favorite => String(favorite.id)}
            renderItem={({ item: favorite }) => (
              <FoodContainer>
                <FoodImageContainer>
                  <FoodImage source={{ uri: favorite.thumbnail_url }} />
                </FoodImageContainer>

                <FoodInfo>
                  <FoodName>{favorite.name}</FoodName>
                  <FoodDescription>{favorite.description}</FoodDescription>
                  <FoodPrice>{favorite.formattedPrice}</FoodPrice>
                </FoodInfo>
              </FoodContainer>
            )}
          />
        </FoodsListContainer>
      </Content>
    </Container>
  );
};

export default Favorites;
