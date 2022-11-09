import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import {AppNavigation} from './src/navigations/AppNavigation'

const App = () => {

  useEffect(()=>{
        SplashScreen.hide();
  },[])

  return (
    <NavigationContainer>
      <AppNavigation/>
      </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})