import React, { useEffect, useState } from 'react'
import { ViewProps } from 'react-native'
import { StyledRegularText } from '../../themes/global-styles'
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {
  StyledContainer,
  StyledContent,
  StyledProgress,
  StyledProgressFulfilled,
} from './styles'

type ProgressProps = ViewProps & {
  currentCard: number
  numberOfCards: number
}

export const ProgressBar = ({ currentCard, numberOfCards }: ProgressProps) => {
  const [width, setWidth] = useState(0)
  const animated = useSharedValue(-1000)

  const progressBarAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animated.value,
        },
      ],
    }
  })

  useEffect(() => {
    const updatedProgressBarWidth =
      -width + (width * currentCard) / numberOfCards
    animated.value = withTiming(updatedProgressBarWidth, { duration: 300 })
  }, [currentCard, width])

  return (
    <StyledContainer>
      <StyledContent>
        <StyledRegularText>0%</StyledRegularText>

        <StyledProgress>
          <StyledProgressFulfilled
            style={progressBarAnimation}
            onLayout={(event) => {
              // to determine the bar width
              const currentWidth = event.nativeEvent.layout.width
              setWidth(currentWidth)
            }}
          />
        </StyledProgress>

        <StyledRegularText>100%</StyledRegularText>
      </StyledContent>

      <StyledRegularText style={{ lineHeight: 24 }}>
        {currentCard} / {numberOfCards}
      </StyledRegularText>
    </StyledContainer>
  )
}
