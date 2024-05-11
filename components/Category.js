import React from 'react'
import { Text, StyleSheet, View, Pressable } from 'react-native'
import { capitalize } from '../utils/helper'

const Category = ({
    item: { item, index },
    filterMenu,
    selectedCategories,
}) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={[
                    styles.button,
                    selectedCategories[index] ? styles.buttonSelected : {},
                ]}
                onPress={() => filterMenu(index)}
            >
                <Text
                    style={[
                        styles.buttonText,
                        selectedCategories[index] ? { color: '#FFFFFF' } : {},
                    ]}
                >{`${capitalize(item)}`}</Text>
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
    buttonSelected: { color: '#FFFFFF' },
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
    buttonSelected: {
        backgroundColor: '#495E57',
    },
})

export default Category
