import React from 'react'
import {
  TouchableWithoutFeedbackProps,
  TouchableWithoutFeedbackPropsAndroid,
  TouchableWithoutFeedbackPropsIOS,
} from 'react-native'
import {} from 'react-native-gesture-handler'

import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from 'react-native-reanimated'
import {
  StyledContainer,
  StyledHeight,
  StyledButton,
  StyledLabel,
} from './styles'

type ButtonProps = /*  TouchableWithoutFeedbackProps &
  (TouchableWithoutFeedbackPropsIOS | TouchableWithoutFeedbackPropsAndroid) */ (
  | TouchableWithoutFeedbackPropsIOS
  | TouchableWithoutFeedbackPropsAndroid
) & {
  label: string
}

export const Button = ({
  label,
  disabled,
  onPress,
  ...otherProps
}: ButtonProps) => {
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
    if (disabled) {
      return
    }
    const newValue = pressed.value === 0 ? 1 : 0
    pressed.value = withTiming(newValue, { duration: 300 })
    onPress()
  }

  return (
    <StyledContainer
      onPressIn={handlePress}
      onPressOut={() => {
        pressed.value = 0
      }}
      {...otherProps}
    >
      {!disabled ? <StyledHeight></StyledHeight> : null}
      <StyledButton style={[innerAnimation, { opacity: disabled ? 0.5 : 1 }]}>
        <StyledLabel>{label}</StyledLabel>
      </StyledButton>
    </StyledContainer>
  )
}
