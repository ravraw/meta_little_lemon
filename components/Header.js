import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const Header = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/Logo.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        margin: 15,
    },
    logo: {
        resizeMode: 'contain',
    },
})

export default Header
