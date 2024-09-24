import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/slice/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyReactNativeForm } from './Formik';

export default function Homepage() {
    const dispatch = useDispatch();
    const handleSignOut = () => {
        AsyncStorage.removeItem('userState');
        dispatch(signOut());
    };

    return (
        <View style={styles.container}>
            <Text variant="displayMedium">Homepage</Text>
            <TouchableOpacity style={styles.btn} onPress={handleSignOut}>
                <Text >Sign Out</Text>
            </TouchableOpacity>

            <MyReactNativeForm />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: "100%",
        height: "100%",
        backgroundColor: "#008080",
        justifyContent: 'center',
        alignItems: 'center',

    },
    heading: {
        fontSize: 34,
        fontFamily: "sans-serif-medium",
        color: 'white',
        marginBottom: 10,
    },

    btn: {
        width: 150,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
    }
});