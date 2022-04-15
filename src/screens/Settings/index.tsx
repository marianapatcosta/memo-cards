import React, { useMemo, useState } from 'react'
import { Alert } from 'react-native'
import { DropDown, Header } from '../../components'
import { getLocales, getThemes } from '../../utils/constants'
import { useTheme, Theme } from '../../hooks/useTheme'
import { useLocale } from '../../hooks/useLocale'
import { StyledRegularText } from '../../themes/global-styles'
import {
  StyledContainer,
  StyledContent,
  StyledColumn,
  StyledDropDownWrapper,
} from './styles'

enum DROPDOWN_TYPES {
  LOCALES = 'locales',
  THEMES = 'themes',
}

export const Settings = () => {
  const { currentTheme, defineTheme } = useTheme()
  const { currentLocale, defineLocale, t } = useLocale()
  const [selectedLocale, setSelectedLocale] = useState<string>(currentLocale)
  const [selectedTheme, setSelectedTheme] = useState<string>(currentTheme)
  const [openedDropDown, setOpenedDropdown] = useState<string>('')

  const locales = useMemo(() => getLocales(), [currentLocale])
  const themes = useMemo(() => getThemes(), [currentLocale])

  const forceUpdate: () => void = useState()[1].bind(null, {} as any)

  const handleLocaleSelection = async (locale: string) => {
    try {
      defineLocale(locale)
      setOpenedDropdown('')
      forceUpdate()
    } catch (error) {
      Alert.alert(t('global.anErrorOccurred'))
    }
  }

  const handleThemeSelection = async (theme: Theme) => {
    defineTheme(theme)
    setOpenedDropdown('')
  }

  return (
    <StyledContainer>
      <Header title={t('settings.title')} />
      <StyledContent
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1, height: '100%' }}
      >
        <StyledColumn>
          <StyledDropDownWrapper>
            <StyledRegularText>{t('settings.language')}</StyledRegularText>
            <DropDown
              open={openedDropDown === DROPDOWN_TYPES.LOCALES}
              value={selectedLocale}
              items={locales}
              zIndex={3000}
              zIndexInverse={1000}
              setOpen={() => setOpenedDropdown(DROPDOWN_TYPES.LOCALES)}
              setValue={setSelectedLocale}
              onChangeValue={(item: string) => handleLocaleSelection(item)}
              onClose={() => setOpenedDropdown('')}
            />
          </StyledDropDownWrapper>
          <StyledDropDownWrapper>
            <StyledRegularText>{t('settings.theme')}</StyledRegularText>
            <DropDown
              open={openedDropDown === DROPDOWN_TYPES.THEMES}
              value={selectedTheme}
              items={themes}
              zIndex={2000}
              zIndexInverse={2000}
              setOpen={() => setOpenedDropdown(DROPDOWN_TYPES.THEMES)}
              setValue={setSelectedTheme}
              onChangeValue={(item: Theme) => handleThemeSelection(item)}
              onClose={() => setOpenedDropdown('')}
            />
          </StyledDropDownWrapper>
        </StyledColumn>
      </StyledContent>
    </StyledContainer>
  )
}
