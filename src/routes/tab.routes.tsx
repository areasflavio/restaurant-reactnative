import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import Dashboard from '../pages/Dashboard';
import FoodDetails from '../pages/FoodDetails';
import Orders from '../pages/Orders';
import Favorites from '../pages/Favorites';

const Main = createNativeStackNavigator();

const MainStack: React.FC = () => {
  return (
    <Main.Navigator initialRouteName="Dashboard">
      <Main.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ navigation }) => ({
          headerLeft: () => <></>,
          headerRight: () => (
            <Icon
              name="log-out"
              size={24}
              color="#fcc735"
              onPress={() => {
                navigation.navigate('Welcome');
              }}
            />
          ),
          headerRightContainerStyle: {
            paddingRight: 24,
          },
          title: 'Restaurant Native',
          headerTintColor: '#fcc735',
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: '#1e90ff',
            elevation: 0,
            borderWidth: 0,
            shadowColor: 'transparent',
          },
        })}
      />
      <Main.Screen
        name="FoodDetails"
        component={FoodDetails}
        options={({ navigation }) => ({
          headerRight: () => (
            <AntDesignIcon
              name="heart"
              size={24}
              color="#fcc735"
              onPress={() => {
                navigation.navigate('Welcome');
              }}
            />
          ),
          headerRightContainerStyle: {
            paddingRight: 24,
          },
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={24}
              color="#fcc735"
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: {
            paddingLeft: 24,
          },
          title: 'Details',
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: '#1e90ff',
            elevation: 0,
            borderWidth: 0,
            shadowColor: 'transparent',
          },
        })}
      />
    </Main.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={props => ({
        tabBarLabelPosition: 'beside-icon',
        labelStyle: {
          fontFamily: 'Poppins-Regular',
          fontSize: 12,
        },
        tabBarActiveTintColor: '#1e90ff',
        tabBarInactiveTintColor: '#8F8F8F',
        tabBarStyle: {
          borderTopWidth: 1,
        },
      })}
    >
      <Tab.Screen
        name="MainStack"
        component={MainStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon size={25} name="list" color={color} />
          ),
          title: 'Dashboard',
        }}
      />

      <Tab.Group
        screenOptions={({ navigation }) => ({
          headerLeft: () => (
            <Icon
              name="arrow-left"
              size={24}
              color="#fcc735"
              onPress={() => navigation.goBack()}
            />
          ),
          headerLeftContainerStyle: {
            paddingLeft: 24,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            color: '#fff',
            fontFamily: 'Poppins-Regular',
            fontSize: 20,
          },
          headerStyle: {
            backgroundColor: '#1e90ff',
            elevation: 0,
            borderWidth: 0,
            shadowColor: 'transparent',
          },
        })}
      >
        <Tab.Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon size={25} name="shopping-bag" color={color} />
            ),
            title: 'Orders',
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon size={25} name="heart" color={color} />
            ),
            title: 'Favorites',
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default TabRoutes;
