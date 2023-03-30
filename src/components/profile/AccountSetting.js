import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../home/Navbar'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineLock,
} from 'react-icons/ai'
import {
  fillProfileInputs,
  togglePasswordVisibility,
  getProfileLogs,
  editProfile,
  killAlertError,
} from '../../slices/profileSlice'
import { Loader, AlertSuccess, AlertError } from '../../config'

const AccountSetting = () => {
  const {
    newUsername,
    newPassword,
    newEmail,
    passwordVisible,
    loading,
    profile,
    isEditing,
    editLoading,
    isError,
    errorMessage,
    editSuccess,
    successMessage,
  } = useSelector((store) => store.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const passwordTarget = useRef()
  const usernameTarget = useRef()
  const emailTarget = useRef()
  const { username, email } = profile

  useEffect(() => {
    dispatch(getProfileLogs())
  }, [])

  useEffect(() => {
    if (!loading) {
      dispatch(fillProfileInputs({ username, email }))
    }
  }, [loading])

  useEffect(() => {
    if (isError || editSuccess) {
      const timer = setTimeout(() => {
        dispatch(killAlertError())
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isError, editSuccess])

  return (
    <Wrapper>
      <div className='header'>
        <div
          className='header-icon back-btn'
          onClick={() => navigate('/profile')}
        >
          <MdOutlineArrowBackIosNew />
        </div>
        <h3 className='header-title'>Account Setting</h3>
        <div className='header-icon menu'>
          {/* <HiOutlineDotsVertical /> */}
        </div>
      </div>
      <div className='container'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <form>
              <div className='username-container'>
                <div className='user-icon acc-icon'>
                  <AiOutlineUser />
                </div>
                <input
                  type='text'
                  placeholder='Enter username'
                  value={isEditing ? newUsername : username}
                  onChange={(e) => {
                    dispatch(
                      fillProfileInputs({
                        username: e.target.value,
                        email: `${isEditing ? newEmail : email}`,
                      })
                    )
                  }}
                />
              </div>
              <div className='email-container'>
                <div className='email-icon acc-icon'>
                  <AiOutlineMail />
                </div>
                <input
                  type='email'
                  placeholder='Enter email address'
                  value={isEditing ? newEmail : email}
                  onChange={(e) => {
                    dispatch(
                      fillProfileInputs({
                        email: e.target.value,
                        username: `${isEditing ? newUsername : username}`,
                      })
                    )
                  }}
                />
              </div>
              {/* <div className='password-container'>
                <div className='password-icon acc-icon'>
                  <AiOutlineLock />
                </div>
                <input
                  type='password'
                  placeholder='Password'
                  ref={passwordTarget}
                  value={isEditing ? newPassword : password}
                  onChange={(e) => {
                    dispatch(
                      fillProfileInputs({
                        password: e.target.value,
                        username: `${isEditing ? newUsername : username}`,
                        email: `${isEditing ? newEmail : email}`,
                      })
                    )
                  }}
                />
                <div
                  className='password-toggle'
                  onClick={() => {
                    dispatch(togglePasswordVisibility(passwordTarget.current))
                  }}
                >
                  {passwordVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                </div>
              </div> */}
            </form>
            <button
              type='button'
              className={editLoading ? 'loading-btn' : ''}
              onClick={() => {
                dispatch(
                  editProfile({
                    username: newUsername,
                    email: newEmail,
                  })
                )
              }}
            >
              Save changes
            </button>
          </>
        )}
      </div>
      {isError && <AlertError message={errorMessage} />}
      {editSuccess && <AlertSuccess message={successMessage} />}
      <Navbar />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  /* position: relative; */
  min-height: 100vh;
  width: 100vw;
  background: var(--secondary-home);
  text-align: center;
  color: var(--white-col);

  .header {
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    color: #ffffff;
    background: #435c6d;
  }

  .header-icon {
    font-size: 1.3em;
    cursor: pointer;
  }

  .header-title {
    font-size: 0.95em;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 2rem;
  }

  form {
    margin: 3rem;
    width: 90%;
  }

  form > div {
    position: relative;
  }

  /* .username-container {
    position: relative;
  } */

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

  .acc-icon {
    color: var(--signup-secondary);
    position: absolute;
    top: 1.5rem;
    left: 0.7rem;
    font-size: 1.5em;
    opacity: 0.8;
  }

  .email-icon {
    font-size: 1.3em;
    top: 1.7rem;
  }

  .password-toggle {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 1.5em;
    opacity: 0.7;
    cursor: pointer;
    color: var(--signup-secondary);
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

  @media only screen and (min-width: 768px) {
    .header {
      padding: 0rem 3rem 0rem 10rem;
    }

    form {
      width: 50%;
    }

    button {
      width: 50%;
    }
  }
`

export default AccountSetting
