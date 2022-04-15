import { CardItemData } from '../components/CardItem'

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export const getCategories = (cards: CardItemData[]) => [
  ...new Set(cards.map((card) => card.category.toLowerCase())),
]
