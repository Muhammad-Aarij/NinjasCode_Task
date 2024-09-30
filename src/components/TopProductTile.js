import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native'
import banana from '../assets/images/banana.png'
import { useTheme } from 'react-native-paper'
// import cherry from '../assets/images/cherry.jpg'
import cherry from '../assets/images/burger.png'

export default function TopProductTile({ navigation, food }) {
    const theme = useTheme();
    return (
        <View style={{ ...styles.container }}>
            <View style={styles.Top}>
                <Image style={styles.img} source={{uri:food.images}} />
            </View>
            <View style={styles.Bottom}>
                <View style={styles.BottomLeft}>
                    <Text style={{ fontSize: 15, fontFamily: "sans-serif-medium", color: "black", marginBottom: 5, }}>{food.name}</Text>
                    <Text style={{ fontSize: 13, fontFamily: "sans-serif-regular", color: "grey" }}>weight 1000g</Text>
                    <Text style={{ fontSize: 15, fontFamily: "sans-serif-regular", color: "black" }}>${food.pricePerKg}/kg</Text>
                </View>
                <View style={styles.BottomRight}>
                    <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate("Details", { food }) }}>
                        <Text style={{ fontSize: 23, fontFamily: "sans-serif-regular", color: "white" }}>+</Text>
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
        height: 210,
        width: 160,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        elevation: 1,
        marginRight: 15,

    },
    Top: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: "60%",
        width:"100%",
        // borderWidth: 2,
        overflow: "hidden",
    },

    img: {
        width: "100%", 
        height: "100%",
        resizeMode: 'contain', 
    },
    BottomRight: {
        width: "20%",
        // borderWidth:2,
        // paddingTop: 5,
        height: "100%",
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'column',
    },
    BottomLeft: {
        width: "72%",
        // borderWidth: 2,
        paddingTop: 5,
        height: "100%",
        justifyContent: 'Flex-start',
        alignItems: 'FLex-start',
        flexDirection: 'column',
    },
    Bottom: {
        height: "38%",
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        // borderWidth: 1,
        // marginBottom:10,
        // paddingHorizontal: 5,
        // paddingLeft: 20,
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
