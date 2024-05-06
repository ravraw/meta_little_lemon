import React from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

const MenuItem = ({ name, description, price, image }) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentLeft}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>{`$${price}`}</Text>
            </View>
            <View style={styles.contentRight}>
                <Image
                    style={styles.itemImage}
                    source={{
                        uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        paddingVertical: 15,
        marginVertical: 5,
        borderRadius: 10,
        borderBottomWidth: 0.5,
        borderColor: 'gray',
    },
    name: {
        fontSize: 18,
        fontFamily: 'Karla',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        fontFamily: 'Karla',
        fontWeight: '300',
        paddingVertical: 5,
    },
    price: {
        fontSize: 16,
        fontFamily: 'Karla',
        fontWeight: 'bold',
    },
    itemImage: {
        width: 90,
        height: 90,
    },
    contentLeft: {
        width: '70%',
    },
    contentRight: {
        justifyContent: 'center',
    },
})

export default MenuItem
