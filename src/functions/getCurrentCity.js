// locationUtils.js
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (result === RESULTS.DENIED) {
        await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      }
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error('Location permission not granted');
      }
    }
  } catch (error) {
    console.error('Error requesting location permission:', error);
    throw error;
  }
};

export const getCurrentCity = async () => {
  await requestLocationPermission(); 
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        if (latitude && longitude) {

          console.log("long" + longitude + "lat" + latitude);
          try {
            const response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=3802d31971caa489f2c29247467cd76b`);
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
