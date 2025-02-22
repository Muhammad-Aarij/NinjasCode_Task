import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import WeatherDetailScreen from '../screens/WeatherDetailScreen';

const Stack = createNativeStackNavigator();

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="WeatherDetail"
      component={WeatherDetailScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default SearchStack;
