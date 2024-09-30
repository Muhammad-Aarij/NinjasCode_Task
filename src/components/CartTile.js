import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native'
import banana from '../assets/images/banana.png'
import { useTheme } from 'react-native-paper'
import { removeFromCart } from '../redux/slice/cartSlice'
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome6';
import Toast from 'react-native-toast-message'

export default function CartTile({ navigation, food }) {
    const dispatch = useDispatch();
    const theme = useTheme();

    const showToast = (name) => {
        Toast.show({
            type: 'info',
            // text1: 'Update !!!',
            text1: `${name} removed from Cart`,
            visibilityTime: 1500,
            position: 'top',
            topOffset: 10,
            autoHide: true,
            backgroundColor: "black",
        });
    };

    const handleRemove = () => {
        console.log('remove');
        dispatch(removeFromCart(food.id));
        showToast(food.name);
    };

    return (
        <View style={{ ...styles.container }}>
            <View style={styles.Top}>
                <View style={styles.TopLeft}>
                    <Image style={styles.img} source={{ uri: food.images }} />
                </View>
                <View style={styles.TopRight}>
                    <Text style={{ fontSize: 15, fontFamily: "sans-serif-medium", color: "black", marginBottom: 5, }}>{food.name ? food.name : "No Name"}</Text>
                    <Text style={{ fontSize: 13, fontFamily: "sans-serif-regular", color: "grey" }}>Total price ${food.totalPrice} by weight</Text>
                </View>
            </View>
            <View style={styles.Bottom}>
                <Text style={{ fontSize: 15, fontFamily: "sans-serif-regular", color: "black" }}>${food.pricePerKg}/kg</Text>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>

                    <TouchableOpacity style={styles.btn}>
                        <Text style={{ fontSize: 13, fontFamily: "sans-serif-regular", color: "white" }} onPress={() => { navigation.navigate("Details", { food, state: "Update" }) }}>Change</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.remover} onPress={handleRemove}>
                        <Icon name="trash" size={22} color="red" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'column',
        width: "100%",
        height: 110,
        // borderWidth: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        elevation: 1,
        marginBottom: 15,
        position: "relative",
    },
    Top: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: "75%",
        // borderWidth: 2,
        overflow: "hidden",
    },
    TopLeft: {
        width: "30%",
        height: "100%",
        // borderWidth: 2,
        marginRight: 15,
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
    TopRight: {
        width: "60%",
        // borderWidth:2,
        paddingTop: 5,
        height: "100%",
        justifyContent: 'Flex-start',
        alignItems: 'FLex-start',
        flexDirection: 'column',
    },
    Bottom: {
        height: "25%",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        // borderWidth: 1,
        // marginBottom:10,
        paddingHorizontal: 1,
        paddingLeft: 20,
    },
    btn: {
        width: 80,
        height: 30,
        // height: 50,
        backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 10,
        backgroundColor: "#ff844b",
        elevation: 1,
    },
    remover: {
        // position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        // top: 5,
        // right: 15,
        backgroundColor: "white",
        borderColor: "black",
        marginLeft: 5,
        // borderWidth: 1,
        // borderRadius: 25,
        // padding: 10,
    },
});
