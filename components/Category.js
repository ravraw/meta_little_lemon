import React from 'react'
import { Text, StyleSheet, View, Pressable } from 'react-native'
import { capitalize } from '../utils/helper'

const Category = ({ item: { id, title } }) => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.button}>
                <Text style={styles.buttonText}>{`${capitalize(title)}`}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {},
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#495E57',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 5,
        borderRadius: 25,
        backgroundColor: '#EDEFEE',
        borderWidth: 1,
        borderColor: '#333333',
    },
})

export default Category
