import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import CustomTextInput from '../components/CustomTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { signIn } from '../redux/slice/AuthSlice';
export default function SignUp({ navigation }) {

    const dispatch = useDispatch();
    const theme = useTheme();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async () => {
        if (password == confirmPassword) {
            if (username && password) {
                const user = { username, password };
                console.log("User")
                await AsyncStorage.setItem('userState', JSON.stringify(user));
                dispatch(signIn(user));
            } else {
                alert("Please enter username and password");
            }
        }
        else {
            alert("Passwords do not match");
        }
    };

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

            <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
                <Text >Sign Up</Text>
            </TouchableOpacity>

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
        backgroundColor: "#ff844b",

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
    btn:{
        width:150,
        backgroundColor:"white",
        padding:10,
        borderRadius:5,
        marginTop:15,
        justifyContent:"center",
        alignItems:"center",
    }
});