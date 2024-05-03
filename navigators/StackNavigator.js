import * as React from 'react'
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Onboarding from '../screens/OnboardingScreen'

const { Navigator, Screen } = createNativeStackNavigator()

const StackNavigator = () => {
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

export default StackNavigator