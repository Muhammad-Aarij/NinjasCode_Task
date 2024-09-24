import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper';
import CustomTextInput from '../components/CustomTextInput';
import { useTheme } from 'react-native-paper';
import { signIn } from '../redux/slice/AuthSlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn({ navigation }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleSignIn = () => {
        if (username && password) {
            const user = { username, password };
            console.log("User")
            AsyncStorage.setItem('userState', JSON.stringify(user));
            dispatch(signIn(user));
        } else {
            alert("Please enter username and password");
        }
    };


    return (
        <View style={styles.container}>
            <View style={{ ...styles.innercontainer, }}>
                <Text style={styles.heading}>Sign In</Text>
                <CustomTextInput
                    label="Enter Email"
                    value={username}
                    onChangeText={(username) => setUsername(username)}
                    placeholder="Email"
                />
                <CustomTextInput
                    label="Enter Password"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    placeholder="Password"
                />
                <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
                    <Text >Sign In</Text>
                </TouchableOpacity>

                <View style={{ marginTop: 20, flexDirection: "row", gap: 5 }}>
                    <Text style={styles.txt}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('SignUp');
                    }}>
                        <Text style={{ ...styles.txt, fontWeight: 900 }}>SignUp</Text>
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    innercontainer: {
        flexDirection: 'column',
        width: "100%",
        height: "55%",
        paddingTop: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: "#008080",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    heading: {
        fontSize: 34,
        fontFamily: "sans-serif-medium",
        color: 'white',
        marginBottom: 10,
    },
    txt: {
        fontSize: 14,
        color: 'white',
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