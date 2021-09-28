import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Dashboard from '../pages/Dashboard';
import Orders from '../pages/Orders';
import Favorites from '../pages/Favorites';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        labelStyle: {
          fontFamily: 'Poppins-Regular',
          fontSize: 12,
        },
        tabBarActiveTintColor: '#1e90ff',
        tabBarInactiveTintColor: '#8F8F8F',
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon size={25} name="list" color={color} />
          ),
          title: 'Dashboard',
        }}
      />
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
    </Tab.Navigator>
  );
};

export default TabRoutes;
