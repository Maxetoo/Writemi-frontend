import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MellowSuccess from '../../assets/images/mellow-success.png'
import Mail from '../../assets/images/mail-illustration.png'
import { defaultResetPasswordPass } from '../../slices/authSlice'

const ResetPasswordSuccess = () => {
  const dispatch = useDispatch()
  return (
    <Wrapper>
      <img src={MellowSuccess} alt='success-illustration' />
      <h3>Successful!</h3>
      <Link to='/login'>
        <button
          type='button'
          onClick={() => {
            dispatch(defaultResetPasswordPass())
          }}
        >
          Proceed to login
        </button>
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

  h3 {
    font-size: 2em;
    margin: 3rem;
  }

  a {
    text-decoration: none;
    color: #000000;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  a > button {
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

  @media only screen and (min-width: 768px) {
    a {
      width: 450px;
    }
  }
`

export default ResetPasswordSuccess
