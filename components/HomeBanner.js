import { View, Text, StyleSheet, Image } from 'react-native'

const HomeBanner = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Little Lemon</Text>
            <View style={styles.sectionContainer}>
                <View style={styles.sectionLeft}>
                    <Text style={styles.subheading}>Chicago</Text>
                    <Text style={styles.normalText}>
                        We are family owned mediterranean restaurant, focused on
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        backgroundColor: '#495E57',
        borderWidth: 1,
        borderColor: 'red',
    },
    heading: {
        fontSize: 40,
        color: '#F4CE14',
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
    sectionContainer: {
        with: '100%',
        flexDirection: 'row',
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
