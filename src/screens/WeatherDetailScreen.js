import React, { useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Button } from 'react-native';
import ThemeContext from '../theme/ThemeContext'; 
import humidityimg from '../assets/images/humidity.png';
import windimg from '../assets/images/wind.png';

const WeatherDetailScreen = ({ route }) => {
  const { theme } = useContext(ThemeContext); 
  const weatherIcons = {
    Sunny: require('../assets/images/sun.png'),
    Cloudy: require('../assets/images/cloudy.png'),
    Rainy: require('../assets/images/rain.png'),
  };
  const [temperature, setTemperature] = useState(route.params.city.temperature || 0);
  const [isCelsius, setIsCelsius] = useState(true);
  const { city, weather, humidity, windSpeed } = route.params.city;

  const convertTemperature = () => {
    if (isCelsius) {
      setTemperature((temperature * 9/5) + 32); // Convert to Fahrenheit
    } else {
      setTemperature((temperature - 32) * 5/9); // Convert to Celsius
    }
    setIsCelsius(!isCelsius);
  };

  return (
    <ImageBackground source={theme.backgroundImage} style={styles.backgroundImage}>
      <View style={styles.glassContainer}>
        <Text style={[styles.cityText, { color: theme.textColor }]}>{city}</Text>
        <Text style={[styles.temperatureText, { color: theme.textColor }]}>
          {isCelsius ? `${temperature.toFixed(0)}°C` : `${temperature.toFixed(0)}°F`}
        </Text>
        <Text style={[styles.detailText, { color: theme.textColor }]}>{weather}</Text>
        <Image source={weatherIcons[weather]} style={styles.weatherIcon} />
        <View style={styles.detailsRow}>
          <View style={styles.detailBox}>
            <Image source={humidityimg} style={styles.detailIcon} />
            <Text style={[styles.detailText, { color: theme.textColor }]}>{humidity}%</Text>
          </View>
          <View style={styles.detailBox}>
            <Image source={windimg} style={styles.detailIcon} />
            <Text style={[styles.detailText, { color: theme.textColor }]}>{windSpeed} km/h</Text>
          </View>
        </View>
        <Button style={styles.tempBtn} title={`${isCelsius ? 'F' : 'C'}`} onPress={convertTemperature} />
      </View>
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  glassContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(20px)',
    position:"relative",
  },
  tempBtn:{
    marginTop:10,
  },
  cityText: {
    fontSize: 25,
    marginTop: 20,
  },
  temperatureText: {
    fontSize: 60,
    fontWeight: "bold",
  },
  weatherIcon: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 20,
  },
  detailText: {
    fontSize: 18,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  detailBox: {
    alignItems: "center",
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    padding: 20,
    borderRadius: 10,
    width: "40%",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  detailIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  }
});


export default WeatherDetailScreen;
