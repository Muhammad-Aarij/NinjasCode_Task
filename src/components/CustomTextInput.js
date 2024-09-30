import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';


const CustomTextInput = ({ value, onChangeText, placeholder, label }) => {
    const theme = useTheme();
    return (
        <View style={styles.container}>
            {label && <Text style={{...styles.label}}>{label}</Text>}
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#999"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: 'white',
    },
    input: {
        height: 55,
        width: 300,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor:"white",
    },
});

export default CustomTextInput;
