import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
} from 'react-native'
import HomeBanner from '../components/HomeBanner'
import MenuScreen from '../components/Menu'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <HomeBanner />
            <MenuScreen />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    contentWrapper: {
        marginTop: 50,
        width: '100%',
        alignItems: 'center',
    },
    title: {
        paddingVertical: 5,
        color: '#333333',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        width: '50%',
        alignSelf: 'center',
    },
    subtitle: {
        paddingVertical: 10,
        color: '#333333',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        width: '50%',
        alignSelf: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 12,
        elevation: 3,
        backgroundColor: '#4c6258',
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})

export default HomeScreen
