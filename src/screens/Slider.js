import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Linking } from 'react-native';
import { StyleSheet, TouchableOpacity, View, Image, Text, FlatList, Dimensions, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

export default function Slider() {
    const [btn, setButton] = useState(3);
    const flatListRef = useRef(null);

    const SliderData = [
        { image: require('../assets/images/5.png'), name: "Super Delicious Burger", url: "https://burgerlab.com.pk/" },
        { image: require('../assets/images/1.png'), name: "Organic and Fresh Vegetables", url: "https://islamabadgrocery.store/product-category/fruits-vegetables/" },
        { image: require('../assets/images/2.png'), name: "Delicious Pizza", url: "https://www.foodpanda.pk/chain/cw0ew/my-pizza-hut" },
        { image: require('../assets/images/3.png'), name: "Fresh Vegetables", url: "https://islamabadgrocery.store/product-category/fruits-vegetables/" },
        { image: require('../assets/images/4.png'), name: "Fresh Fruits", url: "https://farmtohome.com.pk/checkout?gad_source=1&gclid=Cj0KCQjwmOm3BhC8ARIsAOSbapULq6BGlexnM36wu6O_UdwIwRalLzfibwIanoJyWe-cCnBoBBVBgQkaAgPAEALw_wcB" },
    ];

    const openWebsite = (url) => {
        Linking.openURL(url)
            .catch(err => console.error("Failed to open URL", err));
    };

    const handleSlide = (index) => {
        setTimeout(() => {
            setButton(index);
        }, 700);

        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: index - 1 });
        }
    };

    const sliderMover = (status) => {
        if (status === "next") {
            if (btn < SliderData.length)
                handleSlide(btn + 1);
        } else {
            if (btn > 1)
                handleSlide(btn - 1);
        }
    }

    // useEffect(() => {

    //     setTimeout(() => {
    //         sliderMover("next");
    //     }, 2000);

    // }, [btn])

    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        console.log("Callbacks");
        if (viewableItems && viewableItems.length > 0) {
            const visibleIndex = viewableItems[0].index;
            setButton(visibleIndex + 1);
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.sliderWrapper}>
                <FlatList
                    ref={flatListRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    contentContainerStyle={styles.flatListContent}
                    data={SliderData}
                    renderItem={({ item }) => (
                        <Pressable style={styles.sliderItem} onPress={() => { openWebsite(item.url); }}>
                            <View style={styles.sliderTile}>
                                <Image style={styles.image} source={item.image} />
                            </View>

                            <Text style={styles.sliderText}>{item.name}</Text>
                        </Pressable>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    onViewableItemsChanged={onViewableItemsChanged}
                />
            </View>

            <View style={styles.btnContainer}>
                {SliderData.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => handleSlide(index + 1)}>
                        <Icon name="circle" size={15} color={btn === index + 1 ? "#ff844b" : "#ffe2d4"} />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.arrowContainer}>
                <TouchableOpacity style={styles.arrowBtnLeft} onPress={() => { sliderMover("prev") }}>
                    <Icon name="chevron-left" size={16} color="#fffdfc" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.arrowBtnRight} onPress={() => { sliderMover("next") }}>
                    <Icon name="chevron-right" size={16} color="#fffdfc" />
                </TouchableOpacity>
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
    sliderWrapper: {
        width: '100%',
        height: 190,
    },
    flatListContent: {
        gap: 10,
    },
    sliderItem: {
        width: width * 0.878,
        borderRadius: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
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
    sliderText: {
        position: "absolute",
        bottom: 15,
        fontFamily: "sans-serif-regular",
        fontSize: 14,
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: "white",
        paddingVertical: 3,
        paddingHorizontal: 30,
        borderRadius: 20,
    },
    btnContainer: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginTop: 10,
        marginBottom: 5,
    },
    arrowContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 7,
        paddingRight: 10,
        position: "absolute",
        top: "37%",
    },
    arrowBtnLeft: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 30,
        height: 30,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        paddingRight: 3,
    },
    arrowBtnRight: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 30,
        height: 30,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 3,
    },
});
