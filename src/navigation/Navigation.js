// AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import WeatherDetailScreen from '../screens/WeatherDetailScreen';
import Home from '../screens/Home';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Search"
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

const FavoritesStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Favorites"
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

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'search';
            } else if (route.name === 'Favorites') {
              iconName = 'heart';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={SearchStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Favorites" component={FavoritesStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
