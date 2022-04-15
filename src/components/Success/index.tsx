import React, { useEffect } from 'react'
import Svg, { Circle } from 'react-native-svg'
import Animated, {
  useSharedValue,
  interpolate,
  withTiming,
  withDelay,
  useAnimatedProps,
} from 'react-native-reanimated'
import Tick from '../../assets/svg/tick.svg'
import { useLocale } from '../../hooks/useLocale'
import { StyledContainer, StyledMessage } from './styles'

export const Success = () => {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle)
  const RADIUS = 100
  const CIRCLE_LENGTH = 2 * Math.PI * RADIUS // 2PI*R
  const OFFSET = 10
  const STROKE_ANIMATION_DURATION = 2000
  const FILL_ANIMATION_DURATION = 300
  const TICK_ANIMATION_DURATION = 300

  const stroke = useSharedValue(0)
  const fill = useSharedValue(0)
  const tick = useSharedValue(0)

  const { t } = useLocale()

  const strokeAnimation = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - stroke.value),
  }))

  const fillAnimation = useAnimatedProps(() => ({
    opacity: interpolate(fill.value, [0, 1], [0, 1]),
  }))

  const tickAnimation = useAnimatedProps(() => ({
    opacity: interpolate(tick.value, [0, 1], [0, 1]),
  }))

  useEffect(() => {
    stroke.value = withTiming(1, {
      duration: STROKE_ANIMATION_DURATION,
    })
    fill.value = withDelay(
      STROKE_ANIMATION_DURATION,
      withTiming(1, { duration: FILL_ANIMATION_DURATION })
    )
    tick.value = withDelay(
      STROKE_ANIMATION_DURATION + FILL_ANIMATION_DURATION,
      withTiming(1, { duration: TICK_ANIMATION_DURATION })
    )
  }, [])

  return (
    <StyledContainer>
      <StyledContainer>
        <Svg
          style={{
            width: (RADIUS + OFFSET) * 2,
            height: (RADIUS + OFFSET) * 2,
          }}
        >
          <AnimatedCircle
            cx={RADIUS + OFFSET}
            cy={RADIUS + OFFSET}
            r={RADIUS}
            stroke='green'
            strokeWidth={OFFSET}
            strokeDasharray={CIRCLE_LENGTH}
            animatedProps={strokeAnimation}
            strokeLinecap='round'
          />
          <AnimatedCircle
            cx={RADIUS + OFFSET}
            cy={RADIUS + OFFSET}
            r={RADIUS}
            fill='green'
            animatedProps={fillAnimation}
          />
        </Svg>
        <Animated.View
          style={[{ position: 'absolute', bottom: 0, left: 10 }, tickAnimation]}
        >
          <Tick width={RADIUS * 2} height={RADIUS * 2} />
        </Animated.View>
      </StyledContainer>

      <StyledMessage>{t('cardsView.success')}</StyledMessage>
    </StyledContainer>
  )
}
