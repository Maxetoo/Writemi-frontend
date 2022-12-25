import React from 'react'
import styled from 'styled-components'
import Sammy from '../../assets/Images/sammy-line-boy-in-a-hat-writes-a-book.png'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'

const Signup = () => {
  return (
    <Wrapper>
      <div className='header'>
        <img src={Sammy} alt='signup illustration' />
        <h3 className='header-title'>Writemi</h3>
      </div>
      <div className='signup-main--body'>
        <h3>Signup</h3>
        <form>
          <input type='text' placeholder='username' />
          <input type='email' placeholder='email' />
          <input type='password' placeholder='password' />
          <input type='password' placeholder='confirm password' />
        </form>
      </div>
      <button type='button'>Register</button>
      <Link to='/login'>
        <div className='footer'>Already have an account? Log in</div>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

  h3 {
    font-size: 1.1em;
  }

  .signup-main--body {
    width: 95%;
    margin-top: 0.5rem;
  }

  form {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    width: 100%;
    height: 45px;
    margin-top: 0.7rem;
    padding-left: 1rem;
    border-radius: 5px;
    border: solid 1.5px #121629;
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
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.7em;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
  }

  .footer:hover {
    opacity: 0.8;
  }

  @media only screen and (min-width: 768px) {
    .signup-main--body {
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
  }
`

export default Signup
