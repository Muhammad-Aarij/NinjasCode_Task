import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ScrollView, Image } from 'react-native'
import { signOut } from '../redux/slice/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cherry from '../assets/images/banana.png';
import face from '../assets/images/face.png';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RecommendedTile from '../components/RecommendedTile';
import TopProductTile from '../components/TopProductTile';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoods } from '../redux/slice/foodSlice';
import Slider from './Slider';
// import { addToCart } from './cartSlice';

export default function Homepage({ navigation }) {

    const dispatch = useDispatch();

    const handleSignOut = () => {
        AsyncStorage.removeItem('userState');
        dispatch(signOut());
    };
    const { popular, recommendations, isLoading, error } = useSelector((state) => state.foods);

    useEffect(() => {
        dispatch(fetchFoods());
    }, [dispatch]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={{...styles.headerTitle,fontSize:25,}}>
                        Good Morning
                    </Text>
                    <Text style={{ ...styles.headerTitle, fontFamily: "sans-serif-black", fontSize: 24, }}>
                        Ghazi
                    </Text>
                </View>
                <View style={styles.headerRight}>
                    <Image style={{ width: 60, height: 60, objectFit: "contain" }} source={face} />
                </View>
            </View>
            <View style={styles.loacation}>
                <Icon name="location-pin" size={26} color="black" />
                <Text style={{ ...styles.headerTitle, color: "grey" }}>
                    Islamabad , Pakistan
                </Text>
            </View>
            <Slider />
            <View style={{ ...styles.loacation, marginBottom: 5, }}>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ width: "100%", marginTop: 5, }}>
                    <TouchableOpacity style={styles.menuBtn}>
                        <Text style={{ ...styles.headerTitle, color: "black" }}>
                            Chicken
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuBtn}>
                        <Text style={{ ...styles.headerTitle, color: "black" }}>
                            Meat
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuBtn}>
                        <Text style={{ ...styles.headerTitle, color: "black" }}>
                            Fruit
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <View style={styles.TitleContainer}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", fontFamily: "sans-serif-black" }}>
                    Top Products
                </Text>
                <Text style={{ ...styles.headerTitle, color: "grey", fontSize: 18 }}>
                    SHOW ALL
                </Text>
            </View>
            <View style={{ width: "100%", paddingBottom: 5, height: 220 }}>

                {isLoading !== true && popular.length > 0 && (
                    <ScrollView horizontal={true} contentContainerStyle={{ justifyContent: "flex-start", alignItems: "center" }} style={{
                        width: "100%", height: 160,
                    }}
                        showsHorizontalScrollIndicator={false}>
                        {popular.map((food) => (
                            <TopProductTile key={food.id} food={food} navigation={navigation} />
                        ))}

                    </ScrollView>)}
            </View>
            <View style={styles.TitleContainer}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: "black", fontFamily: "sans-serif-black" }}>
                    Recommendations
                </Text>
                <Text style={{ ...styles.headerTitle, color: "grey", fontSize: 18 }}>
                    SHOW ALL
                </Text>
            </View>
            <View style={{ width: "100%", marginBottom: 20, height: 120 }}>

                {isLoading !== true && popular.length > 0 && (
                    <ScrollView horizontal={true} style={{
                        width: "100%",
                    }}
                        showsHorizontalScrollIndicator={false}>

                        {recommendations.map((food) => (
                            <RecommendedTile key={food.id} food={food} navigation={navigation} />
                        ))}
                    </ScrollView>)
                }
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
        backgroundColor: "#f2f3f5",
    },
    headerTitle: {
        fontSize: 18,
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
        // marginTop: 10,
        alignItems: "center",

    },
});