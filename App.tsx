import React, { useState, useEffect, createContext, useCallback } from 'react'

import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigators/StackNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connectToDatabase, createTables } from './database/db';

export const SignedInContext = createContext({});

const db = connectToDatabase()

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async () => {
        try {
            const signedIn = await AsyncStorage.getItem('isSignedIn')
            // const initialUserStatus = values.reduce((acc, curr) => {
              // Every item in the values array is itself an array with a string key and a stringified value, i.e ['pushNotifications', 'false']
              // acc[curr[0]] = JSON.parse(curr[1]) || false
              // return acc
          // },
          // {})
          setIsSignedIn(signedIn)
        } catch (error) {
            console.log({ error })
        } finally{
          setIsLoading(false)
        }
    };
},[])

const loadData = useCallback(async () => {
  try {
    const db = await connectToDatabase()
    await createTables(db)
  } catch (error) {
    console.error(error)
  }
}, [])

useEffect(() => {
  loadData()
}, [loadData])

  return (
    <SignedInContext.Provider value={{isSignedIn, setIsSignedIn, isLoading, db}}>
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </SignedInContext.Provider>
  );
}