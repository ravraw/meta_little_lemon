import React from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

const MenuItem = ({ name, description, price, image }) => {
    console.log(`${name}`)
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{name}</Text>
            <Text style={styles.des}>{description}</Text>
            <Text style={styles.text}>{price}</Text>
            <Image
                style={styles.avatarImage}
                source={{
                    uri: 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true',
                }}
            />
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
