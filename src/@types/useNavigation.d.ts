import { CardItemData } from '../components/CardItem'

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined
      CreateCard: { cardToEdit: CardItemData | null }
      Settings: undefined
      CardsView: { firstCardIndex: index }
    }
  }
}
