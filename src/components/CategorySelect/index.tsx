import React, { useMemo } from 'react'

import { useTheme } from 'styled-components'
import { Category, CategoryProps } from '../Category'

import { StyledContainer } from './styles'

type CategorySelectProps = {
  categories: string[]
  categorySelected: string
  handleCategorySelect: (category: string) => void
}

export const CategorySelect = ({
  categories,
  categorySelected,
  handleCategorySelect,
  ...otherProps
}: CategorySelectProps) => {
  return (
    <StyledContainer
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingRight: 40,
      }}
      {...otherProps}
    >
      {categories.map((category) => (
        <Category
          key={`category-${category}`}
          title={category}
          checked={category === categorySelected}
          onPress={() => handleCategorySelect(category)}
        />
      ))}
    </StyledContainer>
  )
}
