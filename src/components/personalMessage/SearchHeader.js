import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AiOutlineLeft, AiOutlineSearch, AiFillMessage } from 'react-icons/ai'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { MdOutlineClear } from 'react-icons/md'

const SearchHeader = () => {
  return (
    <Wrapper>
      <div className='header-container'>
        <div className='nav-left'>
          <Link to='/home'>
            <AiOutlineLeft />
          </Link>
          <form>
            <input type='text' placeholder='Search...' />
          </form>
        </div>
        <div className='header-icons'>
          <MdOutlineClear />
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

  .header-container {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
  }

  .nav-left {
    font-size: 1.5em;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  a {
    color: black;
  }

  form {
    margin-left: 2rem;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    outline: none;
  }

  input {
    border: none;
    height: 100%;
    padding: 1rem;
  }

  .header-icons {
    font-size: 1.5em;
    cursor: pointer;
  }
`

export default SearchHeader
