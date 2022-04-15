import React, { ReactNode } from 'react'
import {
  TouchableWithoutFeedbackPropsAndroid,
  TouchableWithoutFeedbackPropsIOS,
} from 'react-native'
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated'
import { StyledButtonIcon, StyledHeight, StyledInner } from './styles'

type ButtonIconProps = (
  | TouchableWithoutFeedbackPropsIOS
  | TouchableWithoutFeedbackPropsAndroid
) & {
  children: ReactNode
}

export const ButtonIcon = ({
  children,
  onPress,
  ...otherProps
}: ButtonIconProps) => {
  const pressed = useSharedValue(0)

  const innerAnimation = useAnimatedStyle(() => ({
    transform: [
      // interpolate smooths the transition
      {
        translateY: interpolate(
          pressed.value,
          [0, 1], // possible values of our animated state
          [0, 3] // values that style should have when each state value is achieved
        ),
      },
    ],
  }))
  const handlePress = () => {
    const newValue = pressed.value === 0 ? 1 : 0
    pressed.value = withTiming(newValue, { duration: 300 })
    onPress()
  }

  return (
    <StyledButtonIcon
      onPressIn={handlePress}
      onPressOut={() => {
        pressed.value = 0
      }}
      {...otherProps}
    >
      <StyledHeight></StyledHeight>
      <StyledInner style={innerAnimation}>{children}</StyledInner>
    </StyledButtonIcon>
  )
}
