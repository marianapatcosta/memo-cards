import styled from 'styled-components/native'
import { StyledRegularText, StyledTitleText } from '../../themes/global-styles'

export const StyledContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24px;
`

export const StyledTitle = styled(StyledTitleText)`
  color: ${({ theme }) => theme.colors.highlight50};
  font-size: 28px;
`

export const StyledSubtitle = styled(StyledRegularText)`
  color: ${({ theme }) => theme.colors.highlight50};
`
