import { View, Text, StyleSheet, Image, TextInput } from 'react-native'

const HomeBanner = ({ navigation, searchString, setSearchString }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Little Lemon</Text>
            <View style={styles.sectionContainer}>
                <View style={styles.sectionLeft}>
                    <Text style={styles.subheading}>Chicago</Text>
                    <Text style={styles.normalText}>
                        We are family owned mediterranean restaurant, focu
                        traditional recipes served with a modern twist.
                    </Text>
                </View>
                <View style={styles.sectionRight}>
                    <Image
                        source={require('..//assets/images/HeroImage.png')}
                        style={styles.heroImage}
                    />
                </View>
            </View>
            <View style={styles.search}>
                <TextInput
                    value={searchString}
                    onChangeText={setSearchString}
                    placeholder="Search"
                    styles={styles.textInput}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#495E57',
        paddingVertical: 20,
        marginTop: 20,
    },
    heading: {
        fontSize: 34,
        color: '#F4CE14',
        marginHorizontal: 10,
    },
    subheading: {
        fontSize: 24,
        color: '#EDEFEE',
    },
    normalText: {
        fontSize: 16,
        color: '#EDEFEE',
        marginVertical: 10,
    },
    search: {
        width: '95%',
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderBlockColor: '#333333',
        borderRadius: 10,
        fontWeight: 'bold',
    },
    sectionContainer: {
        with: '100%',
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    sectionLeft: {
        width: '50%',
        justifyContent: 'space-between',
    },
    sectionRight: {
        marginLeft: 20,
    },
    heroImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
    },
})

export default HomeBanner
