//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { COLORS } from '../../constants/Colors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CButton from '../../components/CButton';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

// create a component
const Detail = ({ navigation, route }) => {

    const { product } = route.params;
    const dispatch = useDispatch()

    const cart = useSelector(state => state?.cart);
    const [itemQty] = (Array.isArray(cart) ? cart.filter((item) => item?.name === product?.name) : []);

    const [showImage, setShowImage] = useState();
    const [quantity, setQuantity] = useState(itemQty?.qty ?? 0);

    const increment = () => {
        if (quantity < 10) {
            setQuantity(quantity + 1);
        }
    };

    const decrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/images/chevron-left.png')} style={{ height: scale(35), width: scale(35), resizeMode: 'contain' }} />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Image source={require('../../assets/images/heart-outline.png')} style={{ height: scale(35), width: scale(35), resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center' }}>

                <View style={{ gap: scale(6), alignItems: 'center', marginVertical: verticalScale(30) }}>
                    <Text style={{ fontSize: scale(28), color: COLORS.black, fontFamily: 'Raleway-Bold' }}>{product?.name}</Text>
                    <Text style={{ fontSize: scale(16), color: COLORS.color2, fontFamily: 'Raleway-Medium' }}>Vegetables</Text>
                </View>


                <Image source={{ uri: showImage ?? product?.image }} style={{ height: verticalScale(170), aspectRatio: 1, resizeMode: 'contain' }} />

                <Text style={{ fontSize: scale(28), color: COLORS.black, fontFamily: 'Raleway-SemiBold' }}>
                    <Text>${product?.price}</Text>
                    <Text style={{ fontSize: scale(22), color: COLORS.color2, fontFamily: 'Raleway-Regular' }}>
                        /{product?.unit}
                    </Text>
                </Text>

                <View style={{ flexDirection: 'row', gap: scale(20), marginVertical: verticalScale(20) }}>
                    <TouchableOpacity onPress={decrement} style={{ height: scale(36), aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: scale(8), backgroundColor: '#fff' }}>
                        <Image source={require('../../assets/images/line-hor.png')} style={{ height: scale(16), aspectRatio: 1, resizeMode: 'center' }} />
                    </TouchableOpacity>

                    <Text style={{ fontSize: scale(22), marginTop: -3, color: COLORS.black, fontFamily: 'Raleway-SemiBold' }}>{quantity}</Text>

                    <TouchableOpacity onPress={increment} style={{ height: scale(36), aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: scale(8), backgroundColor: '#fff' }}>
                        <Image source={require('../../assets/images/plus.png')} style={{ height: scale(16), tintColor: '#1B110A', aspectRatio: 1, resizeMode: 'center' }} />
                    </TouchableOpacity>
                </View>
            </View>


            <Text style={{ fontSize: scale(14), marginVertical: scale(10), color: COLORS.color2, fontFamily: 'Raleway-Medium', textAlign: 'center' }}>Showcases</Text>

            <View style={{ alignItems: 'center' }}>
                <FlatList
                    data={product.images}
                    horizontal
                    contentContainerStyle={{ gap: scale(10) }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => setShowImage(item)} style={{ backgroundColor: COLORS.white, height: scale(72), aspectRatio: 1, borderRadius: scale(10), justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={{ uri: item }} style={{ width: scale(45), aspectRatio: 1, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    )}
                />
            </View>

            <CButton title="Add to Cart" disable={quantity == 0 ? true : false} onPress={() => {console.log({ ...product, qty: quantity });
             dispatch(addToCart({ ...product, qty: quantity }))}} />

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        padding: moderateScale(15)
    },
});

//make this component available to the app
export default Detail;
