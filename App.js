import { View, Text, LogBox } from 'react-native'
import React from 'react'
import NAvigation from './src/Navigation/Router'
import { Provider } from 'react-redux';
import { store } from './src/Redux/Store';
import {ToastProvider} from 'react-native-toast-notifications';

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <>
       <ToastProvider
        placement="top"
        animationType="slide-in"
        duration={3000}>
     <Provider store={store}>
    <NAvigation/>
  </Provider>
  </ToastProvider>
    </>
  )
}

export default App