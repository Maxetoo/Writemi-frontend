import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ImCross } from 'react-icons/im'
import {
  fillResetPasswords,
  resetPassword,
  killResetPasswordAlert,
} from '../slices/authSlice'

const ResetPassword = () => {
  const { password, confirmPassword, errorMessage, resetError, resetLoad } =
    useSelector((store) => store.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (resetError) {
      const timer = setTimeout(() => {
        dispatch(killResetPasswordAlert())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [resetError])
  return (
    <Wrapper>
      <h2>Reset Password</h2>
      <p className='reset-desc'>Please enter a new password below</p>
      {resetError && (
        <div className='alert-container'>
          <p className='alert-texts'>{errorMessage}</p>
          <div className='exit-btn'>
            <ImCross />
          </div>
        </div>
      )}
      <form>
        <p>Enter a new password</p>
        <input
          type='password'
          value={password}
          onChange={(e) => {
            dispatch(
              fillResetPasswords({ password: e.target.value, confirmPassword })
            )
          }}
        />
        <p>Re-enter password</p>
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => {
            dispatch(
              fillResetPasswords({ confirmPassword: e.target.value, password })
            )
          }}
        />
      </form>
      <button
        type='button'
        className={resetLoad ? 'loading-btn' : ''}
        onClick={() => {
          dispatch(resetPassword({ password, confirmPassword }))
        }}
      >
        Change password
      </button>
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

  .alert-container {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    color: #b94a48;
    background-color: #f2dede;
    border-color: #eed3d7;
    height: auto;
    padding: 1rem;
  }

  .alert-texts {
    font-size: 0.9em;
    width: 90%;
  }

  .exit-btn {
    font-size: 0.7em;
    height: 90%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    cursor: pointer;
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

  .loading-btn {
    opacity: 0.75;
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
