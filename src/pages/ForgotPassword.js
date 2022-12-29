import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <Wrapper>
      <h2>Reset Password</h2>
      <p>Please enter recovery phase key</p>
      <div className='wrapper-container'>
        <form>
          <label htmlFor='text' className='form-desc'>
            Enter Writemi Recovery Key
          </label>
          <input type='text' placeholder='unique key' />
          <button type='button'>Confirm</button>
        </form>
      </div>
      <Link to='/login'>
        <p className='link-back'>Back to Login</p>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(
    174.2deg,
    rgba(255, 244, 228, 1) 7.1%,
    rgba(240, 246, 238, 1) 67.4%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin: 0.5rem;
  }

  p {
    font-size: 1em;
    margin-bottom: 1rem;
  }

  .wrapper-container {
    width: 80%;
    background: var(--white-col);
    padding: 2rem;
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    border: solid 1px black;
    /* box-shadow: 1px 3px 1px black; */
    box-shadow: 1px 1px 1px #999999;
  }

  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .form-desc {
    font-size: 0.8em;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    height: 50px;
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: 5px;
    border: solid 1px black;
  }

  button {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    border: solid 1px black;
    cursor: pointer;
    background: #121629;
    color: var(--white-col);
    font-size: 1em;
  }

  a {
    color: black;
    text-decoration: none;
  }

  a > .link-back {
    margin: 1rem;
    font-size: 0.8em;
    font-weight: bold;
  }

  @media only screen and (min-width: 768px) {
    .wrapper-container {
      width: 50%;
    }
  }
`

export default ForgotPassword
