import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { StyledRegularText } from '../../themes/global-styles'

export const StyledContainer = styled(RectButton)<{ checked?: boolean }>`
  height: 44px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`

export const StyledContent = styled(LinearGradient)<{ checked?: boolean }>`
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;

  ${({ checked, theme }) =>
    checked
      ? `border: 1px solid ${theme.colors.highlight50}; opacity: 1;`
      : 'opacity: 0.4'}
`

export const StyledTitle = styled(StyledRegularText)``
