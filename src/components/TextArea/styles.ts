import styled from 'styled-components/native'

export const StyledTextInput = styled.TextInput`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.font};
  padding: 4px 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  align-items: flex-start;
  justify-content: flex-start;
  display: flex;
`
