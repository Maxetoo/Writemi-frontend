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
  height: 100vh;
  width: 100vw;
  background: #292929;
  color: white;
`
export default Home
