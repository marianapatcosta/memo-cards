import React from 'react'
import { ViewProps } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useLocale } from '../../hooks/useLocale'
import { StyledContainer, StyledTitle, StyledCategory } from './styles'

type CardProps = ViewProps & {
  text: string
  category?: string
}

export const Card = ({ text, category, style }: CardProps) => {
  const { t } = useLocale()

  return (
    <StyledContainer style={style}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
          width: '100%',
        }}
      >
        <StyledTitle>{text}</StyledTitle>
        {!!category ? (
          <StyledCategory>{t('home.category', { category })}</StyledCategory>
        ) : null}
      </ScrollView>
    </StyledContainer>
  )
}
