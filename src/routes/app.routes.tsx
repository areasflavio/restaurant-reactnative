import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from '../pages/Welcome';

import TabRoutes from './tab.routes';

const Stack = createNativeStackNavigator();

const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Main" component={TabRoutes} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
