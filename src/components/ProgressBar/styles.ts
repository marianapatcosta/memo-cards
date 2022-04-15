import styled from 'styled-components/native'
import Animated from 'react-native-reanimated'

export const StyledContainer = styled(Animated.View)`
  width: 100%;
  align-items: center;
`

export const StyledContent = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const StyledProgress = styled.View`
  flex: 1;
  height: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.secondary};
  overflow: hidden;
  margin: 0 8px;
`

export const StyledProgressFulfilled = styled(Animated.View)`
  height: 8px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.highlight50};
`
