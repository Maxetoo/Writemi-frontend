import React from 'react'
import styled from 'styled-components'

const Onboarding = ({ image, alt, title, message }) => {
  return (
    <Wrapper>
      <img src={image} alt={alt} />
      <h3>{title}</h3>
      <p>{message}</p>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  font-family: 'M PLUS Rounded 1c', sans-serif;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--white-col);
  margin-top: -1rem;

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border: solid 2px white;
  }

  h3 {
    font-size: 1.5em;
    margin: 1.5rem;
    text-align: center;
  }

  p {
    width: 80%;
    text-align: center;
    color: #f5f5f5;
  }

  @media only screen and (min-width: 768px) {
    img {
      width: 50%;
      height: 300px;
      object-fit: cover;
      object-position: center;
      background: #f5f5f5;
    }
  }

  @media only screen and (min-width: 992px) {
    p {
      width: 50%;
    }
  }
`
export default Onboarding
