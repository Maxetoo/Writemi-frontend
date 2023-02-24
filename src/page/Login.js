import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineUser,
  AiOutlineLock,
} from 'react-icons/ai'
import HalfLogo from '../assets/images/half-logo.png'
// AiOutlineUser

const Login = () => {
  return (
    <Wrapper>
      <img src={HalfLogo} alt='writeme-logo' />
      <h2>Welcome</h2>
      <p>sign in to continue</p>
      <form>
        <div className='username-container'>
          <div className='user-icon'>
            <AiOutlineUser />
          </div>
          <input type='text' placeholder='Enter username' />
        </div>
        <div className='password-container'>
          <div className='password-icon'>
            <AiOutlineLock />
          </div>
          <input type='password' placeholder='Password' />
          <div className='password-toggle'>
            <AiFillEyeInvisible />
          </div>
        </div>
      </form>

      <button type='button'>Login</button>
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
  height: 100vh;
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

  form {
    margin: 1.5rem;
    width: 75%;
  }

  form div {
    position: relative;
  }

  input {
    width: 100%;
    height: 45px;
    margin-top: 0.7rem;
    padding-left: 2.5rem;
    border-radius: 5px;
    /* border: solid 1.5px #121629; */
    border: solid 1.5px #6b6b6b;
    padding-right: 4rem;
    font-size: 0.95em;
    background: var(--input-bg);
    outline: none;
  }

  .user-icon {
    position: absolute;
    top: 1.15rem;
    left: 0.6rem;
    font-size: 1.5em;
    opacity: 0.8;
  }

  .password-icon {
    position: absolute;
    top: 1.15rem;
    left: 0.6rem;
    font-size: 1.5em;
    opacity: 0.8;
  }

  .password-toggle {
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    font-size: 1.5em;
    opacity: 0.7;
    cursor: pointer;
  }

  button {
    margin-top: 1rem;
    height: 45px;
    width: 75%;
    border: none;
    background: var(--login-secondary);
    color: var(--white-col);
    font-size: 0.9em;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.2em;
  }

  a {
    text-decoration: none;
    color: #000000;
  }

  a > .forgot-password {
    margin-top: 1.5rem;
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
    form {
      width: 400px;
    }

    button {
      width: 400px;
    }
  }
`
export default Login
