import React from 'react'
import styled from 'styled-components'
import { IoMdNotifications } from 'react-icons/io'
import { RxCopy } from 'react-icons/rx'
import { homeData, socials } from '../../services/homeData'
// RxCopy
const Homemain = () => {
  return (
    <Wrapper>
      {/* <div className='header'>
        <div></div>
        <IoMdNotifications />
      </div> */}
      <h3>Maxeto's Profile</h3>
      <div className='link-board'>
        <p className='link-name'>writeme/maxeto/profile</p>
        <RxCopy className='copy-icon' />
      </div>
      <div className='navigation-container'>
        {homeData.map((value, index) => {
          const { icon, activeIcon, id, title } = value
          return (
            <div className='nav-btn' key={id}>
              <div className='nav-icon'>{icon}</div>
              <p className='nav-title'>{title}</p>
            </div>
          )
        })}
      </div>
      <div className='btn-container'>
        <button type='button' className='create'>
          Create space
        </button>
        <button type='button' className='share'>
          Share my link
        </button>
      </div>
      <div className='social-container'>
        {socials.map((value, index) => {
          return (
            <div className='social-icon' key={index}>
              {value}
            </div>
          )
        })}
      </div>
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
  /* background: var(--dark-secondary); */
  color: var(--white-col);
  padding: 1rem;
  padding-bottom: 7rem;

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

  .navigation-container {
    width: 90%;
    height: 250px;
    margin: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    font-weight: bold;
  }

  .nav-btn {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    border: solid 1.5px #bbd1f4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--white-col);
    /* background: #0a0a36; */
    background: #bbd1f4;
    color: black;
    opacity: 0.8;
  }

  .nav-btn:hover {
    /* background: #bbd1f4;
    color: #000000; */
    /* background: #05059b; */
    background: white;
    border: none;
    transition: 0.5s all;
  }

  .nav-icon {
    font-size: 1.5em;
    font-weight: bold;
    color: #090933;
  }

  .nav-title {
    font-size: 0.8em;
    text-align: center;
    width: 50%;
  }

  .btn-container {
    margin: 1rem;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    width: 100%;
    height: 55px;
    margin: 0.5rem;
    border-radius: 5px;
    border: solid 1px black;
    cursor: pointer;
    font-size: 1em;
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
