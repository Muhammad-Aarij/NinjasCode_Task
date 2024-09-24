import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Colors } from '../theme/color_theme';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Homepage from '../screens/Homepage';
import SplashScreen from '../screens/SplashScreen';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUserFromStorage } from '../redux/slice/AuthSlice';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../redux/store/Store';

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const AuthenticatedNavigator = () => {
    return (
        <AppStack.Navigator >
            <AppStack.Screen name="Homepage" component={Homepage} options={{ headerShown: false }} />
        </AppStack.Navigator>
    );
};


const UnauthenticatedNavigator = () => {
    return (
        <AuthStack.Navigator >
            {/* <AuthStack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} /> */}
            <AuthStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <AuthStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    );
};


const MainNavigation = () => {
    // const [isSignedIn, setIsSignedIn] = useState(null);
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);
    const dispatch = useDispatch();
    const colorScheme = useColorScheme();
    const paperTheme = colorScheme === 'dark'
        ? { ...MD3DarkTheme, colors: Colors.dark }
        : { ...MD3LightTheme, colors: Colors.light };

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem('userState');
            if (storedUser) {
                dispatch(loadUserFromStorage(JSON.parse(storedUser)));
            }
           };
        loadUser();
    }, [dispatch]);

    return (
        <Provider store={store}>
            <PaperProvider theme={paperTheme}>
                <NavigationContainer>
                    {isSignedIn ? <AuthenticatedNavigator /> : <UnauthenticatedNavigator />}
                </NavigationContainer>
            </PaperProvider>
        </Provider>
    );
};

export default MainNavigation;

