import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../redux/slice/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecommendedTile from '../components/RecommendedTile';
import TopProductTile from '../components/TopProductTile';
import { fetchFoods } from '../redux/slice/foodSlice';

export default function CategoryPage({ navigation }) {
    const dispatch = useDispatch();


    const { fruits, vegetables, isLoading, error } = useSelector((state) => state.foods);

    useEffect(() => {
        dispatch(fetchFoods());
    }, [dispatch]);



    return (
        <ScrollView style={styles.container}>
            <View style={styles.TitleContainer}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", fontFamily: "sans-serif-black" }}>
                    Fruits
                </Text>
                <Text style={{ ...styles.headerTitle, color: "grey", fontSize: 18 }}>
                    SHOW ALL
                </Text>
            </View>
            <View style={{ width: "100%", marginVertical: 10, height: 220 }}>
                {isLoading && <Text style={{ fontSize: 14, alignSelf: "center" }}>Loading</Text>}

                {isLoading !== true && fruits.length > 0 && (
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={{ justifyContent: "flex-start" }}
                        style={{ width: "100%" }}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{ flexDirection: "column" }}>
                            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                {fruits.map((food) => {
                                    return <TopProductTile key={food.id} food={food} navigation={navigation} />
                                })}
                            </View>

                        </View>
                    </ScrollView>
                )}
            </View>

            <View style={styles.TitleContainer}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", fontFamily: "sans-serif-black" }}>
                    Vegetables
                </Text>
                <Text style={{ ...styles.headerTitle, color: "grey", fontSize: 18 }}>
                    SHOW ALL
                </Text>
            </View>
            <View style={{
                width: "100%",
                marginVertical: 10,
                height: 150,
            }}>
                {isLoading && <Text style={{ fontSize: 14, alignSelf: "center" }}>Loading</Text>}
                {isLoading !== true && vegetables.length > 0 && (
                    <ScrollView horizontal={true} style={{
                        width: "100%", marginVertical: 10, height: "100%",
                    }}
                        showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: "column" }}>

                            <View style={{ flexDirection: "row", marginBottom: 10 }}>

                                {vegetables.map((food) => {
                                    return <RecommendedTile key={food.id} food={food} navigation={navigation} />
                                })
                                }
                            </View>
                        </View>
                    </ScrollView>)}
            </View>
        </ScrollView>
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
        height: 80,
        justifyContent: 'space-between',
        // alignItems: 'center',
        flexDirection: "row",
        marginBottom: 15,
        // borderWidth: 2,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "400",
        color: "black",
        fontFamily: "sans-serif-condensed",
    },
    headerLeft: {
        flexDirection: "column",
        justifyContent: 'space-evenly',
        width: "70%",
        paddingLeft: 10,
        // borderWidth: 2,
    },
    loacation: {
        justifyContent: 'flex-start',
        alignItems: "center",
        width: "100%",
        paddingLeft: 10,
        // borderWidth: 2,
        flexDirection: "row",
        paddingVertical: 5,
        marginBottom: 5,
    },
    headerRight: {
        width: "26%",
        paddingRight: 10,
        // borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    menuBtn: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 15,
        paddingVertical: 6,
        marginHorizontal: 5,
        marginBottom: 5,
        // borderWidth: 1,
        borderColor: "#D3D3D3",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        borderRadius: 15,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        elevation: 2,
        //
    },
    TitleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        // borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginTop: 10,
        alignItems: "center",

    },
});