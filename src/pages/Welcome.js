import React from 'react'
import Welcome from '../components/welcome/Main'
import styled from 'styled-components'

const WelcomePage = () => {
  return (
    <Wrapper>
      <main className='welcome-page'>
        <Welcome />
      </main>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .welcome-page {
    height: 100vh;
    width: 100vw;
    background: #121629;
    color: #777777;
    /* color: white; */
    /* background: var(--welcome-page-bg);
    color: var(--welcome-texts); */
  }
`
export default WelcomePage
