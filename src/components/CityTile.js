import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteAsync, removeFavoriteAsync, fetchFavorites } from '../redux/slice/weatherSlice';

const weatherIcons = {
  Sunny: require('../assets/images/sun.png'),
  Cloudy: require('../assets/images/cloudy.png'),
  Rainy: require('../assets/images/rain.png'),
};

const CityTile = ({ city, temperature, weather, onPress }) => {
  const dispatch = useDispatch();
  const favoriteCities = useSelector(state => state.weather.favorites);
  const isFavorite = favoriteCities.some(fav => fav.city === city);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavoriteAsync({ city }));
    } else {
      dispatch(addFavoriteAsync({ city, temperature, weather }));
    }
  };

  return (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
      <View style={styles.leftContainer}>
        <Text style={styles.cityName}>{city}</Text>
        <Text style={styles.temperature}>{temperature}°C</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={weatherIcons[weather]} style={styles.weatherIcon} />
        <TouchableOpacity onPress={toggleFavorite}>
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? 'red' : 'grey'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  leftContainer: {
    flexDirection: 'column',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 16,
    color: '#666',
  },
  weatherIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
});

export default CityTile;
