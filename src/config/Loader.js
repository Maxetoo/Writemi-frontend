import React from 'react'
import styled from 'styled-components'

const Loader = () => {
  return (
    <Wrapper>
      <span className='loader'></span>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  width: 80%;
  height: 300px;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default Loader
