//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './HomeStack';


// create a component
const MainStack = () => {

    return (
        <NavigationContainer>
            <HomeStack />
        </NavigationContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default MainStack;
