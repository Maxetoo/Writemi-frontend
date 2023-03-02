import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ResetPassword = () => {
  return (
    <Wrapper>
      <h2>Reset Password</h2>
      <p className='reset-desc'>
        Enter an email address associated with this account to reset your
        password
      </p>
      <form>
        <p>Enter a new password</p>
        <input type='password' />
        <p>Re-enter password</p>
        <input type='password' />
      </form>
      <button type='button'>Change password</button>
      <Link to='/login'>
        <p className='login'>Back to login</p>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 100vh;
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

  .reset-desc {
    margin: 1rem;
    text-align: center;
    width: 80%;
  }

  form {
    width: 90%;
  }

  form p {
    margin-top: 1rem;
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
    margin-top: 3rem;
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
    .reset-desc {
      width: 400px;
      margin: 1.5rem;
    }

    form {
      width: 400px;
    }

    button {
      width: 400px;
    }
  }
`

export default ResetPassword
