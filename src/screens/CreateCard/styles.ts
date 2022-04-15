import styled from 'styled-components/native'
import { StyledRegularText } from '../../themes/global-styles'

export const StyledContainer = styled.KeyboardAvoidingView`
  flex: 1;
`

export const StyledLabel = styled(StyledRegularText)`
  color: ${({ theme }) => theme.colors.highlight50};
  margin-left: 8px;
`

export const StyledForm = styled.View`
  padding: 0 16px;
  margin-top: 32px;
`

export const StyledFormField = styled.View`
  margin-bottom: 32px;
`

export const StyledRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

export const StyledSmallText = styled(StyledRegularText)`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.highlight50};
`

export const StyledFooter = styled.View`
  margin: 20px 0 56px;
`
