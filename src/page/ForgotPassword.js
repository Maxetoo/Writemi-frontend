import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <Wrapper>
      <h2>Reset Password</h2>
      <p>Enter an email associated with this account to reset your password</p>
      <form>
        <input type='email' />
      </form>
      <button type='button'>Send reset link</button>
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
  background: var(--login-page);

  h2 {
    font-size: 2em;
  }

  p {
    margin: 1rem;
    text-align: center;
    width: 80%;
  }

  form {
    width: 90%;
  }

  input {
    width: 100%;
    height: 55px;
    margin-top: 0.7rem;
    padding-left: 2.5rem;
    border-radius: 20px;
    border: solid 1.5px #6b6b6b;
    padding-right: 4rem;
    font-size: 1.1em;
    background: var(--input-bg);
    outline: none;
  }

  button {
    margin-top: 4rem;
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
    form {
      width: 400px;
    }

    button {
      width: 400px;
    }
  }
`

export default ForgotPassword
