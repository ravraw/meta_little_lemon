import React, { useState, useEffect, createContext } from 'react'

import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigators/StackNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignedInContext = createContext({});


export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSignedIn, setSignedIn] = useState(false)
  const [userToken, setUserToken] = useState(false)

  useEffect(() => {
    (async () => {
        try {
            setIsLoading(true)
            const signedIn = await AsyncStorage.getItem('isSignedIn').then(value => value === "true")
            setSignedIn(signedIn)
        } catch (error) {
            console.log({ error })
        } finally{
          setIsLoading(false)
        }
    })();
},[])
  return (
    <SignedInContext.Provider value={{isSignedIn, setSignedIn: () => setSignedIn, isLoading}}>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </SignedInContext.Provider>
  );
}