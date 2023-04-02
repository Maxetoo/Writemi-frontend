import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineUser,
  AiOutlineLock,
} from 'react-icons/ai'
import HalfLogo from '../assets/images/half-logo.png'
import { ImCross } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleLoginPasswordVisibility,
  fillAuthInputs,
  userLogin,
  alertErrorKill,
} from '../slices/authSlice'

const Login = () => {
  const {
    loginPasswordVisible,
    loginInputs: { username, password },
    // isError,
    // loading,
    loginLoad,
    loginError,
    errorMessage,
    // entries,
    // isAuthenticated,
    // isLoggedIn,
  } = useSelector((store) => store.auth)

  const dispatch = useDispatch()
  const passwordTarget = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    if (loginError) {
      const timer = setTimeout(() => {
        dispatch(alertErrorKill())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [loginError])

  return (
    <Wrapper>
      <img src={HalfLogo} alt='writeme-logo' />
      <h2>Welcome</h2>
      <p className='sign'>sign in to continue</p>
      {loginError && (
        <div className='alert-container'>
          <p className='alert-texts'>{errorMessage}</p>
          <div className='exit-btn'>
            <ImCross />
          </div>
        </div>
      )}
      <form>
        <div className='username-container'>
          <div className='user-icon'>
            <AiOutlineUser />
          </div>
          <input
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) =>
              dispatch(
                fillAuthInputs({
                  username: e.target.value,
                  password,
                  type: 'login',
                })
              )
            }
          />
        </div>
        <div className='password-container'>
          <div className='password-icon'>
            <AiOutlineLock />
          </div>
          <input
            type='password'
            placeholder='Password'
            ref={passwordTarget}
            onChange={(e) =>
              dispatch(
                fillAuthInputs({
                  password: e.target.value,
                  username,
                  type: 'login',
                })
              )
            }
          />
          <div
            className='password-toggle'
            onClick={() => {
              dispatch(toggleLoginPasswordVisibility(passwordTarget.current))
            }}
          >
            {loginPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
        </div>
      </form>

      <button
        type='button'
        onClick={() => {
          dispatch(userLogin({ username, password }))
        }}
        className={loginLoad ? 'loading-btn' : ''}
      >
        Login
      </button>
      <Link to='/forgot-password'>
        <p className='forgot-password'>forgot password?</p>
      </Link>
      <p className='login-desc'>
        Don't have an Account?
        <Link to='/signup'>
          <p className='signup'>click here</p>
        </Link>
      </p>
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
    color: var(--login-secondary);
    font-size: 2.3em;
  }

  .sign {
    font-size: 1.3em;
  }

  form {
    margin: 1.5rem;
    width: 90%;
  }

  form div {
    position: relative;
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

  input {
    width: 100%;
    height: 55px;
    margin-top: 0.7rem;
    padding-left: 3rem;
    border-radius: 5px;
    border: solid 1px var(--login-secondary);
    padding-right: 4rem;
    font-size: 1.1em;
    background: var(--input-bg);
    outline: none;
  }

  .user-icon {
    position: absolute;
    top: 1.6rem;
    left: 0.6rem;
    font-size: 1.5em;
    opacity: 0.8;
  }

  .password-icon {
    position: absolute;
    top: 1.6rem;
    left: 0.6rem;
    font-size: 1.5em;
    opacity: 0.8;
  }

  .password-toggle {
    position: absolute;
    top: 1.6rem;
    right: 1.5rem;
    font-size: 1.5em;
    opacity: 0.7;
    cursor: pointer;
  }

  button {
    margin: 1rem;
    height: 50px;
    width: 90%;
    border: none;
    background: var(--login-secondary);
    color: var(--white-col);
    font-size: 0.9em;
    text-align: center;
    border-radius: 5px;
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

  a > .forgot-password {
    margin-top: 1.5rem;
    color: #0000ff;
    font-weight: 500;
  }

  .login-desc {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;
  }

  a > .signup {
    margin-left: 0.2rem;
    color: #0000ff;
    font-weight: 600;
  }

  @media only screen and (min-width: 768px) {
    .alert-container {
      width: 400px;
      height: auto;
    }

    form {
      width: 400px;
    }

    button {
      width: 400px;
    }
  }
`
export default Login
