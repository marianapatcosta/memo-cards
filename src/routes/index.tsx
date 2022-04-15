import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { CardsView, CreateCard, Home,Settings } from '../screens'

import { useTheme } from 'styled-components'
export const Routes = () => {
  const theme = useTheme()
  const { Navigator, Screen } = createStackNavigator()

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          cardStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerShown: false,
        }}
      >
        <Screen name='Home' component={Home} />
        <Screen name='CardsView' component={CardsView} />
        <Screen name='CreateCard' component={CreateCard} />
        <Screen name='Settings' component={Settings} />
      </Navigator>
    </NavigationContainer>
  )
}
