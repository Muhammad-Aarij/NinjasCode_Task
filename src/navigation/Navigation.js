import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Colors } from '../theme/color_theme';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Homepage from '../screens/Homepage';
import CategoryPage from '../screens/CategoryPage';
import SplashScreen from '../screens/SplashScreen';
import Cart from '../screens/Cart';
import DetailsPage from '../screens/DetailsPage';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUserFromStorage } from '../redux/slice/AuthSlice';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../redux/store/Store';
import { signOut } from '../redux/slice/AuthSlice';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import Slider from '../screens/Slider';
import linking from './Linking';

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        console.log("logout");
        await AsyncStorage.removeItem('userState');
        dispatch(signOut());
    }

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#fff',
                    height: 80,
                    margin: 15,
                    marginBottom: 20,
                    borderRadius: 50,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 3,
                },
                tabBarActiveTintColor: '#ff844b',
                tabBarInactiveTintColor: '#e5e5e5',
                tabBarLabelStyle: { display: "none" },
                tabBarItemStyle: { paddingVertical: 5 },

            }}>

            <Tab.Screen
                name="Homepage"
                component={Homepage}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={27} />
                    ),
                    headerShown: false
                }}
            />

            <Tab.Screen
                name="Category"
                component={CategoryPage}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="space-dashboard" color={color} size={27} />
                    ),
                    headerShown: false
                }}
            />

            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="shopping-cart" color={color} size={27} />
                    ),
                    headerShown: false
                }}
            />

            <Tab.Screen
                name="Logout"
                component={SignIn}
                listeners={{
                    tabPress: e => {
                        e.preventDefault();
                        handleLogout();
                    },
                }}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="logout" color={color} size={27} />
                    ),
                    tabBarLabel: 'Logout',
                    headerShown: false,
                }}
            />

        </Tab.Navigator>
    );
};


const AuthenticatedNavigator = () => {
    return (
        <AppStack.Navigator>
            <AppStack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
            <AppStack.Screen name="Details" component={DetailsPage} options={{ headerShown: false, presentation: 'modal' }} />
        </AppStack.Navigator>
    );
};


const UnauthenticatedNavigator = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <AuthStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    );
};


const MainNavigation = () => {
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
                <NavigationContainer linking={linking}>
                    {/* {isSignedIn ? <AuthenticatedNavigator /> : <UnauthenticatedNavigator />} */}
                    <AuthenticatedNavigator />
                    {/* <Slider /> */}
                    <Toast />
                </NavigationContainer>
            </PaperProvider>
        </Provider>
    );
};

export default MainNavigation;
