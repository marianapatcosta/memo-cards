import styled from 'styled-components/native'
import { StyledRegularText } from '../../themes/global-styles'

export const StyledContainer = styled.View`
  flex: 1;
`

export const StyledContent = styled.ScrollView`
  padding: 24px 16px 0;
`

export const StyledColumn = styled.View`
  margin: 12px 0;
`

export const StyledDropDownWrapper = styled.View`
  margin-bottom: 32px;
`

export const StyledSubtitle = styled(StyledRegularText)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.font};
  margin-right: 6px;
  margin-bottom: 16px;
`
