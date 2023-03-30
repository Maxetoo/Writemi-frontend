import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ImCross } from 'react-icons/im'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  confirmOTP,
  fillResetToken,
  killConfirmOTPAlert,
} from '../../slices/authSlice'

const PasswordToken = () => {
  const { token, confirmOTPLoad, confirmOTPError, errorMessage } = useSelector(
    (store) => store.auth
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (confirmOTPError) {
      const timer = setTimeout(() => {
        dispatch(killConfirmOTPAlert())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [confirmOTPError])
  return (
    <Wrapper>
      <h2>Enter OTP </h2>
      <p className='reset-desc'>
        Not received? Check spams or promotions for mail
      </p>
      {confirmOTPError && (
        <div className='alert-container'>
          <p className='alert-texts'>{errorMessage}</p>
          <div className='exit-btn'>
            <ImCross />
          </div>
        </div>
      )}
      <form>
        <p>Enter OTP</p>
        <input
          type='text'
          maxLength={6}
          value={token}
          onChange={(e) => {
            dispatch(fillResetToken(e.target.value))
          }}
        />
      </form>
      <button
        type='button'
        className={confirmOTPLoad ? 'loading-btn' : ''}
        onClick={() => {
          dispatch(confirmOTP({ token }))
        }}
      >
        Continue
      </button>
      <div className='resend-otp'></div>
      <Link to='/forgot-password'>
        <p className='login'>Back to resend OTP</p>
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
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    color: #b94a48;
    background-color: #f2dede;
    border-color: #eed3d7;
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

export default PasswordToken
