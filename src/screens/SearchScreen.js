import React, { useContext, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ThemeContext from '../theme/ThemeContext';
import CityTile from '../components/CityTile';
import { fetchCities, searchCity, storeSearchedCity, fetchSearchedCity } from '../redux/slice/weatherSlice';

const SearchScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const { cities, searchedCity, loading, error, lastSearchedCity } = useSelector(state => state.weather);
  const debounceTimeout = useRef(null);
  const [savedCity, setSavedCity] = useState([]);

  useEffect(() => {
    dispatch(fetchCities());
    fetchSavedCity();
  }, [dispatch]);

  const fetchSavedCity = async () => {
    try {
      const city = await AsyncStorage.getItem('savedCity');
      if (city) {
        setSavedCity([JSON.parse(city)]);
      }
    } catch (error) {
      console.error('Error fetching saved city:', error);
    }
  };

  const handleSearch = (query) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (query.trim()) {
        dispatch(searchCity(query));
      }
    }, 2000);
  };

  const handleChangeText = (text) => {
    setSearchQuery(text);
    handleSearch(text);
  };

  useEffect(() => {
    if (searchedCity.length > 0) {
      const city = searchedCity[0];
      setSavedCity([city]);
      storeCityInAsync(city);
    } else if (searchQuery.trim()) {
      Alert.alert('City Not Found', `No cities found with the name "${searchQuery}"`, [{ text: 'OK' }]);
    }
  }, [searchedCity]);

  const storeCityInAsync = async (city) => {
    try {
      await AsyncStorage.setItem('savedCity', JSON.stringify(city));
    } catch (error) {
      console.error('Error saving city:', error);
    }
  };

  // if (loading) return <Text>Loading...</Text>;
  // if (error) return <Text>Error: {error}</Text>;

  return (
    <ImageBackground source={theme.backgroundImage} style={styles.backgroundImage}>
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={[styles.toggleText, { color: theme.textColor }]}>
            Search Here
          </Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Enter city name"
          value={searchQuery}
          onChangeText={handleChangeText}
          style={[styles.input, { color: "gray" }]}
        />
        {searchedCity.length > 0 ? (
          searchedCity.map(city => (
            <CityTile
              key={city.city}
              city={city.city}
              temperature={city.temperature}
              weather={city.weather}
              onPress={() => navigation.navigate('WeatherDetail', { city })}
              style={[styles.cityTile, { backgroundColor: theme.backgroundColor, color: theme.textColor, borderColor: theme.borderColor }]}
            />
          ))
        ) : savedCity.length > 0 ? (
          savedCity.map(city => (
            <CityTile
              key={city.city}
              city={city.city}
              temperature={city.temperature}
              weather={city.weather}
              onPress={() => navigation.navigate('WeatherDetail', { city })}
              style={[styles.cityTile, { backgroundColor: theme.backgroundColor, color: theme.textColor, borderColor: theme.borderColor }]}
            />
          ))
        ) : (
          <Text style={[styles.noCitiesText, { color: theme.textColor }]}>No cities found</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)' // Optional: Add a semi-transparent overlay for readability
  },
  toggleText: {
    marginTop: 16,
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 16
  },
  input: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 16
  },
  cityTile: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 8
  },
  noCitiesText: {
    marginTop: 16,
    fontSize: 16
  }
});

export default SearchScreen;
