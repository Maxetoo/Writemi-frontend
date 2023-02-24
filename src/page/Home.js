import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Navbar, Homemain } from '../components/home'
const Home = () => {
  return (
    <Wrapper>
      <Homemain />
      <Navbar />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  background: var(--secondary-home);
  color: var(--white-col);
  min-height: 100vh;
  width: 100vw;
`

export default Home
