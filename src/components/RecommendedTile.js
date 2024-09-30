import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native'
import banana from '../assets/images/banana.png'
import { useTheme } from 'react-native-paper'

export default function RecommendedTile({ navigation, food }) {
    const theme = useTheme();
    // console.log("SRC URI"+food.images);
    return (
        <View style={{ ...styles.container }}>
            <View style={styles.Top}>
                <View style={styles.TopLeft}>
                    <Image style={styles.img} source={{ uri: food.images }}  />
                </View>
                <View style={styles.TopRight}>
                    <Text style={{ fontSize: 15, fontFamily: "sans-serif-medium", color: "black", marginBottom: 5, }}>{food.name}</Text>
                    <Text style={{ fontSize: 13, fontFamily: "sans-serif-regular", color: "grey" }}>weight 1000g</Text>
                </View>
            </View>
            <View style={styles.Bottom}>
                <Text style={{ fontSize: 15, fontFamily: "sans-serif-regular", color: "black" }}>${food.pricePerKg}/kg</Text>
                <TouchableOpacity style={styles.btn}>
                    <Text style={{ fontSize: 23, fontFamily: "sans-serif-regular", color: "white" }} onPress={() => { navigation.navigate("Details", { food }) }}>+</Text>
                </TouchableOpacity>
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
        width: 220,
        // borderWidth: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        elevation: 1,
        marginRight: 15,

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
        // borderWidth: 2,
        marginRight: 15,
    },
    img: {
        width: 70,
        height: 70,
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
        paddingHorizontal: 5,
        paddingLeft: 20,
    },
    btn: {
        width: 30,
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
        position: "absolute",
        // borderWidth:2,
        // borderRadius:50,
        // padding:5,
        width: 20,
        height: 20,
        top: 5,
        right: 15,
        backgroundColor: "white",
        borderColor: "black",
    },
});
