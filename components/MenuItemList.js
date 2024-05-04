import React from 'react'
import { View, StyleSheet, SectionList, Text } from 'react-native'
import MenuItem from './MenuItem'

const renderItem = ({ item: { name, price } }) => (
    <MenuItem name={name} price={price} />
)
const renderSectionHeader = ({ section: { title } }) => (
    <View>
        <Text style={styles.sectionHeading}>{title}</Text>
    </View>
)
const keyExtractor = (item, i) => item + i

const MenuItemsList = ({ menu }) => {
    return (
        <View style={styles.container}>
            <SectionList
                sections={menu}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                renderSectionHeader={renderSectionHeader}
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
