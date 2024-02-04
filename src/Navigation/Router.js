import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Cart from '../Screens/Cart/Index';
import Home from '../Screens/Home/Index';
import Splash from '../Screens/Splash/Index';


const Router = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="/" component={Splash} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cart" component={Cart} />
      </Stack.Navigator>
      </NavigationContainer>
  )
}

export default Router

const styles = StyleSheet.create({})