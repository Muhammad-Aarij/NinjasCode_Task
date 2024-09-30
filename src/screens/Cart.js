import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, ScrollView } from 'react-native'
import CartTile from '../components/CartTile';
import { useSelector } from 'react-redux';

export default function Cart({navigation}) {

    const cartItems = useSelector((state) => state.cart.items);
   
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Cart
                </Text>
            </View>

            <View style={styles.tilesContainermain}>
                <ScrollView style={styles.tilesContainerTop}
                    showsVerticalScrollIndicator={false} >
                    {cartItems.length > 0 &&
                        cartItems.map((food) => {
                            return <CartTile key={food.id} food={food} navigation={navigation}/>;
                        })
                    }
                </ScrollView>

                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>
                        CheckOut
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        flexDirection: 'column',
        backgroundColor:"#f2f3f5",

    },
    header: {
        width: "100%",
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "black",
    },
    btn: {
        width: "70%",
        padding: 10,
        backgroundColor: "#ff844b",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 15,
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
    tilesContainermain: {
        // borderWidth: 2,
        height: "100%",
        flex: 1,
        justifyContent: "space-between",
    },
    tilesContainerTop: {
        // borderWidth:2,
        flexDirection: "column",
        gap: 10,
    },
});
