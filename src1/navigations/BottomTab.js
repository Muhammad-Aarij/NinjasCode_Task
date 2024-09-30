import React, { } from 'react';
import { View, StyleSheet, Image } from 'react-native';

// ----------------Importing React Native Navigations----------------

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ----------------Importing Screens----------------

import { Home, Cart, Category, Profile } from '../screens';
import { COLORS } from '../constants/Colors';
import { scale, verticalScale } from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

const BottomTab = ({ navigation }) => {

    return (
        <View style={{ backgroundColor: COLORS.color1, flex: 1 }}>
            <Tab.Navigator

                // ======================Styling for Bottom Tab Navigator=====================
                initialRouteName='Home'
                screenOptions={{
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: COLORS.color3,
                    tabBarInactiveTintColor: COLORS.color4,
                    headerShown: false,
                    tabBarStyle: { borderRadius: scale(50), backgroundColor: COLORS.white, elevation: 0, marginHorizontal: scale(15), alignItems: "center", height: verticalScale(70), marginBottom: scale(15) }
                }}
            >

                {/* ======================It will Show us Home Screen===================== */}
                <Tab.Screen name='Home' component={Home} options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../assets/images/home.png')} style={{ width: scale(25), height: scale(25), resizeMode: 'contain', tintColor: color }} />
                    ),
                    headerShown: false,
                }} />

                <Tab.Screen name='Category' component={Category} options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../assets/images/category.png')} style={{ width: scale(25), height: scale(25), resizeMode: 'contain', tintColor: color }} />
                    ),
                }} />

                <Tab.Screen name='Cart' component={Cart} options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../assets/images/shopping-cart.png')} style={{ width: scale(25), height: scale(25), resizeMode: 'contain', tintColor: color }} />
                    ),
                }} />

                <Tab.Screen name='Profile' component={Profile} options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../assets/images/user.png')} style={{ width: scale(25), height: scale(25), resizeMode: 'contain', tintColor: color }} />
                    ),
                }} />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({

})

export default BottomTab;


// [
//     {
//         name: "Broccoli",
//         weight: "100g",
//         price: 4,
//         unit: "kg",
//         image: 'https://pngimg.com/d/broccoli_PNG72859.png',
//         images: [
//             'https://purepng.com/public/uploads/large/purepng.com-broccolivegetablesfreshhealtygreenfoodbroccoli-481521739825pcvpn.png',
//             'https://pngimg.com/d/broccoli_PNG72859.png',
//             'https://www.pngall.com/wp-content/uploads/2016/05/Broccoli-PNG-Image.png',
//             'https://www.pngall.com/wp-content/uploads/2016/05/Broccoli-Free-Download-PNG.png'
//         ]
//     },
//     {
//         name: "Gedang",
//         weight: "100g",
//         price: 10,
//         unit: "kg",
//         image: 'https://purepng.com/public/uploads/large/purepng.com-bananafruitsyellowfruit-981524754330lspp8.png',
//         images: [
//             'https://purepng.com/public/uploads/large/purepng.com-broccolivegetablesfreshhealtygreenfoodbroccoli-481521739825pcvpn.png',
//             'https://pngimg.com/d/broccoli_PNG72859.png',
//             'https://www.pngall.com/wp-content/uploads/2016/05/Broccoli-PNG-Image.png',
//             'https://www.pngall.com/wp-content/uploads/2016/05/Broccoli-Free-Download-PNG.png'
//         ]
//     },
//     {
//         name: "Broccoli",
//         weight: "100g",
//         price: 4,
//         unit: "kg",
//         image: 'https://pngimg.com/d/broccoli_PNG72859.png',
//         images: [
//             'https://purepng.com/public/uploads/large/purepng.com-broccolivegetablesfreshhealtygreenfoodbroccoli-481521739825pcvpn.png',
//             'https://pngimg.com/d/broccoli_PNG72859.png',
//             'https://www.pngall.com/wp-content/uploads/2016/05/Broccoli-PNG-Image.png',
//             'https://www.pngall.com/wp-content/uploads/2016/05/Broccoli-Free-Download-PNG.png'
//         ]
//     },

// ]