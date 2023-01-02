import React from 'react'
import styled from 'styled-components'
// AiOutlineMenu
import { AiOutlineMenu, AiFillCopy } from 'react-icons/ai'
import { FaEarlybirds } from 'react-icons/fa'
// import { AiFillCopy } from 'react-icons/ai'

const Header = () => {
  return (
    <Wrapper>
      <div className='nav-container'>
        {/* <div></div> */}
        <h3>Profile</h3>
        <div className='menu-btn'>
          <AiOutlineMenu />
        </div>
      </div>
      <div className='dashboard-container'>
        <div className='dashboard'>
          <div className='bird-container'>
            <FaEarlybirds />
          </div>
          <h3 className='board-name'>Hello, Maxeto</h3>
          <div className='clipboard'>
            <p className='clipboard-link'>https://linktomyprofile</p>
            <button type='button'>
              <AiFillCopy />
            </button>
          </div>
          <p className='clipboard-msg'>
            Tap to copy link and receive personal messages
          </p>
        </div>
      </div>
    </Wrapper>
  )
}

// <div></div>
// <h3>Profile</h3>
//{' '}
// <div className='menu-btn'>
//   // <AiOutlineMenu />
//   //{' '}
// </div>

const Wrapper = styled.header`
  height: 150px;
  width: 100%;
  padding: 1rem;
  background: #ffab91;
  z-index: 1000;
  border-bottom: solid 1px var(--stroke);

  .nav-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0rem 1.5rem 0rem 1.5rem;
  }

  .menu-btn {
    background: white;
    color: black;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    display: grid;
    place-content: center;
    cursor: pointer;
  }

  .dashboard-container {
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .dashboard {
    width: 80%;
    height: 150px;
    background: white;
    margin-top: 8rem;
    border-radius: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: solid 1px var(--stroke);
  }

  .bird-container {
    background: white;
    color: black;
    width: 40px;
    height: 40px;
    border-radius: 20%;
    font-size: 2em;
    display: grid;
    place-content: center;
    position: absolute;
    border: solid 1px black;
    top: 0;
    margin-top: -1rem;
  }

  .board-name {
    color: black;
    margin-top: 0.5rem;
  }

  .clipboard {
    width: 80%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #292929;
    font-size: 0.8em;
    border-radius: 10px;
    overflow: hidden;
    padding-left: 1rem;
    margin-top: 0.5rem;
  }

  .clipboard-link {
    text-decoration: underline;
  }

  button {
    width: 20%;
    background: none;
    color: white;
    border: none;
    border-left: solid 1px white;
    cursor: pointer;
  }

  .clipboard-msg {
    color: black;
    font-size: 0.7em;
    margin-top: 0.5rem;
    text-align: center;
  }
`
export default Header
