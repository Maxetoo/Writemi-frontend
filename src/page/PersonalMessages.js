import React from 'react'
import styled from 'styled-components'

import { Navbar, Homemain } from '../components/home'
import MyMessages from './../components/personalMessage/myMessages'

const PersonalMessages = () => {
  return (
    <Wrapper>
      <h3>Personal Messages</h3>
      <div className='message-container'>
        <MyMessages />
        <MyMessages />
        <MyMessages />
      </div>

      <Navbar />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  background: var(--secondary-home);
  text-align: center;

  .message-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    margin-top: 2rem;
    padding-bottom: 7rem;
  }
  /* color: white;
  display: flex;
  flex-direction: column;
  align-items: center; */
`

export default PersonalMessages
