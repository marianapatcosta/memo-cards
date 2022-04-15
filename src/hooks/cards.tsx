import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Alert } from 'react-native'
import * as Notifications from 'expo-notifications'
import { CardItemData } from '../components/CardItem'
import { COLLECTION_CARDS } from '../configs/database'
import { getCategories, getRandomInt } from '../utils/utils'
import { useAsyncStorage } from './useAsyncStorage'
import { useLocale } from './useLocale'

type CardContextData = {
  allCards: CardItemData[]
  cards: CardItemData[]
  categories: string[]
  isLoading: boolean
  loadCards: () => Promise<void>
  updateCards: (
    selectedCategory: string,
    keyword: string,
    favoriteFilterOn: boolean
  ) => void
  deleteCard: (cardToDeleteId: string) => Promise<void>
  toggleIsFavorite: (cardId: string) => Promise<void>
  updateLastSeen: (cardId: string) => Promise<void>
  saveCard: (newCard: CardItemData, cardToEditId?: string) => void
}

type CardsProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as CardContextData)

const CardsContextProvider = ({ children }: CardsProviderProps) => {
  const [allCards, setAllCards] = useState<CardItemData[]>([])
  const [cards, setCards] = useState<CardItemData[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { getStoredItem, saveItemInStorage } = useAsyncStorage()

  const { t } = useLocale()

  const sendLocalNotification = async (cards: CardItemData[]) => {
    try {
      // cancel to make sendNotification run every time the app is opened and generate new cardIndex
      // for next message. This is a workaround because we cannot generate dynamic content for a schedule
      // notification before send it
      await Notifications.cancelAllScheduledNotificationsAsync()
      const cardIndex = getRandomInt(0, cards.length - 1)
      await Notifications.scheduleNotificationAsync({
        content: {
          title: t('notifications.title'),
          body: t('notifications.remember', {
            card: String(Math.random().toFixed(3)),
          }),
          data: { cardIndex },
          priority: 'high',
          sound: 'default',
        },
        trigger: {
          hour: 20,
          minute: 45,
          repeats: true,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const loadCards = async () => {
    try {
      !cards.length && setIsLoading(true)
      const storedCards: CardItemData[] =
        (await getStoredItem(COLLECTION_CARDS)) || []
      if (!storedCards.length) {
        return
      }
      const categories = getCategories(storedCards)
      setAllCards(storedCards)
      sendLocalNotification(storedCards)
      setCards(storedCards)
      setCategories(categories)
    } catch (error) {
      Alert.alert(t('global.anErrorOccurred'), t('home.error'))
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCard = async (cardToDeleteId: string) => {
    try {
      const updatedAllCards = allCards.filter(
        (card: CardItemData) => card.id !== cardToDeleteId
      )
      await saveItemInStorage(COLLECTION_CARDS, updatedAllCards)
      await loadCards()
    } catch (error) {
      throw new Error()
    }
  }

  const toggleIsFavorite = async (cardId: string) => {
    try {
      const updatedAllCards: CardItemData[] = allCards.map(
        (card: CardItemData) =>
          card.id === cardId ? { ...card, isFavorite: !card.isFavorite } : card
      )
      await saveItemInStorage(COLLECTION_CARDS, updatedAllCards)
      await loadCards()
    } catch (error) {
      throw new Error()
    }
  }

  const updateLastSeen = async (cardId: string) => {
    try {
      const updatedAllCards: CardItemData[] = allCards.map(
        (card: CardItemData) =>
          card.id === cardId ? { ...card, lastSeen: new Date() } : card
      )
      await saveItemInStorage(COLLECTION_CARDS, updatedAllCards)
      await loadCards()
    } catch (error) {
      throw new Error()
    }
  }

  const checkCategoryFilter = (
    category: string,
    selectedCategory: string
  ): boolean =>
    selectedCategory ? category.toLowerCase() === selectedCategory : true

  const checkIsFavoriteFilter = (
    isFavorite: boolean,
    favoriteFilterOn: boolean
  ): boolean => (favoriteFilterOn ? isFavorite : true)

  const checkKeywordFilter = (cardFront: string, keyword: string): boolean =>
    cardFront.toLowerCase().includes(keyword.toLowerCase())

  const updateCards = (
    selectedCategory: string,
    keyword: string,
    favoriteFilterOn: boolean
  ) => {
    const updatedCards = allCards.filter(
      (card: CardItemData) =>
        checkCategoryFilter(card.category, selectedCategory) &&
        checkKeywordFilter(card.front, keyword) &&
        checkIsFavoriteFilter(card.isFavorite, favoriteFilterOn)
    )
    setCards(updatedCards)
  }

  const saveCard = async (newCard: CardItemData, cardToEditId?: string) => {
    try {
      if (!!cardToEditId) {
        const updatedAllCards = allCards.map((card: CardItemData) =>
          card.id === cardToEditId ? newCard : card
        )

        await saveItemInStorage(COLLECTION_CARDS, updatedAllCards)
        return loadCards()
      }
      await saveItemInStorage(COLLECTION_CARDS, [...allCards, newCard])
      await loadCards()
    } catch (error) {
      throw new Error()
    }
  }

  useEffect(() => {
    loadCards()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        allCards,
        cards,
        categories,
        isLoading,
        loadCards,
        updateCards,
        deleteCard,
        toggleIsFavorite,
        updateLastSeen,
        saveCard,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useCards = () => {
  const authContext = useContext(AuthContext)
  return authContext
}

export { CardsContextProvider, useCards }
