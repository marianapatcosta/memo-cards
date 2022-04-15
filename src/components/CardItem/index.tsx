import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components/'
import { MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons'
import { useLocale } from '../../hooks/useLocale'
import { StyledRegularText } from '../../themes/global-styles'

import {
  StyledContainer,
  StyledContent,
  StyledTitle,
  StyledButton,
} from './styles'

export type CardItemData = {
  id: string
  category: string
  front: string
  back: string
  isFavorite: boolean
  lastSeen: Date
}

export type CardItemProps = RectButtonProps & {
  card: CardItemData
  handleEdit: () => void
  handleDelete: () => void
  handleToggleIsFavorite: (id: string) => void
}

export const CardItem = ({
  card,
  handleDelete,
  handleEdit,
  handleToggleIsFavorite,
  ...otherProps
}: CardItemProps) => {
  const { t } = useLocale()
  const theme = useTheme()
  const editedDate = `${new Date(card.lastSeen)
    .toISOString()
    .slice(0, 10)
    .split('-')
    .reverse()
    .join('/')}`

  const { font, highlight50 } = theme.colors

  return (
    <StyledContainer {...otherProps}>
      <StyledContent style={{ flexBasis: '80%' }}>
        <StyledTitle numberOfLines={1}>{card.back}</StyledTitle>
        <StyledRegularText style={{ marginBottom: 0 }}>
          {t('home.category', { category: card.category })}
        </StyledRegularText>
        <StyledRegularText>
          {t('home.lastSeen', { date: editedDate })}
        </StyledRegularText>
      </StyledContent>
      <StyledContent style={{ flexBasis: '20%', paddingLeft: 8 }}>
        <StyledButton onPress={() => handleToggleIsFavorite(card.id)}>
          <AntDesign
            name={card.isFavorite ? 'heart' : 'hearto'}
            size={20}
            color={highlight50}
          />
        </StyledButton>
        <StyledButton onPress={handleEdit}>
          <Entypo name='edit' size={20} color={font} />
        </StyledButton>
        <StyledButton onPress={handleDelete}>
          <MaterialIcons name='delete' size={20} color={font} />
        </StyledButton>
      </StyledContent>
    </StyledContainer>
  )
}
