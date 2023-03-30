import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { navData } from '../../services/homeData'
import { changeHomeNav, changeActiveNav } from '../../slices/eventSlice'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { activeNav } = useSelector((store) => store.actions)
  const { userCookie } = useSelector((store) => store.auth)
  const dispatch = useDispatch()
  const location = useLocation().pathname
  const navigate = useNavigate()

  useEffect(() => {
    const getNavIndex = navData.findIndex((value) =>
      location.startsWith(value.link)
    )
    let activeIndex
    if (getNavIndex === -1) {
      activeIndex = 0
    } else {
      activeIndex = getNavIndex
    }

    dispatch(changeActiveNav(activeIndex))
  }, [])

  return (
    <React.Fragment>
      {userCookie ? (
        <Wrapper>
          {navData.map((value, index) => {
            const { activeIcon, title, icon, link } = value
            return (
              <Link to={link} key={index}>
                <div
                  className={`icon-container ${
                    activeNav === index ? 'active' : ''
                  }`}
                  onClick={() => dispatch(changeHomeNav(index))}
                >
                  <div className='icon'>
                    {activeNav === index ? activeIcon : icon}
                  </div>
                  <p>{title}</p>
                </div>
              </Link>
            )
          })}
        </Wrapper>
      ) : (
        <OfflineWrapper>
          <p>You're currently loggedout</p>
          <button
            type='button'
            onClick={() => {
              navigate('/login')
            }}
          >
            Login
          </button>
        </OfflineWrapper>
      )}
    </React.Fragment>
  )
}

const Wrapper = styled.nav`
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: var(--dark-secondary);
  color: var(--white-col);
  z-index: 999 !important;
  padding: 1.5rem;

  a {
    width: 100%;
    text-decoration: none;
    color: #ffffff;
    opacity: 0.8;
  }

  a .icon-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.8;
  }

  .active {
    opacity: 1;
    color: #bbd1f4;
  }

  .icon {
    font-size: 1.5em;
  }

  p {
    font-size: 0.8em;
    margin-top: -0.2rem;
  }

  @media only screen and (min-width: 600px) {
    width: 100%;
    height: 80px;
    position: fixed;
    bottom: 0;
  }

  @media only screen and (min-width: 768px) {
    width: 100px;
    top: 0;
    left: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    a {
      padding: 2rem;
      height: 15%;
    }
  }
`

const OfflineWrapper = styled.nav`
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: var(--dark-secondary);
  color: var(--white-col);
  z-index: 999 !important;
  padding: 1rem 2rem 1rem 2rem;

  p {
    margin-right: 1rem;
    font-size: 0.85em;
    opacity: 0.8;
  }

  button {
    height: 80%;
    width: 35%;
    border: none;
    background: var(--login-secondary);
    color: var(--white-col);
    font-size: 0.7em;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8em;
  }
`

export default Navbar
