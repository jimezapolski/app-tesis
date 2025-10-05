import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import OnBoardingScreen from '../screens/onboarding/OnBoardingScreen';
import { getItem } from '../src/utils/asyncStorage';
import ScanScreen from "../screens/scan/ScanScreen";
import ProductDetailsScreen from "../screens/scan/ProductDetailsScreen";
import HistoryScreen from '../screens/history/HistoryScreen';

const Stack = createStackNavigator();

export default function AppNavigation() {
    const [showOnboarding, setShowOnboarding] = useState(null);

    useEffect(() => {
        checkIfAlreadyOnboarded();
    }, []);

    const checkIfAlreadyOnboarded = async () => {
        try {
            const onboarded = await getItem('onboarded');
            if (onboarded) {
                setShowOnboarding(true);
            } else {
                setShowOnboarding(true);
            }
        } catch (error) {
            console.error('Error checking onboarded state:', error);
            setShowOnboarding(true); // fallback a onboarding en caso de error
        }
    };

    if (showOnboarding === null) {
        return null; // podés mostrar un spinner acá si querés
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={showOnboarding ? "Onboarding" : "Home"}>
                <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnBoardingScreen} />
                <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
                <Stack.Screen name="Scan" component={ScanScreen} options={{ title: "Escanear producto" }} />
                <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: "Producto" }} />
                <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Historial' }} /> 

            </Stack.Navigator>
        </NavigationContainer>
    );
}
