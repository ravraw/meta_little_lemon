import React, { useState, useEffect, useContext } from 'react'
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    Pressable,
    Image,
} from 'react-native'
import { Switch } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useUpdate from '../hooks/useUpdate'
import { SignedInContext } from '../App'
import { validateName } from '../utils'

const ProfileScreen = ({ navigation }) => {
    const defaultPreferences = {
        orderStatuses: true,
        passwordChanges: true,
        specialOffers: true,
        newsletter: true,
    }
    const [preferences, setPreferences] = useState(defaultPreferences)

    const { setSignedIn } = useContext(SignedInContext)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [validFirstName, setValidFirstName] = useState(false)
    const [validLastName, setValidLastName] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [checked, setChecked] = React.useState(false)

    const isValidFirstName = () => {
        setValidName(validateName(firstName))
    }

    const isValidLastName = () => {
        setValidName(validateName(lastName))
    }

    const isValidEmail = () => {
        setValidEmail(validEmail(email))
    }

    const isValidPhoneNumber = () => {
        setValidEmail(validateEmail(email))
    }

    useEffect(() => {
        // Populating preferences from storage using AsyncStorage.multiGet
        ;(async () => {
            try {
                const values = await AsyncStorage.multiGet(
                    Object.keys(preferences)
                )
                const initialState = values.reduce((acc, curr) => {
                    // Every item in the values array is itself an array with a string key and a stringified value, i.e ['pushNotifications', 'false']
                    acc[curr[0]] = JSON.parse(curr[1])
                    return acc
                }, {})
                setPreferences(initialState)
            } catch (e) {
                Alert.alert(`An error occurred: ${e.message}`)
            }
        })()
    }, [])

    useUpdate(() => {
        ;(async () => {
            const keyValues = Object.entries(preferences).map((entry) => {
                return [entry[0], String(entry[1])]
            })
            try {
                await AsyncStorage.multiSet(keyValues)
            } catch (e) {
                Alert.alert(`An error occurred: ${e.message}`)
            }
        })()
    }, [preferences])

    const updateState = (key) => () =>
        setPreferences((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }))

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Personal Information</Text>
            <View style={styles.avatarContainer}>
                <Image
                    source={require('../assets/images/avatar.png')}
                    style={styles.avatarImage}
                />
                <Pressable style={[styles.button, styles.saveButton]}>
                    <Text style={[styles.buttonText, styles.buttonTextWhite]}>
                        Change
                    </Text>
                </Pressable>
                <Pressable style={[styles.button, styles.discardButton]}>
                    <Text style={styles.buttonText}>Remove</Text>
                </Pressable>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.textInputWrapper}>
                    <Text style={styles.textInputLabel}>First Name</Text>
                    <TextInput
                        value={firstName}
                        placeholder="John"
                        onChangeText={setFirstName}
                        onChange={isValidFirstName}
                        keyboardType="default"
                        maxLength={28}
                        style={styles.textInput}
                        clearButtonMode="always"
                    />
                </View>
                <View style={styles.textInputWrapper}>
                    <Text style={styles.textInputLabel}>Last Name</Text>
                    <TextInput
                        value={lastName}
                        placeholder="Doe"
                        onChangeText={setLastName}
                        onChange={isValidLastName}
                        keyboardType="default"
                        maxLength={28}
                        style={styles.textInput}
                        clearButtonMode="always"
                    />
                </View>
                <View style={styles.textInputWrapper}>
                    <Text style={styles.textInputLabel}>Email</Text>
                    <TextInput
                        value={email}
                        placeholder="Hello@example.com"
                        onChangeText={setEmail}
                        onChange={isValidEmail}
                        keyboardType="email-address"
                        maxLength={50}
                        style={styles.textInput}
                        clearButtonMode="always"
                    />
                </View>
                <View style={styles.textInputWrapper}>
                    <Text style={styles.textInputLabel}>Phone number</Text>
                    <TextInput
                        value={phoneNumber}
                        placeholder="(403)123-123"
                        onChangeText={setEmail}
                        onChange={isValidEmail}
                        keyboardType="number-pad"
                        maxLength={50}
                        style={styles.textInput}
                        clearButtonMode="always"
                    />
                </View>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.header}>Email notification</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>Order statuses</Text>
                    <Switch
                        color="#495E57"
                        value={preferences.orderStatuses}
                        onValueChange={updateState('orderStatuses')}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Password changes</Text>
                    <Switch
                        color="#495E57"
                        value={preferences.passwordChanges}
                        onValueChange={updateState('passwordChanges')}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Special offers</Text>
                    <Switch
                        color="#495E57"
                        value={preferences.specialOffers}
                        onValueChange={updateState('specialOffers')}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Newsletter</Text>
                    <Switch
                        color="#495E57"
                        value={preferences.newsletter}
                        onValueChange={updateState('newsletter')}
                    />
                </View>
            </View>
            <Pressable style={styles.logoutButton}>
                <Text style={styles.buttonText}>Log out</Text>
            </Pressable>

            <View style={styles.changeButtonsContainer}>
                <Pressable style={[styles.button, styles.discardButton]}>
                    <Text style={styles.buttonText}>Discard changes</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.saveButton]}>
                    <Text style={[styles.buttonText, styles.buttonTextWhite]}>
                        Save changes
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#ecf0f1',
    },
    avatarContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        width: 75,
        height: 75,
        borderRadius: 100,
        marginHorizontal: 10,
    },
    rowContainer: {
        width: '80%',
        alignItems: 'flex-start',
        alignSelf: 'center',
        paddingVertical: 30,
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
    },
    switch: {
        color: '#495E57',
    },
    text: {
        fontSize: 18,
    },
    header: {
        marginVertical: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
    },
    textInputWrapper: {
        width: '80%',
        alignItems: 'center',
        marginVertical: 10,
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
    logoutButton: {
        height: 40,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10%',
        marginVertical: 15,
        alignSelf: 'flex-end',
        borderRadius: 10,
        backgroundColor: '#F4CE14',
    },
    changeButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonText: {
        color: '#333333',
        fontWeight: 'bold',
    },
    buttonTextWhite: {
        color: '#EDEFEE',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#333333',
    },
    discardButton: {
        backgroundColor: '#EDEFEE',
    },
    saveButton: {
        backgroundColor: '#495E57',
    },
})

export default ProfileScreen
