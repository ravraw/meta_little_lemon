import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

const MenuItem = ({ name, price }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.text}>{price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '100%',
    },
})

export default MenuItem
