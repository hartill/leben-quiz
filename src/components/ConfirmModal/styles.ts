import styled from '@emotion/styled'
import { theme } from '../../theme'

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const ModalContainer = styled.div`
  flex-grow: 0;
  flex-shrink: 1;
  z-index: 9999;
  padding: 1.5rem 2rem;
  max-width: 100%;
  color: ${theme.colors.darkFont};
  background: ${theme.colors.white};
  box-shadow: 0px 0px 3px ${theme.colors.black};
`

const ModalTitle = styled.div`
  font-size: 1.1rem;
  margin-bottom: 1rem;
`

const ConfirmationButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
`

const ConfirmationButton = styled.div`
  background-color: ${theme.colors.blue};
  border: none;
  padding: 0.5rem;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${theme.colors.white};
  cursor: pointer;
`

export { Backdrop, ModalContainer, ConfirmationButtonContainer, ConfirmationButton, ModalTitle }
