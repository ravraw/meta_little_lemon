import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Onboarding from '../screens/OnboardingScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SplashScreen from '../screens/SplashScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { Navigator, Screen } = createNativeStackNavigator()

const StackNavigator = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSignedIn, setSignedIn] = useState(false)
    const [userToken, setUserToken] = useState(false)

    const colorScheme = useColorScheme()

    if (isLoading) {
        return <SplashScreen />
    }

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
            <Navigator>
                {isSignedIn ? (
                    <Screen name="Profile" component={ProfileScreen} />
                ) : (
                    <Screen name="Onboarding" component={Onboarding} />
                )}
            </Navigator>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default StackNavigator
