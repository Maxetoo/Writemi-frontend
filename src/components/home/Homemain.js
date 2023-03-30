import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoMdNotifications } from 'react-icons/io'
import { RxCopy } from 'react-icons/rx'
import { homeData, socials } from '../../services/homeData'
import Logo from '../../assets/images/half-logo.png'
import { Loader, AlertSuccess } from '../../config'
import { getProfileLogs } from '../../slices/profileSlice'
import { copyToClipboard, killCopyAlert } from '../../slices/eventSlice'
import { setUsernameToLocalStorage } from '../../slices/authSlice'

// RxCopy
const Homemain = () => {
  const { loading, profile } = useSelector((store) => store.profile)
  const { username: getUsername, userCookie } = useSelector(
    (store) => store.auth
  )
  const { textCopied } = useSelector((store) => store.actions)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { username } = profile
  const currentUrl = `${window.origin}/${getUsername || username}`

  useEffect(() => {
    dispatch(getProfileLogs())
  }, [])

  useEffect(() => {
    if (textCopied) {
      const timer = setTimeout(() => {
        dispatch(killCopyAlert())
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [textCopied])

  const shareUrl = () => {
    window.navigator
      .share({
        url: currentUrl,
        title: 'Writeme',
        text: 'Send a secret message to me...',
      })
      .then(() => console.log('success'))
      .catch(() => 'Error')
  }
  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <img src={Logo} alt='logo' />
          <h3>{getUsername || username} Profile</h3>
          <div className='link-board'>
            <p className='link-name'>{currentUrl}</p>
            <div
              className='copy-container'
              onClick={() => dispatch(copyToClipboard(currentUrl))}
            >
              <RxCopy className='copy-icon' />
            </div>
          </div>
          <div className='navigation-container'>
            {homeData.map((value, index) => {
              const { icon, activeIcon, id, title, link } = value
              return (
                <Link to={link} key={id} className='nav-btn-container'>
                  <div className='nav-btn' key={id}>
                    <div className='nav-icon'>{icon}</div>
                    <p className='nav-title'>{title}</p>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className='btn-container'>
            <button
              type='button'
              className='create'
              onClick={() => navigate('/groups/createGroup')}
            >
              Create group
            </button>
            <button type='button' className='share' onClick={shareUrl}>
              Share my link
            </button>
          </div>
        </>
      )}
      {textCopied && <AlertSuccess message={'URL copied'} />}
    </Wrapper>
  )
}

const Wrapper = styled.article`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--secondary-home);
  color: var(--white-col);
  padding: 1rem;
  padding-bottom: 7rem;

  img {
    margin-top: 1.5rem;
  }

  h3 {
    margin: 1rem;
  }

  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin: 1rem;
  }

  .link-board {
    width: 90%;
    height: 40px;
    background: white;
    /* background: #05059b; */
    /* background: #bbd1f4; */
    /* color: white; */
    color: black;
    border-radius: 5px;
    /* color: black; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    margin: 2rem;
    border: solid 1px black;
    cursor: pointer;
    opacity: 0.8;
  }

  .copy-container {
    border-left: solid 1px black;
    padding-left: 1rem;
  }

  .navigation-container {
    width: 90%;
    height: auto;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }

  .nav-btn-container {
    width: 100%;
    height: 70px;
    text-decoration: none;
    border-radius: 10px;
    cursor: pointer;
    border: solid 1.5px #bbd1f4;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem;
    margin-top: 1rem;
    background: #bbd1f4;
    color: #000000;
  }

  .nav-btn {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .nav-icon {
    margin-top: 0.3rem;
    font-size: 1.2em;
  }

  .nav-title {
    font-size: 0.9em;
    width: 100%;
    margin-left: 1rem;
  }

  .btn-container {
    margin: 3rem;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    width: 100%;
    height: 50px;
    margin: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    border: none;
  }

  .create {
    background: #05059b;
    color: var(--white-col);
  }

  .share {
    background: none;
    color: var(--white-col);
    border: solid 1px white;
  }

  .social-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: -1.5rem;
  }

  .social-icon {
    margin: 0.2rem;
    cursor: pointer;
  }

  @media only screen and (min-width: 600px) {
    .link-board {
      width: 550px;
      height: 50px;
    }

    .navigation-container {
      width: 550px;
      height: 350px;
    }

    .nav-btn {
      width: 100%;
      height: 150px;
    }

    .btn-container {
      margin: 3rem;
    }

    button {
      width: 550px;
    }
  }

  @media only screen and (min-width: 768px) {
    h3 {
      font-size: 1.5em;
    }
    .link-board {
      width: 550px;
      /* height: 50px; */
    }

    .navigation-container {
      width: 550px;
    }

    .nav-btn {
      width: 100%;
      height: 130px;
      margin-right: 2rem;
    }

    .btn-container {
      margin: 3rem;
    }

    button {
      width: 550px;
    }
  }
`
export default Homemain
