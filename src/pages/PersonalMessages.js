import React from 'react'
import styled from 'styled-components'
import { Header, Body, SearchHeader } from '../components/personalMessage'
// MdOutlineClear
const PersonalMessages = () => {
  return (
    <Wrapper>
      <Header />
      {/* <SearchHeader /> */}
      <Body />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  min-height: 100vh;
  width: 100vw;
  background: var(--home-page-bg);
  color: var(--white-col);
  padding-bottom: 1rem;
`
export default PersonalMessages
