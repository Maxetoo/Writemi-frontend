import React from 'react'
import styled from 'styled-components'
import Navbar from '../home/Navbar'

const Notification = () => {
  return (
    <Wrapper>
      <div className='message-container'>
        <h3>Coming soon...</h3>
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
  color: var(--white-col);

  .message-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: start;
  }

  h3 {
    font-size: 1.5em;
  }
`
export default Notification
