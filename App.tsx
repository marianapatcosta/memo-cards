import React, { useEffect } from 'react'
import { StatusBar, Alert } from 'react-native'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import * as Notifications from 'expo-notifications'
import { AppProvider } from './src/contexts'
import { Routes } from './src/routes'
import { useLocale } from './src/hooks/useLocale'

// defines how device should handle a notification when the app is running (foreground notifications)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
})

export default function App() {
  const { getStoredLocale } = useLocale()
  const [areFontsLoaded] = useFonts({
    Uchen: require('./src/assets/fonts/Uchen-Regular.ttf'),
    Satisfy: require('./src/assets/fonts/Satisfy-Regular.ttf'),
  })
  
  const getNotificationsPermissions = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        return Alert.alert('Permission not granted!')
      }
    } catch (error) {}
  }

  useEffect(() => {
    getStoredLocale()
    getNotificationsPermissions()
  }, [])

  if (!areFontsLoaded) {
    return <AppLoading />
  }

  return (
    <AppProvider>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Routes />
    </AppProvider>
  )
}
