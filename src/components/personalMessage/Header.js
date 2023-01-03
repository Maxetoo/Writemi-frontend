import React from 'react'
import styled from 'styled-components'
// AiOutlineLeft
import { AiOutlineLeft, AiOutlineSearch, AiFillMessage } from 'react-icons/ai'
// BiDotsVerticalRounded
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Wrapper>
      <div className='header-container'>
        <div className='nav-left'>
          <Link to='/home'>
            <AiOutlineLeft />
          </Link>
        </div>
        <h3>Messages</h3>
        <div className='header-icons'>
          <AiOutlineSearch className='search-icon' />
          <BiDotsVerticalRounded />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.header`
  height: 100px;
  width: 100%;
  background: white;
  color: black;
  position: relative;
  padding: 1.5rem;

  .nav-left {
    font-size: 1.5em;
    cursor: pointer;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: grid;
    place-content: center;
    color: black;
  }

  a {
    color: black;
  }

  .header-container {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
  }

  h3 {
    font-size: 1em;
  }

  .header-icons {
    font-size: 1.5em;
    cursor: pointer;
  }

  .search-icon {
    margin-right: 1.5rem;
  }
`
export default Header
