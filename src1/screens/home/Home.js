//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/Colors';
import { Image } from 'react-native-animatable';

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import ProductCard from '../../components/ProductCard';
import ProductHeader from '../../components/ProductHeader';
import RecommendationCard from '../../components/RecommendationCard';

const topProducts = [
    {
        name: "Broccoli",
        weight: "100g",
        price: 4,
        unit: "kg",
        qty: 0,
        image: 'https://pngimg.com/d/broccoli_PNG72859.png',
        images: [
            'https://purepng.com/public/uploads/large/purepng.com-broccolivegetablesfreshhealtygreenfoodbroccoli-481521739825pcvpn.png',
            'https://pngimg.com/d/broccoli_PNG72859.png',
            'https://www.pngall.com/wp-content/uploads/2016/05/Broccoli-PNG-Image.png',
            'https://www.pngall.com/wp-content/uploads/2016/05/Broccoli-Free-Download-PNG.png'
        ]
    },
    {
        name: "Gedang",
        weight: "100g",
        price: 10,
        unit: "kg",
        qty: 0,
        image: 'https://purepng.com/public/uploads/large/purepng.com-bananafruitsyellowfruit-981524754330lspp8.png',
        images: [
            "https://purepng.com/public/uploads/large/purepng.com-bananafruitsyellowfruit-981524754330lspp8.png",
            "https://i.pinimg.com/564x/35/2e/9f/352e9fa46ad1cc6ed6834ec30c8dde5f.jpg",
            "https://i.pinimg.com/236x/4e/cd/d4/4ecdd497ebfcfcd740a0b415f19143c8.jpg",
            "https://i.pinimg.com/236x/49/2f/3e/492f3e122f76c3f15b27302344666443.jpg"
        ]
    },
    {
        "name": "Oranges",
        "weight": "90g",
        "price": 1.8,
        "unit": "kg",
        "qty": 0,
        "image": "https://i.pinimg.com/236x/68/f5/9b/68f59bebd3c59b718fd5cd0940eabdfe.jpg",
        "images": [
            "https://i.pinimg.com/236x/68/f5/9b/68f59bebd3c59b718fd5cd0940eabdfe.jpg",
            "https://i.pinimg.com/236x/2e/47/cf/2e47cf85a29166abdf284e16c2a64ca6.jpg",
            "https://i.pinimg.com/236x/92/09/a6/9209a6699e2ee50a49cf777cd618c4d7.jpg",
            "https://i.pinimg.com/236x/4f/55/db/4f55dbf84e69146105ba90e0e1dec1b1.jpg"
        ]
    }
];

// create a component
const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <View style={{ gap: 10 }}>
                    <Text style={styles.welcomeLabel}>Good Morning</Text>
                    <Text style={styles.nameLabel}>Ghazi</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Image source={require('../../assets/images/location.png')} style={styles.locationIcon} />
                        <Text style={styles.locationLabel}>Tiogomas, Malang</Text>
                    </View>
                </View>

                <View style={styles.userImageContainer}>
                    <Image source={require('../../assets/images/user-image.png')} style={styles.userImage} />
                </View>
            </View>


            {/* ==============================  Types */}
            <FlatList
                data={['All', 'Vegetables', 'Fish', 'Chicken']}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flexGrow: 0 }}
                contentContainerStyle={styles.typeListContainer}
                renderItem={({ item }) => (
                    <View style={styles.typeContainer}>
                        <Text style={styles.typeLabel}>{item}</Text>
                    </View>
                )}
            />


            {/* ================================  Top Products */}
            <ProductHeader title="Top Products" />

            <FlatList
                data={topProducts}
                horizontal
                style={{ flexGrow: 0 }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainerStyle}
                renderItem={({ item }) => (
                    <ProductCard product={item} onPress={() => navigation.navigate('Detail', { product: item })} />
                )}
            />


            {/* ====================================  Recommendation */}

            <ProductHeader title="Recommendation" />

            <FlatList
                data={topProducts}
                horizontal
                style={{ flexGrow: 0 }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainerStyle}
                renderItem={({ item }) => (
                    <RecommendationCard product={item} onPress={() => navigation.navigate('Detail', { product: item })}/>
                )}
            />

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.color1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: verticalScale(15),
        paddingHorizontal: moderateScale(15)
    },
    welcomeLabel: {
        fontSize: scale(18),
        color: COLORS.black,
        fontFamily: 'Raleway-SemiBold',
        marginBottom: -8
    },
    nameLabel: {
        fontSize: scale(24),
        color: COLORS.black,
        fontFamily: 'Raleway-Bold'
    },
    userImageContainer: {
        height: scale(72),
        aspectRatio: 1,
        backgroundColor: COLORS.color5,
        borderRadius: scale(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    userImage: {
        height: scale(60),
        width: scale(60)
    },
    locationIcon: {
        width: scale(18),
        height: scale(18),
        resizeMode: 'contain'
    },
    locationLabel: {
        fontSize: scale(14),
        color: COLORS.black,
        fontFamily: 'Raleway-Light'
    },
    flatListContainerStyle: {
        gap: scale(12),
        marginVertical: verticalScale(20),
        paddingHorizontal: moderateScale(15),
        alignSelf: 'flex-start',
    },
    typeListContainer: {
        gap: scale(8),
        marginVertical: verticalScale(10),
        paddingHorizontal: moderateScale(15),
        alignSelf: 'flex-start'
    },
    typeContainer: {
        backgroundColor: COLORS.white,
        paddingVertical: verticalScale(5),
        paddingHorizontal: moderateScale(15),
        borderRadius: scale(25),
        elevation: 2,
        margin: scale(2)
    },
    typeLabel: {
        fontSize: scale(16),
        color: COLORS.color2,
        fontFamily: 'Raleway-Medium'
    },

});

//make this component available to the app
export default Home;
