// locationUtils.js
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export const getCurrentCity = async () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`);
          const city = response.data.results[0].address_components.find(component => component.types.includes('locality')).long_name;
          resolve(city);
        } catch (error) {
          console.error('Error fetching city name:', error);
          reject(error);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  });
};
