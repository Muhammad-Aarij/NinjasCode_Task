import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import CityTile from '../components/CityTile';
import ThemeContext from '../theme/ThemeContext';
import { fetchFavorites } from '../redux/slice/weatherSlice';

const FavoritesScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const favoriteCities = useSelector(state => state.weather.favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {favoriteCities.length > 0 ? (
        <FlatList
          data={favoriteCities}
          keyExtractor={(item) => item.city}
          renderItem={({ item }) => (
            <CityTile 
              city={item.city} 
              temperature={item.temperature} 
              weather={item.weather} 
              isFavorite={true} // Ensuring the favorite status is displayed correctly
              onPress={() => navigation.navigate('WeatherDetail', { city: item })} 
              style={[styles.cityTile, { backgroundColor: theme.backgroundColor, color: theme.textColor, borderColor: theme.borderColor }]}
            />
          )}
        />
      ) : (
        <Text style={[styles.noFavoritesText, { color: theme.textColor }]}>No favorite cities added.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  cityTile: {
    padding: 16,
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 8
  },
  noFavoritesText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center'
  }
});

export default FavoritesScreen;
