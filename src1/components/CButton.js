//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import {COLORS} from '../constants/Colors';
import { scale, verticalScale } from 'react-native-size-matters';

const CButton = ({title, onPress, disable}) => {
    return (
        <TouchableOpacity 
        onPress={onPress}
        disabled={disable}
        style={{backgroundColor: COLORS?.color3, height: scale(50), justifyContent: 'center', alignItems: 'center', borderRadius: scale(8), marginVertical: scale(20)}}>
            <Text style={{color: '#fff', fontSize: scale(16), fontFamily: "Raleway-Medium"}}>{title}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        
    },
});

//make this component available to the app
export default CButton;
