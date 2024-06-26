import React, { useState, useContext } from 'react'
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Pressable,
    Alert,
} from 'react-native'
import KeyboardAvoidingElement from '../components/KeyboardAvoidingElement'
import { testEmail, testFirstName } from '../utils'
import Header from '../components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SignedInContext } from '../App'

const OnboardingScreen = ({ navigation }) => {
    const { setIsSignedIn } = useContext(SignedInContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [validName, setValidName] = useState(false)
    const [validEmail, setValidEmail] = useState(false)

    const isValidName = () => {
        setValidName(testFirstName(name))
    }

    const isValidEmail = () => {
        setValidEmail(testEmail(email))
    }

    const setLoggedIn = async () => {
        setIsSignedIn(true)
        try {
            await AsyncStorage.setItem('isSignedIn', 'true')
        } catch (error) {
            console.log('Error saving login status to AsyncStorage:', error)
        }
    }

    // const showAlert = () =>
    //     Alert.alert('', 'Thanks for subscribing, stay tuned!', [
    //         {
    //             text: 'OK',
    //             onPress: setLoggedIn,
    //         },
    //     ])

    return (
        <KeyboardAvoidingElement>
            <View style={styles.container}>
                <Header />
                <Text style={styles.subheading}>Lets us get to know you</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.textInputWrapper}>
                        <Text style={styles.textInputLabel}>First Name</Text>
                        <TextInput
                            value={name}
                            placeholder="John"
                            onChangeText={setName}
                            onChange={isValidName}
                            keyboardType="default"
                            maxLength={28}
                            style={styles.textInput}
                            clearButtonMode="always"
                        />
                    </View>
                    <View style={styles.textInputWrapper}>
                        <Text style={styles.textInputLabel}>Email</Text>
                        <TextInput
                            value={email.toLowerCase()}
                            placeholder="Hello@example.com"
                            onChangeText={setEmail}
                            onChange={isValidEmail}
                            keyboardType="email-address"
                            maxLength={50}
                            style={styles.textInput}
                            clearButtonMode="always"
                        />
                    </View>
                </View>

                <Pressable
                    style={[
                        styles.button,
                        (!validName || !validEmail) && {
                            backgroundColor: 'gray',
                        },
                    ]}
                    disabled={!validName || !validEmail}
                    onPress={setLoggedIn}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingElement>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subheading: {
        width: '90%',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        fontSize: 20,
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    textInputWrapper: {
        width: '80%',
        alignItems: 'center',
        marginVertical: 15,
    },
    textInputLabel: {
        alignSelf: 'flex-start',
        marginVertical: 5,
    },
    textInput: {
        height: 50,
        width: '100%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
    },
    button: {
        height: 40,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10%',
        marginBottom: 25,
        alignSelf: 'flex-end',
        borderRadius: 10,
        backgroundColor: '#495E57',
    },
    buttonText: {
        color: '#FFFFFF',
    },
})

export default OnboardingScreen
