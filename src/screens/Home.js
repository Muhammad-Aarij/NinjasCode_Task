// HomeScreen.js
import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchCity } from '../redux/slice/weatherSlice';
import ThemeContext from '../theme/ThemeContext';
import WeatherDetailScreen from './WeatherDetailScreen';
import { getCurrentCity } from '../functions/getCurrentCity'; 

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const { searchedCity, loading, error } = useSelector(state => state.weather);
  const [fetchingLocation, setFetchingLocation] = useState(true);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const city = await getCurrentCity();
        dispatch(searchCity(city));
      } catch (error) {
        console.error('Error fetching city:', error);
      }
      setFetchingLocation(false);
    };
    fetchCity();
  }, [dispatch]);

  if (loading || fetchingLocation) {
    return <ActivityIndicator size="large" color={theme.textColor} />;
  }

  if (error) {
    return <Text style={{ color: theme.textColor }}>Error: {error}</Text>;
  }

  if (!searchedCity) {
    return <Text style={{ color: theme.textColor }}>No weather data found for your current location.</Text>;
  }

  return (
    <ImageBackground source={theme.backgroundImage} style={styles.backgroundImage}>
      <WeatherDetailScreen route={{ params: { city: searchedCity } }} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export default HomeScreen;
