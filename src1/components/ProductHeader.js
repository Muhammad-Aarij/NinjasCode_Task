import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/Colors';

import { scale, moderateScale } from 'react-native-size-matters';

// create a component
const ProductHeader = ({ title }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{title}</Text>

            <TouchableOpacity>
                <Text style={styles.showAllBtn}>SHOW ALL</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: moderateScale(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerTitle: {
        fontSize: scale(22),
        color: COLORS.black,
        fontFamily: 'Raleway-Bold'
    },
    showAllBtn: {
        fontSize: scale(12),
        color: COLORS.black,
        fontFamily: 'Raleway-Regular'
    }
});

//make this component available to the app
export default ProductHeader;
