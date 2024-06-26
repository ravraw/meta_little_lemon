import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import OnboardingScreen from '../screens/OnboardingScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SplashScreen from '../screens/SplashScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import { SignedInContext } from '../App'
import HomeScreen from '../screens/HomeScreen'

const { Navigator, Screen } = createNativeStackNavigator()

const StackNavigator = () => {
    const { isSignedIn, isLoading } = useContext(SignedInContext)
    const colorScheme = useColorScheme()

    if (isLoading) {
        return <SplashScreen />
    }

    // useEffect(() => {}, [isSignedIn])

    console.log('From Navigator --- ', isSignedIn)

    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor:
                        colorScheme === 'light' ? '#FFF' : '#333333',
                },
            ]}
        >
            {isSignedIn ? (
                <Navigator>
                    <Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{ headerShown: false }}
                    />
                    <Screen name="Welcome" component={WelcomeScreen} />
                    <Screen name="Menu" component={HomeScreen} />
                </Navigator>
            ) : (
                <Navigator>
                    <Screen name="Onboarding" component={OnboardingScreen} />
                </Navigator>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default StackNavigator
