import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import cherry from '../assets/images/banana.png';
import { addToCart, updateCart } from '../redux/slice/cartSlice';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';


const QuantityControl = React.memo(({ quantity, handlePlus, handleMinus }) => (
    <View style={styles.qualityBtnContainer}>
        <TouchableOpacity style={styles.qualityBtn} onPress={handleMinus}>
            <Text style={styles.qualityText}>-</Text>
        </TouchableOpacity>
        <Text style={{ ...styles.qualityText, marginHorizontal: 30 }}>{quantity}</Text>
        <TouchableOpacity style={styles.qualityBtn} onPress={handlePlus}>
            <Text style={styles.qualityText}>+</Text>
        </TouchableOpacity>
    </View>
));


export default function DetailsPage({ navigation, route }) {

    const { food, state = 'add' } = route.params;

    const showToast = (item, msg) => {
        Toast.show({
            type: 'info',
            // text1: 'Update !!!',
            text1: `${item} ${msg} Cart`,
            visibilityTime: 1500,
            position: 'top',
            topOffset: 10,
            autoHide: true,
            backgroundColor: "black",
        });
    };

    console.log("state", state);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handlePlus = () => {
        setQuantity(quantity + 1);
    };
    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = (item) => {
        const Updatedfood = { ...food, quantity: quantity, price: quantity * food.pricePerKg }
        console.log("Adding to cart");
        dispatch(addToCart(Updatedfood));
        showToast(item.name, "added to");
        navigation.goBack();
    };
    const handleUpdateToCart = (item) => {
        const Updatedfood = { ...food, quantity: quantity, price: quantity * food.pricePerKg }
        console.log("Updating to cart");
        dispatch(updateCart(Updatedfood));
        showToast(item.name, "updated in");
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Icon name="left" size={30} color="black" onPres />
                </TouchableOpacity>
                <Icon name="hearto" size={30} color="black" />

            </View>
            <View style={styles.body}>
                <View style={styles.bodyTop}>
                    <Text style={{ fontSize: 30, fontFamily: "sans-serif-black", color: "black" }}>
                        {food.name}
                    </Text>
                    <Text style={{ fontSize: 18, fontFamily: "sans-serif-regular", color: "grey", marginTop: 5 }}>
                        {food.category}
                    </Text>
                </View>
                <View style={styles.bodyMid}>
                    <View style={styles.mainImgcontainer}>
                        <Image style={styles.img} source={{ uri: food.images }} defaultSource={require('../assets/images/banana.png')}></Image>
                    </View>
                    <Text style={{ fontSize: 20, fontFamily: "sans-serif-medium", color: "black", marginTop: 15 }}>
                        ${food.pricePerKg}/Kg
                    </Text>
                    <Text style={{ fontSize: 20, fontFamily: "sans-serif-medium", color: "grey", marginTop: 15 }}>
                        Total Price : $ {food.pricePerKg * quantity}
                    </Text>
                    <QuantityControl quantity={quantity} handlePlus={handlePlus} handleMinus={handleMinus} />
                </View>
                <View style={styles.bodyBottom}>
                    <Text style={{ fontSize: 16, fontFamily: "sans-serif-regular", color: "grey", marginBottom: 10 }}>Showcases</Text>
                    <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ width: "100%" }}>
                        <View style={{ marginRight: 10, width: 80, height: 80, borderRadius: 20, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ width: 70, height: 70, objectFit: "contain" }} source={{ uri: food.images }} ></Image>
                        </View>
                        <View style={{ marginRight: 10, width: 80, height: 80, borderRadius: 20, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>
                            <Image style={{ width: 70, height: 70, objectFit: "contain" }} source={{ uri: food.images }} ></Image>
                        </View>

                    </ScrollView>
                </View>
            </View>

            {state != "Update" && <TouchableOpacity style={styles.btn} onPress={() => { handleAddToCart(food) }}>
                <Text style={styles.btnText}>
                    Add to Cart
                </Text>
            </TouchableOpacity>}
            {state == "Update" && <TouchableOpacity style={styles.btn} onPress={() => { handleUpdateToCart(food) }}>
                <Text style={styles.btnText}>
                    Update Cart
                </Text>
            </TouchableOpacity>}

        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#f2f3f5",
    },
    header: {
        width: "100%",
        flexDirection: "row",
        height: 40,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        // borderWidth: 1,
        marginBottom: 5,
    },
    btn: {
        width: "70%",
        padding: 10,
        backgroundColor: "#ff844b",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 25,
        marginVertical: 10,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    btnText: {
        fontSize: 13,
        fontWeight: '500',
        color: "white",
    },
    body: {
        flex: 1,
        marginVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "column",
        alignItems: "center",
        height: "10%"
    },
    bodyTop: {
        // borderWidth: 2,
        width: "100%",
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    bodyMid: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 20,
        // borderWidth: 2,
    },
    mainImgcontainer: {
        flex: 1,
        // borderWidth: 2,
        width: "100%",
        height: "70%",
    },
    img: {
        // borderWidth: 1,
        width: "100%",
        height: "100%",
        resizeMode: "contain",
    },
    qualityBtnContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    qualityText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        marginHorizontal: 5,
    },
    qualityBtn: {
        width: 50,
        height: 50,
        // borderWidth: 1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    bodyBottom: {
        width: "100%",
        height: "18%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        // borderWidth: 2,
    },
});
