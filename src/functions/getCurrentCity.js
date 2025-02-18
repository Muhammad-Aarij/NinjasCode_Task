// locationUtils.js
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { requestLocationPermission } from '../utils/permissionsUtils';

export const getCurrentCity = async () => {
  await requestLocationPermission(); 
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        if (latitude && longitude) {
          console.log("long" + longitude + "lat" + latitude);
          try {
            const response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=YOUR_OPENWEATHERMAP_API_KEY`);
            const city = response.data[0].name;
            resolve(city);
          } catch (error) {
            console.error('Error fetching city name:', error);
            reject(error);
          }
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
