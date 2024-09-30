//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/Colors';

// create a component
const Profile = () => {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.color1,
    },
});

//make this component available to the app
export default Profile;
