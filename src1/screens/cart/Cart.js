//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../constants/Colors';
import { useDispatch, useSelector } from 'react-redux';

import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { removeFromCart, emptyCart } from '../../redux/slices/cartSlice';
import CButton from '../../components/CButton';

// create a component
const Cart = ({ navigation }) => {

    const cart = useSelector(state => state?.cart)
    const dispatch = useDispatch()

    return (
        <View style={styles.container}>

            <View>
                <TouchableOpacity>
                    <Text style={{ fontSize: scale(20), fontFamily: 'Raleway-SemiBold', color: COLORS.black, padding: scale(15), alignSelf: 'center' }}>Cart</Text>
                </TouchableOpacity>
            </View>


            {
                cart?.length > 0 ? (
                    <FlatList
                        data={cart}
                        contentContainerStyle={{ padding: scale(15), gap: scale(15) }}
                        renderItem={({ item }) => (
                            <View style={{ backgroundColor: '#fff', elevation: 7, shadowColor: COLORS.color4, flexDirection: 'row', padding: scale(10), borderRadius: scale(10) }}>

                                <View>
                                    <Image source={{ uri: item?.image }} style={{ width: scale(70), height: scale(70), resizeMode: 'contain' }} />

                                    <Text style={{ fontSize: scale(14), color: COLORS.black, fontFamily: 'Raleway-SemiBold', alignSelf: 'center', marginTop: scale(5) }}>
                                        <Text>${item?.price}</Text>
                                        <Text style={{ fontSize: scale(12), color: COLORS.black, fontFamily: 'Raleway-Regular' }}>
                                            /{item?.unit}
                                        </Text>
                                    </Text>
                                </View>

                                <View style={{ marginLeft: moderateScale(20), gap: scale(10) }}>
                                    <Text style={{ fontSize: scale(16), color: COLORS.black, fontFamily: 'Raleway-Bold', marginTop: scale(5) }}>{item?.name}</Text>

                                    <Text style={{ fontSize: scale(12), color: COLORS.black, fontFamily: 'Raleway-Regular' }}>
                                        <Text>Total is </Text>
                                        <Text style={{ fontSize: scale(14), color: COLORS.black, fontFamily: 'Raleway-SemiBold', marginTop: scale(5) }} >
                                            {`$${item?.price * item?.qty}`}
                                        </Text>
                                        <Text> by weight</Text>
                                    </Text>
                                </View>

                                <TouchableOpacity onPress={() => dispatch(removeFromCart(item))} style={{ position: 'absolute', top: scale(10), right: scale(10) }}>
                                    <Image source={require('../../assets/images/line-hor.png')} style={{ height: scale(10), aspectRatio: 1, resizeMode: 'contain' }} />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ position: 'absolute', bottom: scale(10), right: scale(10), backgroundColor: COLORS.color3, paddingHorizontal: moderateScale(20), paddingVertical: verticalScale(5), borderRadius: scale(8) }} onPress={() => navigation.navigate('Detail', { product: item })}>
                                    <Text style={{ color: COLORS.white, fontFamily: 'Raleway-Regular' }}>Change</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ fontFamily: "Raleway-Medium", fontSize: scale(18), color: COLORS.color3, alignSelf: 'center' }}>Cart is Empty</Text>
                    </View>
                )
            }

            {
                cart?.length > 0 && (
                    <View style={{ paddingHorizontal: moderateScale(15) }}>
                        <CButton onPress={() => {
                            Alert.alert("Order Placed", "Your order has been placed!", [{text: 'OK', onPress: () => {}}])
                            dispatch(emptyCart())
                            navigation.navigate('Home')
                        }} title={"Checkout"} disable={false} />
                    </View>
                )
            }

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.color1,
    },
});

//make this component available to the app
export default Cart;
