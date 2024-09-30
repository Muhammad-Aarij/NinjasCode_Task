import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/Colors';
import { Image } from 'react-native-animatable';

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

// create a component
const ProductCard = ({product, onPress}) => {

    const { name, weight, unit, price, image } = product

    return (
        <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
            <Image source={{ uri: image }} style={styles.imageStyle} />

            <Text style={styles.productName}>{name}</Text>

            <Text style={styles.boldLabel}>
                <Text>weight </Text>
                <Text style={styles.regularLabel}>
                    {weight}
                </Text>
            </Text>

            <Text style={styles.regularLabel}>
                <Text>${price}</Text>
                <Text style={styles.boldLabel}>
                    /{unit}
                </Text>
            </Text>

            <TouchableOpacity style={styles.addBtnContainer}>
                <Image source={require('../assets/images/plus.png')} style={{ height: scale(15), aspectRatio: 1 }} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: COLORS.white,
        padding: scale(10),
        width: moderateScale(145),
        borderRadius: scale(12),
        elevation: 5,
        shadowColor: COLORS.color4
    },
    imageStyle: {
        height: scale(70),
        marginBottom: scale(10),
        alignSelf: 'center',
        aspectRatio: 1,
        resizeMode: 'center'
    },
    productName: {
        fontSize: scale(16),
        color: COLORS.black,
        fontFamily: 'Raleway-Bold'
    },
    boldLabel: {
        fontSize: scale(12),
        color: COLORS.black,
        fontFamily: 'Raleway-Regular'
    },
    regularLabel: {
        fontSize: scale(14),
        color: COLORS.black,
        fontFamily: 'Raleway-SemiBold'
    },
    addBtnContainer: {
        backgroundColor: COLORS.color3,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: scale(10),
        right: scale(10),
        borderRadius: scale(10),
        height: scale(30),
        aspectRatio: 1
    }
});

//make this component available to the app
export default ProductCard;
