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

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Food[]>([]);

  useFocusEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get<Food[]>('/orders');

      const formattedOrders = response.data.map(order => ({
        ...order,
        formattedPrice: formatPrice(order.price),
      }));

      setOrders(formattedOrders);
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
            data={orders}
            keyExtractor={order => String(order.id)}
            renderItem={({ item: order }) => (
              <FoodContainer>
                <FoodImageContainer>
                  <FoodImage source={{ uri: order.thumbnail_url }} />
                </FoodImageContainer>

                <FoodInfo>
                  <FoodName>{order.name}</FoodName>
                  <FoodDescription>{order.description}</FoodDescription>
                  <FoodPrice>{order.formattedPrice}</FoodPrice>
                </FoodInfo>
              </FoodContainer>
            )}
          />
        </FoodsListContainer>
      </Content>
    </Container>
  );
};

export default Orders;
