import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import Category from './Category'

const Categories = ({ categories }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={(item) => <Category item={item} />}
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
        marginVertical: 5,
        borderRadius: 10,
        borderBottomWidth: 0.5,
        borderColor: 'gray',
    },
})

export default Categories
