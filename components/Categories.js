import React from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import Category from './Category'

const Categories = ({ categories }) => {
    return (
        <>
            <Text style={styles.subheading}> ORDER FOR DELIVERY!</Text>
            <View style={styles.container}>
                <FlatList
                    horizontal={true}
                    data={categories}
                    renderItem={({ item }) => <Category item={item} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </>
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
    subheading: {
        alignSelf: 'flex-start',
        fontSize: 20,
        fontWeight: 'bold',
    },
})

export default Categories
