import { useFocusEffect } from '@react-navigation/native';
import React,{useEffect} from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper';

export default function SplashScreen({navigation}) {

    useEffect(() => {
        setInterval(() => {
           navigation.navigate("SignIn")
        }, 2000);

        return () => clearInterval();
    },[] )

    return (
        <View style={styles.container}>
            <Text variant="displayMedium">Splash Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});