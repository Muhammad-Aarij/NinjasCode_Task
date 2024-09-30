//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { Detail } from '../screens';
import BottomTab from './BottomTab';


// create a component
const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='BottomTab' component={BottomTab}  />
            <Stack.Screen name='Detail' component={Detail} />
        </Stack.Navigator>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default HomeStack;
