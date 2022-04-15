import React, { useEffect, useMemo, useState } from 'react'
import { Dimensions, Platform, ScrollView } from 'react-native'
import uuid from 'react-native-uuid'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { useCards } from '../../hooks/cards'
import { useLocale } from '../../hooks/useLocale'
import {
  Button,
  DropDown,
  Header,
  Input,
  TextArea,
  ModalView,
  Modal,
} from '../../components'
import { CardItemData } from '../../components/CardItem'
import {
  StyledContainer,
  StyledLabel,
  StyledForm,
  StyledFormField,
  StyledRow,
  StyledSmallText,
  StyledFooter,
} from './styles'

type Params = {
  cardToEdit: CardItemData | undefined
}

export const CreateCard = () => {
  const [category, setCategory] = useState<string>('')
  const [newCategory, setNewCategory] = useState<string>('')
  const [cardFront, setCardFront] = useState<string>('')
  const [cardBack, setCardBack] = useState<string>('')
  const [editMode, setEditMode] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] =
    useState<boolean>(false)

  const { categories, loadCards, saveCard } = useCards()

  const categoriesDropdown = categories.map((category: string) => ({
    value: category,
    label: category,
  }))

  const { t } = useLocale()
  const theme = useTheme()
  const { font, highlight50 } = theme.colors

  const isFormValid = useMemo(
    () =>
      (!!category || !!newCategory) &&
      !!cardBack &&
      cardBack.length < 100 &&
      !!cardFront,
    [category, cardFront, cardBack]
  )

  const navigation = useNavigation()
  const route = useRoute()

  const params = route.params as Params
  const cardToEdit = params?.cardToEdit as CardItemData

  const handleSaveCard = async (): Promise<void> => {
    const newCard: CardItemData = {
      id: editMode ? cardToEdit.id : (uuid.v4() as string),
      category:
        newCategory.trim().toLowerCase() || category.trim().toLowerCase(),
      front: cardFront.trim(),
      back: cardBack.trim(),
      isFavorite: editMode ? cardToEdit.isFavorite : false,
      lastSeen: new Date(),
    }
    try {
      if (!isFormValid) return
      saveCard(newCard, cardToEdit?.id)

      navigation.navigate('Home')
    } catch (error) {
      setError(
        editMode ? t('cardCreate.updateError') : t('cardCreate.createError')
      )
    }
  }

  useEffect(() => {
    if (!!cardToEdit) {
      setEditMode(true)
      const { category, front, back } = cardToEdit
      setCategory(category)
      setCardFront(front)
      setCardBack(back)
    }

    loadCards()
  }, [cardToEdit])

  return (
    // KeyboardAvoidingView wraps the screen and scrolls it when the keyboard is active/visible
    <>
      <StyledContainer behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Header
          title={
            editMode ? t('cardCreate.titleUpdate') : t('cardCreate.titleCreate')
          }
        />
        <ScrollView>
          <StyledForm>
            <StyledFormField>
              <StyledLabel>{t('cardCreate.category')}</StyledLabel>
              {!!categories.length && (
                <>
                  <DropDown
                    open={isCategoryDropdownOpen}
                    value={category}
                    items={categoriesDropdown}
                    zIndex={3000}
                    zIndexInverse={1000}
                    placeholder={t('cardCreate.selectCategory')}
                    setOpen={() => setIsCategoryDropdownOpen(true)}
                    setValue={setCategory}
                    onChangeValue={setCategory}
                    onClose={() => setIsCategoryDropdownOpen(false)}
                  />
                  <StyledSmallText style={{ textAlign: 'center' }}>
                    {t('cardCreate.or')}
                  </StyledSmallText>
                </>
              )}
              <Input
                value={newCategory}
                onChangeText={setNewCategory}
                placeholder={t('cardCreate.typeNew')}
                placeholderTextColor={font}
                selectionColor={highlight50}
              />
            </StyledFormField>
            <StyledFormField>
              <StyledRow style={{ marginBottom: 0 }}>
                <StyledLabel>{t('cardCreate.cardBack')}</StyledLabel>
                <StyledSmallText>
                  {t('cardCreate.max', { characters: 100 })}
                </StyledSmallText>
              </StyledRow>
              <TextArea
                style={{ textAlignVertical: 'top' }}
                maxLength={100}
                numberOfLines={5}
                autoCorrect={false}
                value={cardBack}
                selectionColor={highlight50}
                onChangeText={setCardBack}
              />
            </StyledFormField>
            <StyledFormField>
              <StyledLabel>{t('cardCreate.cardFront')}</StyledLabel>

              <TextArea
                style={{ textAlignVertical: 'top' }}
                numberOfLines={10}
                autoCorrect={false}
                value={cardFront}
                selectionColor={highlight50}
                onChangeText={setCardFront}
              />
            </StyledFormField>
            <StyledFooter>
              <Button
                disabled={!isFormValid}
                label={
                  editMode ? t('cardCreate.update') : t('cardCreate.create')
                }
                onPress={handleSaveCard}
              />
            </StyledFooter>
          </StyledForm>
        </ScrollView>
      </StyledContainer>
      <ModalView
        visible={!!error}
        containerStyle={{ marginTop: Dimensions.get('window').height - 250 }}
        closeModal={() => setError('')}
      >
        <Modal
          title={t('global.anErrorOccurred')}
          message={error}
          onCancel={() => setError('')}
        />
      </ModalView>
    </>
  )
}
