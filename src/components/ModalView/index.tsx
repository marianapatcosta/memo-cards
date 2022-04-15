import React, { ReactNode } from 'react'
import { Modal, ModalProps, TouchableWithoutFeedback } from 'react-native'

import { StyledContainer, StyledOverlay, StyledBar } from './styles'

type ModalViewProps = ModalProps & {
  children: ReactNode
  containerStyle?: object
  hasTopBar?: boolean
  marginTop?: number
  closeModal: () => void
}

export const ModalView = ({
  children,
  closeModal,
  hasTopBar = false,
  marginTop = 100,
  containerStyle,
  ...otherProps
}: ModalViewProps) => {
  return (
    <Modal
      transparent
      animationType='slide'
      statusBarTranslucent
      {...otherProps}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <StyledOverlay>
          {hasTopBar && <StyledBar />}
          <StyledContainer style={{ ...containerStyle, marginTop }}>
            {children}
          </StyledContainer>
        </StyledOverlay>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
