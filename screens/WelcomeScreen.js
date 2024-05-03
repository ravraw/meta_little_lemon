import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
} from 'react-native'

const WelcomeScreen = ({ navigation }) => {
    return (
        <View indicatorStyle="white" style={styles.container}>
            <ImageBackground
                style={styles.backgroundImage}
                source={require('../assets/images/backgroundImage.png')}
            >
                <View style={styles.contentWrapper}>
                    <Text style={styles.title}>Little Lemon</Text>
                    <Text style={styles.subtitle}>
                        Your local Mediterranean Bistro
                    </Text>
                    <Pressable
                        onPress={() => navigation.navigate('Menu', {})}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Menu</Text>
                    </Pressable>
                </View>
            </ImageBackground>
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

export default WelcomeScreen
