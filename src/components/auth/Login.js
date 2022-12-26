import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import Sammy from '../../assets/Images/sammy-line-boy-in-a-hat-writes-a-book.png'
import { Link, useNavigate } from 'react-router-dom'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const Login = () => {
  const [active, setActive] = useState(true)
  const iconBtn = useRef()

  const toggleVisibility = () => {
    let type = iconBtn.current.type
    if (type === 'password') {
      iconBtn.current.type = 'text'
      setActive(false)
    } else {
      iconBtn.current.type = 'password'
      setActive(true)
    }
  }
  return (
    <Wrapper>
      <div className='header'>
        <img src={Sammy} alt='signup illustration' />
        <h3 className='header-title'>Writemi</h3>
      </div>
      <div className='login-main--body'>
        <h3>Login</h3>
        <form>
          <input type='text' placeholder='username' />
          <input
            type='password'
            placeholder='password'
            className='password-input'
            ref={iconBtn}
          />

          <div className='password-icon' onClick={toggleVisibility}>
            {active ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
        </form>
      </div>
      <button type='button'>Login</button>
      <Link to='/signup'>
        <div className='footer'>Don't have an account? Sign up</div>
      </Link>
      <Link to='/forget'>
        <div className='footer password'>Forgot password?</div>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-image: linear-gradient(
    174.2deg,
    rgba(255, 244, 228, 1) 7.1%,
    rgba(240, 246, 238, 1) 67.4%
  );

  .header {
    width: 70%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  img {
    height: 150px;
    /* border: solid 1px black; */
    border-radius: 5px;
  }

  .header-title {
    font-size: 1.5em;
    margin-top: 0.5rem;
    color: #073831;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .login-main--body {
    width: 95%;
    margin-top: 0.5rem;
    /* padding: 1rem; */
  }

  form {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  input {
    width: 100%;
    height: 45px;
    margin-top: 0.7rem;
    padding-left: 1rem;
    border-radius: 5px;
    border: solid 1.5px #121629;
    padding-right: 4rem;
    font-size: 0.95em;
  }

  button {
    margin-top: 1rem;
    height: 45px;
    width: 95%;
    border: none;
    background: #121629;
    color: var(--white-col);
    font-size: 0.9em;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background: #090c1d;
  }

  a {
    text-decoration: none;
    color: #000000;
  }

  a > .footer {
    margin-top: 1.3rem;
    text-align: center;
    font-size: 0.7em;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
  }

  .footer:hover {
    opacity: 0.8;
  }

  .password {
    font-size: 1.3em;
  }

  .password-icon {
    position: absolute;
    top: 4.75rem;
    right: 1.5rem;
    font-size: 1.5em;
    opacity: 0.7;
    cursor: pointer;
  }

  @media only screen and (min-width: 768px) {
    .login-main--body {
      width: 50%;
    }

    input {
      height: 50px;
      margin-top: 0.9rem;
    }

    button {
      width: 50%;
      height: 50px;
      margin-top: 1rem;
    }

    a > .footer {
      margin-top: 1.5rem;
    }

    .password-icon {
      top: 5.5rem;
      right: 1.5rem;
    }
  }
`

export default Login
