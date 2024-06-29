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

import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const ProfileScreen = ({ navigation }) => {
    const defaultImage = 'https://rb.gy/tstvo8'
    const defaultProfile = {
        personalInformation: {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
        },
        emailNotification: {
            orderStatuses: false,
            passwordChanges: false,
            specialOffers: false,
            newsletter: false,
        },
    }

    const [profile, setProfile] = useState(defaultProfile)
    const [validFirstName, setValidFirstName] = useState(false)
    const [validLastName, setValidLastName] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [validPhoneNumber, setValidPhoneNumber] = useState(false)
    const [checked, setChecked] = useState(false)
    const [profileImage, setProfileImage] = useState(defaultImage)

    const validateFirstName = () => {
        setValidFirstName(testFirstName(profile.personalInformation.firstName))
    }

    const validateLastName = () => {
        setValidLastName(testLastName(profile.personalInformation.lastName))
    }

    const validateEmail = () => {
        setValidEmail(testEmail(profile.personalInformation.email))
    }

    const isValidPhoneNumber = () => {
        setValidPhoneNumber(
            testPhoneNumber(profile.personalInformation.phoneNumber)
        )
    }

    const updatePersonalInformation = (obj) => {
        console.log('from Update profile', obj)
        setProfile((prevState) => {
            return {
                ...prevState,
                personalInformation: {
                    ...prevState.personalInformation,
                    ...obj,
                },
            }
        })
    }

    const updateEmailNotification = (obj) => {
        console.log('from Update profile', obj)
        setProfile((prevState) => {
            return {
                ...prevState,
                emailNotification: { ...prevState.emailNotification, ...obj },
            }
        })
    }

    const logout = async () => {
        try {
            await AsyncStorage.setItem('isSignedIn', 'false')
        } catch (error) {
            console.log(error)
        }
    }

    const changeImage = () => {
        launchImageLibrary({ storageOptions: { path: 'image' } }, (respose) => {
            setProfileImage(respose.assets[0].uri)
        })
    }

    const removeImage = () => setProfileImage(defaultImage)

    const saveChanges = async () => {
        try {
            const personalInformationChanges = Object.entries(
                profile.personalInformation
            )
            const emailNotificationChanges = Object.entries(
                profile.emailNotification
            ).map((entry) => [entry[0], entry[1] ? 'true' : 'false'])
            console.log({
                personalInformationChanges,
                emailNotificationChanges,
            })
            await AsyncStorage.multiSet([
                ...personalInformationChanges,
                ...emailNotificationChanges,
            ])
        } catch (error) {
            console.log(error)
        }
    }
    const discardChanges = () => {
        setProfile()
    }

    const fetchSavedProfile = async () => {
        try {
            const savedProfile = await AsyncStorage.multiGet([
                ...Object.keys(profile.personalInformation),
                ...Object.keys(profile.emailNotification),
            ])
            const initialProfile = savedProfile.reduce((acc, curr) => {
                if (
                    Object.keys(defaultProfile.personalInformation).includes(
                        curr[0]
                    )
                ) {
                    acc.personalInformation[curr[0]] = curr[1]
                } else {
                    acc.emailNotification[curr[0]] = curr[1] === 'true'
                }
                return acc
            }, defaultProfile)
            setProfile(initialProfile)
        } catch (e) {
            console.log(e.message)
        } finally {
            console.log({ profileScreen: profile })
        }
    }

    useEffect(() => {
        // fetchSavedProfile()
    }, [])

    console.log('From Pofile screen', profile)

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Personal Information</Text>
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: profileImage }}
                    style={styles.avatarImage}
                />
                <Pressable
                    style={[styles.button, styles.saveButton]}
                    onPress={changeImage}
                >
                    <Text style={[styles.buttonText, styles.buttonTextWhite]}>
                        Change
                    </Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.discardButton]}
                    onPress={removeImage}
                >
                    <Text style={styles.buttonText}>Remove</Text>
                </Pressable>
            </View>

            <View style={styles.inputContainer}>
                <View style={styles.textInputWrapper}>
                    <Text style={styles.textInputLabel}>First Name</Text>
                    <TextInput
                        value={profile.personalInformation.firstName}
                        placeholder="John"
                        onChange={({ nativeEvent }) =>
                            updatePersonalInformation({
                                firstName: nativeEvent.text,
                            })
                        }
                        onChangeText={validateFirstName}
                        keyboardType="default"
                        maxLength={28}
                        style={styles.textInput}
                        clearButtonMode="always"
                    />
                </View>
                <View style={styles.textInputWrapper}>
                    <Text style={styles.textInputLabel}>Last Name</Text>
                    <TextInput
                        value={profile.personalInformation.lastName}
                        placeholder="Doe"
                        onChange={({ nativeEvent }) =>
                            updatePersonalInformation({
                                lastName: nativeEvent.text,
                            })
                        }
                        onChangeText={validateLastName}
                        keyboardType="default"
                        maxLength={28}
                        style={styles.textInput}
                        clearButtonMode="always"
                    />
                </View>
                <View style={styles.textInputWrapper}>
                    <Text style={styles.textInputLabel}>Email</Text>
                    <TextInput
                        value={profile.personalInformation.email.toLowerCase()}
                        placeholder="Hello@example.com"
                        onChange={({ nativeEvent }) =>
                            updatePersonalInformation({
                                email: nativeEvent.text,
                            })
                        }
                        onChangeText={validateEmail}
                        keyboardType="email-address"
                        maxLength={50}
                        style={styles.textInput}
                        clearButtonMode="always"
                    />
                </View>
                <View style={styles.textInputWrapper}>
                    <Text style={styles.textInputLabel}>Phone number</Text>
                    <TextInput
                        value={profile.personalInformation.phoneNumber}
                        placeholder="(403)123-123"
                        onChange={({ nativeEvent }) =>
                            updatePersonalInformation({
                                phoneNumber: nativeEvent.text,
                            })
                        }
                        onChangeText={isValidPhoneNumber}
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
                        value={profile.emailNotification.orderStatuses}
                        onValueChange={() =>
                            updateEmailNotification({
                                orderStatuses:
                                    !profile.emailNotification.orderStatuses,
                            })
                        }
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Password changes</Text>
                    <Switch
                        color="#495E57"
                        value={profile.emailNotification.passwordChanges}
                        onValueChange={() =>
                            updateEmailNotification({
                                passwordChanges:
                                    !profile.emailNotification.passwordChanges,
                            })
                        }
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Special offers</Text>
                    <Switch
                        color="#495E57"
                        value={profile.emailNotification.specialOffers}
                        onValueChange={() =>
                            updateEmailNotification({
                                specialOffers:
                                    !profile.emailNotification.specialOffers,
                            })
                        }
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Newsletter</Text>
                    <Switch
                        color="#495E57"
                        value={profile.emailNotification.newsletter}
                        onValueChange={() =>
                            updateEmailNotification({
                                newsletter:
                                    !profile.emailNotification.newsletter,
                            })
                        }
                    />
                </View>
            </View>
            <Pressable style={styles.logoutButton} onPress={logout}>
                <Text style={styles.buttonText}>Log out</Text>
            </Pressable>

            <View style={styles.changeButtonsContainer}>
                <Pressable
                    style={[styles.button, styles.discardButton]}
                    onPress={discardChanges}
                >
                    <Text style={styles.buttonText}>Discard changes</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.saveButton]}
                    onPress={saveChanges}
                >
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
