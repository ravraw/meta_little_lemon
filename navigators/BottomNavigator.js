import * as React from 'react'
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Onboarding from '../screens/OnboardingScreen'

const { Navigator, Screen } = createBottomTabNavigator()

const BottomNavigator = () => {
    const colorScheme = useColorScheme()
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
                <Screen name="Onboarding" component={Onboarding} />
            </Navigator>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default BottomNavigator
