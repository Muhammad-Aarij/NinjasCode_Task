import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesScreen from '../screens/FavoritesScreen';
import WeatherDetailScreen from '../screens/WeatherDetailScreen';

const Stack = createNativeStackNavigator();

const FavoritesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="FavoritesScreen"
      component={FavoritesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="WeatherDetail"
      component={WeatherDetailScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default FavoritesStack;
