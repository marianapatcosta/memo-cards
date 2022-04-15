import styled from 'styled-components/native'
import { StyledRegularText } from '../../themes/global-styles'

export const StyledContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 16px;
  border-radius: 8px;
  border-width: 1px;
  margin-top: 103px;
  border-color: ${({ theme }) => theme.colors.secondary};
  width: 100%;
  height: 40%;
  justify-content: center;
`

export const StyledMessage = styled(StyledRegularText)`
  color: ${({ theme }) => theme.colors.highlight50};
  text-align: center;
`
