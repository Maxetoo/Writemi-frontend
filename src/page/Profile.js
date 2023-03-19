import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import { Navbar, Homemain } from '../components/home'
import { profileDate } from '../services/profileData'
import { Link, useNavigate } from 'react-router-dom'
import { userLogout, fillProfileInputs } from '../slices/profileSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Wrapper>
      <div className='header'>
        <div className='header-icon back-btn' onClick={() => navigate('/home')}>
          <MdOutlineArrowBackIosNew />
        </div>
        <h3 className='header-title'>Profile</h3>
        <div className='header-icon menu'></div>
      </div>
      <div className='profile-container'>
        {profileDate.map((value, index) => {
          const { link, title, icon } = value
          return (
            <Link
              className='container'
              key={index}
              to={link}
              onClick={() => {
                if (title === 'Sign out') {
                  dispatch(userLogout())
                }
              }}
            >
              <p className='profile-icon'>{icon}</p>
              <p className='profile-title'>{title}</p>
            </Link>
          )
        })}
      </div>
      <Navbar />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  background: var(--secondary-home);
  text-align: center;
  color: var(--white-col);

  .header {
    height: 55px;
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
    font-size: 1em;
  }

  .profile-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 2rem;
    margin-top: 1rem;
  }

  .container {
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-decoration: none;
    color: var(--white-col);
    margin: 1rem;
    font-size: 1.2em;
    border-bottom: solid 1px #dddbdb;
    padding: 0.5rem;
  }

  .profile-icon {
    margin-right: 1.5rem;
    font-size: 1.1em;
  }

  .profile-title {
    margin-bottom: 0.55rem;
  }
`

export default Profile
