import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Notifications from 'expo-notifications'
import { useTheme } from 'styled-components'
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import Logo from '../../assets/images/memo-cards.png'
import {
  ButtonIcon,
  CardItem,
  CategorySelect,
  Input,
  ListDivider,
  ListHeader,
  Loading,
  Modal,
  ModalView,
  NoData,
} from '../../components'
import { useCards } from '../../hooks/cards'
import { useLocale } from '../../hooks/useLocale'
import { CardItemData } from '../../components/CardItem'
import { StyledRegularText } from '../../themes/global-styles'
import {
  StyledContainer,
  StyledContent,
  StyledHeader,
  StyledImage,
  StyledRow,
  StyledCardList,
  StyledButtonIcon,
} from './styles'

export const Home = () => {
  const { t } = useLocale()
  const theme = useTheme()
  const {
    isLoading,
    allCards,
    cards,
    categories,
    loadCards,
    updateCards,
    deleteCard,
    toggleIsFavorite,
  } = useCards()

  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')
  const [favoriteFilterOn, setFavoriteFilterOn] = useState<boolean>(false)
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [cardToDelete, setCardToDelete] = useState<CardItemData>(
    {} as CardItemData
  )
  const navigation = useNavigation()

  const { highlight50, highlight90, font, white } = theme.colors

  const handleGoToCardsView = (index: number) =>
    navigation.navigate('CardsView', { firstCardIndex: index })

  const handleCreateCard = () =>
    navigation.navigate('CreateCard', { cardToEdit: null })

  const handleGoToSettings = () => navigation.navigate('Settings')

  const handleCategorySelect = (category: string) => {
    category === selectedCategory
      ? setSelectedCategory('')
      : setSelectedCategory(category)
  }
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await loadCards()
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }, [])

  const handleDeleteCard = (card: CardItemData) => {
    setCardToDelete(card)
    setOpenDeleteModal(true)
  }

  const handleEditCard = (card: CardItemData) =>
    navigation.navigate('CreateCard', { cardToEdit: card })

  const handleDeleteConfirm = async () => {
    try {
      deleteCard(cardToDelete.id)
    } catch (error) {
      setError(t('home.deleteError'))
    } finally {
      setCardToDelete({} as CardItemData)
      setOpenDeleteModal(false)
    }
  }

  const handleToggleIsFavorite = async (id: string) => {
    try {
      toggleIsFavorite(id)
    } catch (error) {
      setError(t('createCard.updateError'))
    }
  }

  const handleToggleFavoriteFilterOn = () =>
    setFavoriteFilterOn((prevState: boolean) => !prevState)

  useEffect(() => {
    loadCards()
  }, [])

  useEffect(() => {
    updateCards(selectedCategory, keyword, favoriteFilterOn)
  }, [allCards, selectedCategory, keyword, favoriteFilterOn])

  const lastNotificationResponse = Notifications.useLastNotificationResponse()

  useEffect(() => {
    if (lastNotificationResponse) {
      handleGoToCardsView(
        lastNotificationResponse.notification.request.content.data
          .cardIndex as number
      )
    }
  }, [lastNotificationResponse])

  const renderContent = () => {
    if (isLoading) {
      return <Loading />
    }

    if (!cards.length) {
      return <NoData message={t('home.noCards')} />
    }

    return (
      <>
        <ListHeader
          title={t('global.title')}
          subtitle={t('home.listSubtitle', {
            nrOfCards: cards.length,
          })}
        />
        <StyledCardList
          data={cards}
          keyExtractor={(card) => (card as CardItemData).id}
          renderItem={({ item, index }) => (
            <CardItem
              card={item as CardItemData}
              onPress={() => handleGoToCardsView(index)}
              handleDelete={() => handleDeleteCard(item as CardItemData)}
              handleEdit={() => handleEditCard(item as CardItemData)}
              handleToggleIsFavorite={(id: string) =>
                handleToggleIsFavorite(id)
              }
            />
          )}
          ItemSeparatorComponent={() => <ListDivider />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 69 }}
          ListHeaderComponent={() => <ListDivider isCentered />}
          ListFooterComponent={() => <ListDivider isCentered />}
          refreshControl={
            <RefreshControl
              progressBackgroundColor={highlight50}
              colors={[white]}
              refreshing={isRefreshing}
              onRefresh={() => handleRefresh()}
            />
          }
        />
      </>
    )
  }
  return (
    <>
      <StyledContainer accessible={true}>
        <StyledHeader colors={[highlight90, highlight50]}>
          <StyledImage source={Logo} />
          <StyledRow>
            <ButtonIcon style={{ marginRight: 2 }} onPress={handleGoToSettings}>
              <Feather
                name='settings'
                color={theme.colors.highlight50}
                size={24}
              />
            </ButtonIcon>
            <ButtonIcon style={{ marginLeft: 2 }} onPress={handleCreateCard}>
              <MaterialCommunityIcons
                name='plus'
                color={theme.colors.highlight50}
                size={24}
              />
            </ButtonIcon>
          </StyledRow>
        </StyledHeader>

        <StyledContent>
          {isLoading && <Loading />}
          <CategorySelect
            categories={categories}
            categorySelected={selectedCategory}
            handleCategorySelect={handleCategorySelect}
          />
          <StyledRow>
            <Input
              style={{ flex: 1 }}
              value={keyword}
              onChangeText={setKeyword}
              placeholder={t('home.search')}
              placeholderTextColor={font}
              selectionColor={highlight50}
            />
            <StyledButtonIcon
              onPress={handleToggleFavoriteFilterOn}
              favoriteFilterOn={favoriteFilterOn}
            >
              <StyledRegularText style={{ paddingRight: 4 }}>
                {t('home.only')}
              </StyledRegularText>
              <AntDesign
                name={favoriteFilterOn ? 'heart' : 'hearto'}
                size={20}
                color={highlight50}
              />
            </StyledButtonIcon>
          </StyledRow>
          {renderContent()}
        </StyledContent>
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
      <ModalView
        visible={openDeleteModal}
        closeModal={() => setOpenDeleteModal(false)}
        hasTopBar={true}
        marginTop={Dimensions.get('window').height - 220}
      >
        <Modal
          title={t('home.deleteCardHeader')}
          message={t('home.deleteCard', { title: cardToDelete.back })}
          onCancel={() => setOpenDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      </ModalView>
    </>
  )
}
