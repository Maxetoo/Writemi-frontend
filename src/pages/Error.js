import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <Wrapper>
      <h1>404 Error</h1>
      <p>Page not found!</p>
      <Link to='/login'>
        <button type='button'>Go Back</button>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(
    174.2deg,
    rgba(255, 244, 228, 1) 7.1%,
    rgba(240, 246, 238, 1) 67.4%
  );

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 4em;
  }

  p {
    font-size: 1.4em;
  }

  a > button {
    margin-top: 1.5rem;
    width: 200px;
    height: 50px;
    cursor: pointer;
    background: #ff8906;
    color: var(--white-col);
    border-radius: 5px;
    font-size: 1em;
  }
`

export default Error
