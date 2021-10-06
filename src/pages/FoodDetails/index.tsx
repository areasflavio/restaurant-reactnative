/* eslint-disable camelcase */
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from 'react';
import { Alert, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import Button from '../../components/Button';

import api from '../../services/api';
import formatPrice from '../../utils/formatPrice';

import {
  Container,
  Header,
  ScrollContainer,
  FoodsContainer,
  Food,
  FoodImageContainer,
  FoodContent,
  FoodTitle,
  FoodDescription,
  FoodPricing,
  AdditionalsContainer,
  Title,
  TotalContainer,
  AdditionalItem,
  AdditionalItemText,
  AdditionalQuantity,
  PriceButtonContainer,
  TotalPrice,
  QuantityContainer,
} from './styles';

interface Params {
  id: number;
}

interface Extra {
  id: number;
  name: string;
  value: number;
  quantity: number;
}

interface Food {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  formattedPrice: string;
  extras: Extra[];
}

const FoodDetails: React.FC = () => {
  const [food, setFood] = useState({} as Food);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [foodQuantity, setFoodQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadFood(): Promise<void> {
      const response = await api.get<Food>(`/foods/${routeParams.id}`);

      const apiFood = response.data;

      const formattedFood: Food = {
        ...apiFood,
        formattedPrice: formatPrice(apiFood.price),
      };

      const apiExtras = apiFood.extras.map(extra => ({
        ...extra,
        quantity: 0,
      }));

      try {
        const favoritesResponse = await api.get(`/favorites/${food.id}`);

        setIsFavorite(!!favoritesResponse.data);
      } catch (error) {
        //
      }

      setFood(formattedFood);
      setExtras(apiExtras);
    }

    loadFood();
  }, [food.id, routeParams]);

  function handleIncrementExtra(id: number): void {
    const updatedExtras = extras.map(extra =>
      extra.id === id
        ? {
            ...extra,
            quantity: extra.quantity + 1,
          }
        : extra
    );

    setExtras(updatedExtras);
  }

  function handleDecrementExtra(id: number): void {
    const updatedExtras = extras.map(extra =>
      extra.id === id && extra.quantity > 0
        ? {
            ...extra,
            quantity: extra.quantity - 1,
          }
        : extra
    );

    setExtras(updatedExtras);
  }

  function handleIncrementFood(): void {
    setFoodQuantity(quantity => quantity + 1);
  }

  function handleDecrementFood(): void {
    if (foodQuantity > 1) setFoodQuantity(quantity => quantity - 1);
  }

  const toggleFavorite = useCallback(async () => {
    if (!isFavorite) {
      await api.post('/favorites', food);

      setIsFavorite(true);
    } else {
      await api.delete(`/favorites/${food.id}`);

      setIsFavorite(false);
    }
  }, [isFavorite, food]);

  const cartTotal = useMemo(() => {
    let total = food.price * foodQuantity;

    extras.forEach(extra => {
      total += extra.value * extra.quantity;
    });

    return formatPrice(total);
  }, [extras, food, foodQuantity]);

  async function handleFinishOrder(): Promise<void> {
    try {
      await api.post('/orders', {
        product_id: food.id,
        name: food.name,
        description: food.description,
        price: food.price,
        category: food.category,
        thumbnail_url: food.thumbnail_url,
        foodQuantity,
        extras,
      });

      Alert.alert('Success', 'Your order was made with success.');
      navigation.navigate('Dashboard');
    } catch (err) {
      console.log(err);
    }
  }

  const favoriteIconName = useMemo(
    () => (isFavorite ? 'heart' : 'hearto'),
    [isFavorite]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AntDesignIcon
          name={favoriteIconName}
          size={24}
          color="#FFB84D"
          onPress={() => toggleFavorite()}
        />
      ),
    });
  }, [navigation, favoriteIconName, toggleFavorite]);

  return (
    <Container>
      <Header />

      <ScrollContainer>
        <FoodsContainer>
          <Food>
            <FoodImageContainer>
              <Image
                style={{ width: 327, height: 183 }}
                source={{
                  uri: food.image_url,
                }}
              />
            </FoodImageContainer>
            <FoodContent>
              <FoodTitle>{food.name}</FoodTitle>
              <FoodDescription>{food.description}</FoodDescription>
              <FoodPricing>{food.formattedPrice}</FoodPricing>
            </FoodContent>
          </Food>
        </FoodsContainer>
        <AdditionalsContainer>
          <Title>Additionals</Title>
          {extras.map(extra => (
            <AdditionalItem key={extra.id}>
              <AdditionalItemText>{extra.name}</AdditionalItemText>
              <AdditionalQuantity>
                <Icon
                  size={15}
                  color="#3d3d4d"
                  name="minus"
                  onPress={() => handleDecrementExtra(extra.id)}
                />
                <AdditionalItemText>{extra.quantity}</AdditionalItemText>
                <Icon
                  size={15}
                  color="#3d3d4d"
                  name="plus"
                  onPress={() => handleIncrementExtra(extra.id)}
                />
              </AdditionalQuantity>
            </AdditionalItem>
          ))}
        </AdditionalsContainer>
        <TotalContainer>
          <Title>Total price</Title>
          <PriceButtonContainer>
            <TotalPrice>{cartTotal}</TotalPrice>
            <QuantityContainer>
              <Icon
                size={15}
                color="#3d3d4d"
                name="minus"
                onPress={() => handleDecrementFood()}
              />
              <AdditionalItemText>{foodQuantity}</AdditionalItemText>
              <Icon
                size={15}
                color="#3d3d4d"
                name="plus"
                onPress={() => handleIncrementFood()}
              />
            </QuantityContainer>
          </PriceButtonContainer>

          <Button
            type="success"
            icon="check-square"
            onPress={() => handleFinishOrder()}
          >
            Confirm order
          </Button>
        </TotalContainer>
      </ScrollContainer>
    </Container>
  );
};

export default FoodDetails;
