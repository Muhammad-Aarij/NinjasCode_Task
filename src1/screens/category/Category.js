//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import ProductHeader from '../../components/ProductHeader';
import { COLORS } from '../../constants/Colors';
import useFetch from '../../hooks/useFetch';
import ProductCard from '../../components/ProductCard';
import { verticalScale, scale, moderateScale } from 'react-native-size-matters';

// create a component
const Category = ({ navigation }) => {

    const {
        data: vegetables,
        loading: vegLoading,
        error: vegError,
        refetch: vegRetech
    } = useFetch(`https://mocki.io/v1/126979b5-b6a2-4463-a4eb-251b490d53d8`)

    const {
        data: fruit,
        loading: fruitLoading,
        error: fruitError,
        refetch: fruitRetech
    } = useFetch(`https://mocki.io/v1/ecbc3fcf-1578-48d5-94d2-8afe4fff3bab`)

    useEffect(() => {
        vegRetech()
    }, [])

    return (
        <ScrollView style={styles.container}>

            <View style={{ marginTop: verticalScale(20) }}>
                <ProductHeader title="Vegetables" />
            </View>

            {
                !vegLoading && vegetables && (
                    <>
                        <FlatList
                            data={vegetables.splice(0, vegetables?.length / 2)}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: scale(12), marginVertical: verticalScale(20), paddingHorizontal: moderateScale(15), alignSelf: 'flex-start', }}
                            renderItem={({ item }) => (
                                <ProductCard product={item} onPress={() => navigation.navigate('Detail', { product: item })} />
                            )}
                        />
                        <FlatList
                            data={vegetables.splice(vegetables?.length / 2 - 1, 8)}
                            horizontal
                            style={{  marginTop: scale(-20) }}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: scale(12), marginVertical: verticalScale(20), paddingHorizontal: moderateScale(15), alignSelf: 'flex-start', }}
                            renderItem={({ item }) => (
                                <ProductCard product={item} onPress={() => navigation.navigate('Detail', { product: item })} />
                            )}
                        />

                    </>
                )
            }
            {
                vegLoading && <View style={{ height: verticalScale(100), width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} color={COLORS.color3} />
                </View>
            }
            {
                !vegLoading && !!vegError && <Text>{vegError?.message}</Text>
            }

        
                <ProductHeader title="Fruit" />


            {
                !fruitLoading && fruit && (
                    <>
                        <FlatList
                            data={fruit}
                            horizontal
                            // style={{ flexGrow: 0 }}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ gap: scale(12), marginVertical: verticalScale(20), paddingHorizontal: moderateScale(15), alignSelf: 'flex-start', }}
                            renderItem={({ item }) => (
                                <ProductCard product={item} onPress={() => navigation.navigate('Detail', { product: item })} />
                            )}
                        />
                    </>
                )
            }
            {
                fruitLoading && <View style={{ height: verticalScale(100), width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} color={COLORS.color3} />
                </View>
            }
            {
                !fruitLoading && !!fruitError && <Text>{fruitError?.message}</Text>
            }

        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.color1
    },
});

//make this component available to the app
export default Category;


