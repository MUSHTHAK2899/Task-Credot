import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeLogo from '../../assets/HomeLogo.svg';

const Splash = ({navigation}) => {
    setTimeout(()=>{
navigation.navigate('Home')
    },1000)
  return (
    <View style={{flex:1,borderBlockColor:'white',justifyContent:'center',alignItems:"center"}}>
    <HomeLogo/>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})