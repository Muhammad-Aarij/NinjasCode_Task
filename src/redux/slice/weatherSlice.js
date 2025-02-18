// weatherSlice.js - Weather Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Fetch all cities from the API
export const fetchCities = createAsyncThunk('weather/fetchCities', async () => {
  try {
    const response = await axios.get('http://192.168.100.106:5000/cities');
    const cities = response.data;
    const favorites = await AsyncStorage.getItem('favorites');
    const favoriteCities = favorites ? JSON.parse(favorites) : [];

    const citiesWithFavorites = cities.map(city => ({
      ...city,
      isFavorite: favoriteCities.some(fav => fav.city === city.city)
    }));

    return citiesWithFavorites;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
});

// Fetch favorites from AsyncStorage
export const fetchFavorites = createAsyncThunk('weather/fetchFavorites', async () => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
});

// Add favorite city to AsyncStorage
export const addFavoriteAsync = createAsyncThunk('weather/addFavoriteAsync', async (city) => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    const favoritesArray = favorites ? JSON.parse(favorites) : [];
    favoritesArray.push(city);
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    return city;
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
});

// Remove favorite city from AsyncStorage
export const removeFavoriteAsync = createAsyncThunk('weather/removeFavoriteAsync', async (city) => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    const favoritesArray = favorites ? JSON.parse(favorites) : [];
    const newFavoritesArray = favoritesArray.filter(fav => fav.city !== city.city);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavoritesArray));
    return city;
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    favorites: [],
    cities: [],
    loading: false,
    error: null,
    searchedCity: [],
  },
  reducers: {
    searchCity: (state, action) => {
      const cityName = action.payload.trim().toLowerCase();
      const cities = state.cities.filter(city => city.city.toLowerCase() === cityName);
      if (cities.length > 0) {
        state.searchedCity = cities;
        state.error = null;
      } else {
        state.searchedCity = [];
        state.error = `No cities found with the name "${action.payload}"`;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Handling fetchCities
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload; // Store cities data
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Handle error if any
      })
      // Handling fetchFavorites
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload; // Store favorite cities
      })
      // Handling addFavoriteAsync
      .addCase(addFavoriteAsync.fulfilled, (state, action) => {
        state.favorites.push(action.payload); // Add favorite city
        state.cities = state.cities.map(city =>
          city.city === action.payload.city ? { ...city, isFavorite: true } : city
        );
      })
      // Handling removeFavoriteAsync
      .addCase(removeFavoriteAsync.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(city => city.city !== action.payload.city); // Remove favorite city
        state.cities = state.cities.map(city =>
          city.city === action.payload.city ? { ...city, isFavorite: false } : city
        );
      });
  }
});

export const { searchCity } = weatherSlice.actions;
export default weatherSlice.reducer;
