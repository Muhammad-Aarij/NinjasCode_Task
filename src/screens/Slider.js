import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

export default function Slider() {
    const [btn, setButton] = useState(1);
    const flatListRef = useRef(null);

    const SliderData = [
        { image: require('../assets/images/1.png'), name: "Organic and Fresh Vegetables" },
        { image: require('../assets/images/2.png'), name: "Delicious Pizza" },
        { image: require('../assets/images/3.png'), name: "Fresh Vegetables" },
        { image: require('../assets/images/4.png'), name: "Fresh Fruits" },
        { image: require('../assets/images/5.png'), name: "Super Delicious Burger" }
    ];

    const handleSlide = (index) => {
        setButton(index);

        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: index - 1, });
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: 190 }}>
                <FlatList
                    ref={flatListRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    contentContainerStyle={{ gap: 10 }}
                    data={SliderData}
                    renderItem={({ item }) => (
                        <View style={{
                            width: width * 0.878,
                            borderRadius: 20,
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <View style={styles.sliderTile}>
                                <Image
                                    style={styles.image}
                                    source={item.image}
                                />
                            </View>
                            <Text style={{
                                position: "absolute",
                                bottom: 15,
                                fontFamily: "sans-serif-regular",
                                fontSize: 14,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                color: "white",
                                paddingVertical: 3,
                                paddingHorizontal: 30,
                                borderRadius: 20
                            }}>
                                {item.name}
                            </Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <View style={styles.btnContainer} >
                {SliderData.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleSlide(index + 1)}>
                        <Icon name="circle" size={15} color={btn === index + 1 ? "#BFBFBF" : "#e5e5e5"} />
                    </TouchableOpacity>
                ))}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginTop:10,
        marginBottom: 5,
    },
    sliderTile: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        objectFit: "cover",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 15,
    },
});
