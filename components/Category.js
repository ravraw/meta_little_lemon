import React from 'react'
import { Text, StyleSheet, View, Pressable } from 'react-native'

const Category = ({ item: { id, title } }) => {
    return (
        <View style={styles.container}>
            <Pressable style={[styles.button, styles.discardButton]}>
                <Text style={styles.buttonText}>{`${title}`}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignSelf: 'center',
        // paddingVertical: 15,
        // marginVertical: 5,
        // borderRadius: 10,
        // borderBottomWidth: 0.5,
        // borderColor: 'gray',
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Karla',
        fontWeight: 'bold',
    },
})

export default Category
