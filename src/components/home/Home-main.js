import React from 'react'
import styled from 'styled-components'
import { FaEarlybirds } from 'react-icons/fa'
import { HomePageData } from './Data.js'
import { useNavigate, Link } from 'react-router-dom'
// FiCopy
// IoCopyOutline
// AiFillCopy
import { AiFillCopy } from 'react-icons/ai'
const Dashboard = () => {
  const shareProfile = (text) => {
    if (text === 'Share Profile') {
      window.navigator
        .share({
          url: window.location,
          title: 'Writemi',
          text: 'Page url',
        })
        .then(() => console.log('success'))
        .catch(() => 'Error')
    }
  }
  return (
    <Wrapper>
      <div className='bird-container'>
        <FaEarlybirds />
      </div>
      <div className='dashboard-container'>
        <p className='clipboard-msg'>
          Tap to copy link and receive personal messages
        </p>
        <div className='clipboard'>
          <p className='clipboard-link'>https://linktomyprofile</p>
          <button type='button'>
            <AiFillCopy />
          </button>
        </div>
        {HomePageData.map((value) => {
          const { id, link, icon, text, bg, color } = value
          return (
            <Link
              to={link}
              key={id}
              className='home-nav--list'
              style={{
                background: bg,
                color: color,
              }}
              onClick={() => {
                shareProfile(text)
              }}
            >
              <p className='icon'>{icon}</p>
              <p>{text}</p>
            </Link>
          )
        })}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  width: 100%;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  margin-top: 7rem;
  z-index: -1;
  /* position: relative; */

  .bird-container {
    background: white;
    color: black;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 2em;
    display: grid;
    place-content: center;
    position: absolute;
    top: 0;
  }

  .dashboard-container {
    background: #ffab91;
    width: 100%;
    height: 425px;
    border-radius: 15px;
    /* border: solid 2px black; */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }

  .clipboard-msg {
    font-size: 0.8em;
    margin-top: 1rem;
  }

  .clipboard {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #292929;
    font-size: 0.8em;
    margin: 1rem;
    margin-bottom: 1rem;
    border-radius: 10px;
    overflow: hidden;
    padding-left: 2rem;
  }

  button {
    width: 30%;
    background: none;
    color: white;
    border: none;
    border-left: solid 1px white;
    cursor: pointer;
  }

  .dashboard-lists {
    width: 100%;
    height: 100%;
  }

  .home-nav--list {
    width: 100%;
    height: 45px;
    display: flex;
    font-size: 1em;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 0.5rem;
    background: white;
    border-radius: 20px;
    text-decoration: none;
    padding-left: 1.5rem;
    color: black;
    border: solid 1px var(--stroke);
  }

  .icon {
    margin-right: 1rem;
    margin-top: 0.3rem;
  }
`
export default Dashboard
