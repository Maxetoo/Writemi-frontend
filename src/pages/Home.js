import React from 'react'
import styled from 'styled-components'
import { Header, Dashboard } from '../components/home'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <Wrapper>
      <Header />
      <Dashboard />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  min-height: 100vh;
  width: 100vw;
  background: var(--home-page-bg);
  color: var(--white-col);
  position: relative;
`
export default Home
