import styled from 'styled-components/native'
import { StyledTitleText } from '../../themes/global-styles'

export const StyledContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const StyledMessage = styled(StyledTitleText)`
  color: ${({ theme }) => theme.colors.font};
  text-align: center;
  margin-top: 32px;
  line-height: 42px;
`
