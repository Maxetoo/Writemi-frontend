import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineLock,
} from 'react-icons/ai'
import { ImCross } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleSignupPasswordVisibility,
  alertErrorKill,
  userSignup,
  fillAuthInputs,
} from '../slices/authSlice'

const Signup = () => {
  const {
    signupPasswordVisible,
    isError,
    errorMessage,
    loading,
    signupInputs: { username, password, email },
  } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const passwordTarget = useRef()

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        dispatch(alertErrorKill())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isError])

  return (
    <Wrapper>
      <h2>Create Your Writeme Account</h2>
      {isError && (
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
            onChange={(e) => {
              dispatch(
                fillAuthInputs({ username: e.target.value, password, email })
              )
            }}
          />
        </div>
        <div className='email-container'>
          <div className='email-icon'>
            <AiOutlineMail />
          </div>
          <input
            type='email'
            placeholder='Enter email address'
            value={email}
            onChange={(e) => {
              dispatch(
                fillAuthInputs({ email: e.target.value, password, username })
              )
            }}
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
            value={password}
            onChange={(e) => {
              dispatch(
                fillAuthInputs({ password: e.target.value, email, username })
              )
            }}
          />
          <div
            className='password-toggle'
            onClick={() => {
              dispatch(toggleSignupPasswordVisibility(passwordTarget.current))
            }}
          >
            {signupPasswordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
        </div>
      </form>

      <button
        type='button'
        className={loading ? 'loading-btn' : ''}
        onClick={() => {
          dispatch(userSignup({ username, password, email }))
        }}
      >
        Create account
      </button>
      <p className='desc'>
        Already have an account?
        <Link to='/login'>
          <p className='login-link'>login</p>
        </Link>
      </p>
      <p className='tandc'>
        By continuing, I agree to Writeme's {''}
        <Link to='terms' className='terms-link'>
          Terms and Conditions.
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
  background: var(--signup-page);

  h2 {
    font-size: 2em;
    text-align: center;
    margin: 1rem;
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
    margin: 1rem;
    width: 90%;
  }

  form div {
    position: relative;
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
    top: 1.5rem;
    left: 0.6rem;
    font-size: 1.5em;
    opacity: 0.8;
  }

  .email-icon {
    position: absolute;
    top: 1.5rem;
    left: 0.6rem;
    font-size: 1.3em;
    opacity: 0.8;
  }

  .password-icon {
    position: absolute;
    top: 1.5rem;
    left: 0.6rem;
    font-size: 1.5em;
    opacity: 0.8;
  }

  .password-toggle {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 1.5em;
    opacity: 0.7;
    cursor: pointer;
  }

  button {
    margin-top: 1rem;
    height: 50px;
    width: 90%;
    border: none;
    background: var(--signup-secondary);
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

  .desc {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
  }

  /* .login-alt {
    display: flex;
    flex-direction: row;
    margin-top: 0.2rem;
  } */

  a {
    text-decoration: none;
    color: #000000;
  }

  .login-link {
    margin-left: 0.3rem;
    color: #0000ff;
    font-weight: 600;
  }

  .tandc {
    width: 80%;
    text-align: center;
    opacity: 0.8;
    font-size: 0.95em;
    margin: 0.5rem;
    font-weight: 700;
  }

  .terms-link {
    text-decoration: underline;
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
export default Signup
