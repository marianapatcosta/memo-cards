import styled from 'styled-components/native'
import { Button } from '../../components'
import { StyledRegularText } from '../../themes/global-styles'

export const StyledContainer = styled.View`
  flex: 1;
`

export const StyledContent = styled.View`
  padding: 24px 16px 0;
  flex: 1;
  align-items: center;
`

export const StyledCards = styled.View`
  width: 95%;
  flex: 1;
  margin-bottom: 24px;
`

export const StyledTip = styled(StyledRegularText)`
  line-height: 24px;
  margin-bottom: 32px;
  font-size: 16px;
`

export const StyledBackButton = styled(Button)`
  margin-top: 100px;
  width: 150px;
  align-self: center;
`
