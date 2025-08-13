import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import OnBoardingScreen from '../screens/onboarding/OnBoardingScreen';
import { getItem } from '../screens/utils/asyncStorage'; // Asegurate que la ruta sea correcta

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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
