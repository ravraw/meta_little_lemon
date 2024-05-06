import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import MenuItem from './MenuItem'
import Categories from './Categories'

const renderItem = ({ item: { name, price, description, image } }) => (
    <MenuItem
        name={name}
        price={price}
        description={description}
        image={image}
    />
)
const keyExtractor = (item, i) => item + i

const MenuItemsList = ({ menu }) => {
    const menuCategories = [...new Set(menu.map((item) => item['category']))]

    const categoryItems = menuCategories.map((title) => {
        return { id: title, title }
    })

    // console.log(categoryItems)

    return (
        <View style={styles.container}>
            <Categories categories={categoryItems} />
            <FlatList
                data={menu}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 20,
    },
    subheading: {
        textAlign: 'center',
        fontSize: 32,
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    sectionHeading: {
        textAlign: 'center',
        fontSize: 24,
        flexWrap: 'wrap',
        margin: 15,
    },
    button: {
        padding: 10,
        marginVertical: 8,
        margin: 40,
        backgroundColor: '#EDEFEE',
        borderColor: '#EDEFEE',
        borderWidth: 2,
        borderRadius: 12,
    },
    buttonText: {
        color: '#333333',
        textAlign: 'center',
        fontSize: 18,
    },
})

export default MenuItemsList
