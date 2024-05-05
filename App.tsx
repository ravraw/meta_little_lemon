import React, { useState, useEffect, createContext } from 'react'

import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigators/StackNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignedInContext = createContext({});

const defaultUserStatus = {
  isSignedIn: false,
  isOnboardingCompleted: false,
}


export default function App() {
  const [userStatus, setUserStatus]  = useState(defaultUserStatus);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async () => {
        try {
            const values = await AsyncStorage.multiGet(['isSignedIn', 'isOnboardingCompleted'])
            const initialUserStatus = values.reduce((acc, curr) => {
              // Every item in the values array is itself an array with a string key and a stringified value, i.e ['pushNotifications', 'false']
              acc[curr[0]] = JSON.parse(curr[1]) || false
              return acc
          },
          {})
          setUserStatus(prevStatus => ({...prevStatus, ...initialUserStatus}))
        } catch (error) {
            console.log({ error })
        } finally{
          setIsLoading(false)
        }
    };
},[])
  return (
    <SignedInContext.Provider value={{userStatus, setUserStatus, isLoading}}>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </SignedInContext.Provider>
  );
}