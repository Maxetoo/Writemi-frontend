import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { ImCross } from 'react-icons/im'
import { exitPrompt } from '../../slices/singleGroupSlice'
import { exitLoginPrompt } from '../../slices/bookmarkSlice'
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'

const SignupPrompt = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Wrapper>
      <div className='prompt-container'>
        <div
          className='exit-prompt-btn'
          onClick={() => {
            dispatch(exitPrompt())
            dispatch(exitLoginPrompt())
          }}
        >
          <ImCross />
        </div>
        <img
          className='prompt-img'
          src='https://ouch-cdn2.icons8.com/yiGhOQd_xEZQrsGHuq1JSvYbi8fTt5O3XLFMj4AbzIA/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTI3/LzdmNmMzZTZhLTBi/YWMtNDRjZC04NDlk/LTYzNmUyNmRiY2Ux/ZC5zdmc.png'
          alt='not signed in'
        />
        <h3>
          You're not on signed in to your account. Tap on the button to login
        </h3>
        <button
          type='button'
          className='prompt-btn'
          onClick={() => {
            navigate('/login')
          }}
        >
          Login
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */

  .exit-prompt-btn {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
  }

  .prompt-img {
    margin-top: -2.5rem;
  }

  h3 {
    margin-top: -2rem;
  }

  .prompt-container {
    width: 80%;
    height: 70%;
    border-radius: 5px;
    text-align: center;
    background: #435c6d;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .prompt-btn {
    margin-top: 1.5rem;
    height: 45px;
    width: 80%;
    border: none;
    background: var(--login-secondary);
    color: var(--white-col);
    font-size: 0.7em;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }
`
export default SignupPrompt
