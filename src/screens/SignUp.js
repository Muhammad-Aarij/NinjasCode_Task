import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import CustomTextInput from '../components/CustomTextInput';

export default function SignUp({ navigation }) {

    const theme = useTheme();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Sign Up</Text>
            <CustomTextInput
                label="Enter name"
                value={username}
                onChangeText={(username) => setUsername(username)}
                placeholder="Email"
            />
            <CustomTextInput
                label="Enter password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                placeholder="Password"
            />
            <CustomTextInput
                label="Enter confirm password"
                value={confirmPassword}
                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                placeholder="Confirm Password"
            />
            <View style={{ marginTop: 20, flexDirection: "row", gap: 5 }}>
                <Text style={styles.txt}>Already have an account?</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('SignIn');
                }}>
                    <Text style={{ ...styles.txt, fontWeight: 900 }}>SignIn</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#008080",

    },
    innercontainer: {
        flexDirection: 'column',
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 2,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    txt: {

        fontSize: 14,
        color: 'white',
    },
    heading: {
        fontSize: 34,
        fontFamily: "sans-serif-medium",
        color: 'white',
        marginBottom: 10,
    },
});