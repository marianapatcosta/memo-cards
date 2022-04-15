import React, { useState } from 'react'
import { Animated, Dimensions, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import {
  FlipCard,
  Header,
  ProgressBar,
  Success,
} from '../../components'
import { useCards } from '../../hooks/cards'
import { useLocale } from '../../hooks/useLocale'
import {
  StyledContainer,
  StyledContent,
  StyledCards,
  StyledBackButton,
  StyledTip,
} from './styles'

type Params = {
  firstCardIndex: number
}

export const CardsView = () => {
  const { t } = useLocale()
  const route = useRoute()
  const navigation = useNavigation()

  const { firstCardIndex } = route.params as Params
  const { cards } = useCards()
  const [reorderedCards, setReorderedCards] = useState(
    [
      ...cards.slice(firstCardIndex),
      ...cards.slice(0, firstCardIndex),
    ].reverse()
  )
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  const SCREEN_WIDTH = Dimensions.get('window').width
  const translateX = new Animated.Value(0)

  const reset = Animated.timing(translateX, {
    toValue: 0,
    duration: 250,
    useNativeDriver: true,
  })

  const swipeRightAnimation = Animated.timing(translateX, {
    toValue: SCREEN_WIDTH,
    duration: 400,
    useNativeDriver: true,
  })

  const nextCardScale = translateX.interpolate({
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [0.8, 1],
  })

  const handlePan = () => {
    if (Number(translateX) < 0) {
      return
    }
    return Animated.event([{ nativeEvent: { translationX: translateX } }], {
      useNativeDriver: true,
    })
  }

  const handleSwipe = ({ nativeEvent }) => {
    const { state } = nativeEvent
    if (state === 5) {
      //handle swipe right
      if (nativeEvent.translationX < 0) {
        return
      }
      //handle swipe left
      if (nativeEvent.translationX > 100) {
        swipeRightAnimation.start(() => {
          setReorderedCards((prevCards) =>
            prevCards.slice(0, prevCards.length - 1)
          )
          currentCardIndex < cards.length - 1 &&
            setCurrentCardIndex((prevCardIndex) => prevCardIndex + 1)
        })
        return
      }
      //handle uncompleted swipe
      reset.start()
    }
  }

  const handleGoBack = () => navigation.goBack()

  return (
    <StyledContainer>
      <Header title={t('cardsView.title')} />
      <StyledContent>
        {!reorderedCards.length ? (
          <View style={{ marginTop: 50 }}>
            <Success />
            <StyledBackButton
              label={t('cardsView.back')}
              onPress={handleGoBack}
            />
          </View>
        ) : (
          <>
            <StyledCards>
              {reorderedCards.map((card, index) =>
                index === reorderedCards.length - 1 ? (
                  <PanGestureHandler
                    key={card.id}
                    onHandlerStateChange={handleSwipe}
                    onGestureEvent={handlePan}
                  >
                    <Animated.View
                      style={[
                        {
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                          transform: [{ translateX }],
                        },
                      ]}
                    >
                      <FlipCard card={card} />
                    </Animated.View>
                  </PanGestureHandler>
                ) : (
                  <Animated.View
                    key={card.id}
                    style={[
                      {
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        transform: [{ scale: nextCardScale }],
                      },
                    ]}
                  >
                    <FlipCard card={card} />
                  </Animated.View>
                )
              )}
            </StyledCards>
            <StyledTip >
              {t('cardsView.tip')}
            </StyledTip>
            <ProgressBar
              numberOfCards={cards.length}
              currentCard={currentCardIndex + 1}
            />
          </>
        )}
      </StyledContent>
    </StyledContainer>
  )
}
