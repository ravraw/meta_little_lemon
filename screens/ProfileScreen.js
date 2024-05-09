import React, { useState, useEffect } from 'react'
import {
    Text,
    StyleSheet,
    View,
    TextInput,
    Pressable,
    Image,
    ScrollView,
} from 'react-native'
import { Switch } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    testFirstName,
    testLastName,
    testEmail,
    testPhoneNumber,
} from '../utils'

const ProfileScreen = ({ navigation }) => {
    const defaultProfile = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        orderStatuses: false,
        passwordChanges: false,
        specialOffers: false,
        newsletter: false,
    }

    const [profile, setProfile] = useState(defaultProfile)

    const [validFirstName, setValidFirstName] = useState(false)
    const [validLastName, setValidLastName] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [checked, setChecked] = React.useState(false)

    const validateFirstName = () => {
        setValidFirstName(testFirstName(profile.firstName))
    }

    const validateLastName = () => {
        setValidLastName(testLastName(profile.lastName))
    }

    const validateEmail = () => {
        setValidEmail(testEmail(profile.email))
    }

    const isValidPhoneNumber = () => {
        setPhoneNumber(testPhoneNumber(profile.phoneNumber))
    }

    const updateProfile = (obj) => {
        setProfile((prevState) => {
            return { ...prevState, ...obj }
        })
    }

    const logout = async () => {
        try {
            await AsyncStorage.setItem('isSignedIn', 'false')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // Populating preferences from storage using AsyncStorage.multiGet
        ;async () => {
            try {
                const savedProfile = await AsyncStorage.multiGet([
                    ...Object.keys(profile),
                ])

                const initialProfile = savedProfile.reduce((acc, curr) => {
                    // Every item in the values array is itself an array with a string key and a stringified value, i.e ['pushNotifications', 'false']
                    acc[curr[0]] = JSON.parse(curr[1])
                    return acc
                }, {})

                // setProfile(initialProfile)
            } catch (e) {
                console.log(e.message)
            } finally {
                console.log(profile)
            }
        }
    }, [])

    // useUpdate(() => {
    //     ;(async () => {
    //         const keyValues = Object.entries(profile).map((entry) => {
    //             return [entry[0], String(entry[1])]
    //         })
    //         try {
    //             await AsyncStorage.multiSet(keyValues)
    //         } catch (e) {
    //             Alert.alert(`An error occurred: ${e.message}`)
    //         }
    //     })()
    // }, [profile])

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
                        value={profile.firstName}
                        placeholder="John"
                        onChangeText={(value) =>
                            updateProfile({ firstName: value })
                        }
                        onChange={validateFirstName}
                        keyboardType="default"
                        maxLength={28}
                        style={styles.textInput}
                        clearButtonMode="always"
                    />
                </View>
                <View style={styles.textInputWrapper}>
                    <Text style={styles.textInputLabel}>Last Name</Text>
                    <TextInput
                        value={profile.lastName}
                        placeholder="Doe"
                        onChangeText={(value) =>
                            updateProfile('lastName', value)
                        }
                        onChange={validateLastName}
                        keyboardType="default"
                        maxLength={28}
                        style={styles.textInput}
                        clearButtonMode="always"
                    />
                </View>
                <View style={styles.textInputWrapper}>
                    <Text style={styles.textInputLabel}>Email</Text>
                    <TextInput
                        value={profile.email.toLowerCase()}
                        placeholder="Hello@example.com"
                        onChangeText={(value) => updateProfile('email', value)}
                        onChange={validateEmail}
                        keyboardType="email-address"
                        maxLength={50}
                        style={styles.textInput}
                        clearButtonMode="always"
                    />
                </View>
                <View style={styles.textInputWrapper}>
                    <Text style={styles.textInputLabel}>Phone number</Text>
                    <TextInput
                        value={profile.phoneNumber}
                        placeholder="(403)123-123"
                        onChangeText={(value) =>
                            updateProfile('phoneNumber', value)
                        }
                        onChange={isValidPhoneNumber}
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
                        value={profile.orderStatuses}
                        onValueChange={updateProfile({
                            orderStatuses: !profile.orderStatuses,
                        })}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Password changes</Text>
                    <Switch
                        color="#495E57"
                        value={profile.passwordChanges}
                        onValueChange={updateProfile({
                            passwordChanges: !profile.passwordChanges,
                        })}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Special offers</Text>
                    <Switch
                        color="#495E57"
                        value={profile.specialOffers}
                        onValueChange={updateProfile({
                            specialOffers: !profile.specialOffers,
                        })}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Newsletter</Text>
                    <Switch
                        color="#495E57"
                        value={profile.newsletter}
                        onValueChange={updateProfile({
                            newsletter: !profile.newsletter,
                        })}
                    />
                </View>
            </View>
            <Pressable style={styles.logoutButton} onPress={logout}>
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
