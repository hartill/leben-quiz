import styled from '@emotion/styled'
import forwardsArrow from './../../svg/forwards-arrow.svg'
import { theme } from '../../theme'

const HomePageDiv = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.primary};
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  overflow-y: auto;
`

const MenuItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 100%;
  background: url(${forwardsArrow}) 98% 50% no-repeat;
  background-size: 1rem 1rem;
  margin-bottom: 1.5rem;

  &.ubung {
    background-color: ${theme.colors.blue};
  }

  &.prufung {
    background-color: ${theme.colors.red};
  }

  &.alleFragen {
    background-color: ${theme.colors.green};
  }
`

const HomeContainer = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  padding: 0px 15px;
`

export { HomePageDiv, HomeContainer, MenuItem }
