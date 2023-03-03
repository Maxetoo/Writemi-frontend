import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Mail from '../../assets/images/mail-illustration.png'

const RedirectPage = () => {
  return (
    <Wrapper>
      <img src={Mail} alt='mail-illusttration' />
      <p>Password reset link sent to mail!</p>
      <button type='button'>Resend</button>
      <Link to='/login'>
        <p className='login'>Back to login</p>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  min-height: 100vh;
  width: 100vw;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--white-col);

  img {
    margin-top: 1rem;
  }

  p {
    font-size: 1.3em;
    margin: 2rem;
  }

  button {
    margin-top: 1rem;
    height: 50px;
    width: 90%;
    border: none;
    background: var(--login-secondary);
    color: var(--white-col);
    font-size: 0.9em;
    text-align: center;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.2em;
  }

  a {
    text-decoration: none;
    color: #000000;
  }

  .login {
    font-size: 0.8em;
    font-weight: 600;
    margin-top: 2rem;
  }

  @media only screen and (min-width: 768px) {
    button {
      width: 450px;
    }
  }
`

export default RedirectPage
