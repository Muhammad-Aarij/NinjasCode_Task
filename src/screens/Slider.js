import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { View, Text, Image } from 'react-native-animatable'
import banana from '../assets/images/banana.png'

export default function Slider() {
    return (
        <View style={styles.container}>
            <View style={styles.slider}>
                <View style={styles.sliderTile}>
                    <Image style={{ width: "100%", height: "100%", objectFit: "contain" }} source={banana} />
                </View>
                <View>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slider: {
        width: "100%",
        height: 250,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: "#f2f3f5",
        marginBottom: 10,
        borderWidth: 2,
        borderColor: "red",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
    },
    sliderTile: {
        width: "95%",
        height: "95%",
        borderRadius: 10,
        borderWidth: 2,
        overflow: "hidden"
    },
})