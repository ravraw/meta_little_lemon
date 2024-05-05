import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import OnboardingScreen from '../screens/OnboardingScreen'
import ProfileScreen from '../screens/ProfileScreen'
import SplashScreen from '../screens/SplashScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import MenuScreen from '../screens/MenuScreen'
import { SignedInContext } from '../App'
import HomeScreen from '../screens/HomeScreen'

const { Navigator, Screen } = createNativeStackNavigator()

const StackNavigator = () => {
    const {
        userStatus: { isSignedIn, isOnboardingCompleted },
        setUserStatus,
        isLoading,
    } = useContext(SignedInContext)
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
            {/* <Navigator>
                {isSignedIn ? (
                    <>
                        <Screen name="Welcome" component={WelcomeScreen} />
                        <Screen name="Menu" component={MenuScreen} />
                        <Screen
                            name="Profile"
                            component={ProfileScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                ) : (
                    <Screen name="Onboarding" component={OnboardingScreen} />
                )}
            </Navigator> */}

            <Navigator>
                <>
                    {/* <Screen name="Home" component={HomeScreen} />
                    <Screen name="Welcome" component={WelcomeScreen} /> */}
                    <Screen name="Menu" component={MenuScreen} />
                    {/* <Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{ headerShown: false }}
                    /> */}
                </>

                <Screen name="Onboarding" component={OnboardingScreen} />
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
