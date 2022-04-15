import React from 'react'
import {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated'
import { useCards } from '../../hooks/cards'
import { CardItemData } from '../CardItem'
import { StyledContainer, StyledCardFront, StyledCardBack } from './styles'

type FlipCardProps = {
  card: CardItemData
}

export const FlipCard = ({ card }: FlipCardProps) => {
  const { updateLastSeen } = useCards()

  // useSharedValue is a state used to share values with our animation;
  // when it changes, the animation is executed
  const flipPositionAnimate = useSharedValue(1)

  // useAnimatedStyle is used to respond to animations (animations run in a different thread)
  const cardFrontAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        rotateY: `${interpolate(
          flipPositionAnimate.value,
          [0, 1],
          [0, 180]
        )}deg`,
      },
    ],
  }))

  const cardBackAnimation = useAnimatedStyle(() => ({
    transform: [
      // interpolate smooths the transition
      {
        rotateY: `${interpolate(
          flipPositionAnimate.value,
          [0, 1], // possible values of our animated state
          [180, 360] // values that style should have when each state value is achieved
        )}deg`,
      },
    ],
  }))

  const handleFlipCard = () => {
    const newValue = flipPositionAnimate.value === 0 ? 1 : 0
    flipPositionAnimate.value = withTiming(newValue, { duration: 300 })
    updateLastSeen(card.id)
  }

  return (
    <StyledContainer onPress={handleFlipCard}>
      <StyledCardBack
        text={card.back}
        category={card.category}
        style={cardBackAnimation}
      />
      <StyledCardFront text={card.front} style={cardFrontAnimation} />
    </StyledContainer>
  )
}
