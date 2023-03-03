import React from 'react'
import styled from 'styled-components'
import { Navbar, Homemain } from '../components/home'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import BookmarkMessage from '../components/bookmarks/bookmarkMessage'
const Bookmarks = () => {
  return (
    <Wrapper>
      <div className='header'>
        <div className='header-icon back-btn'>
          <MdOutlineArrowBackIosNew />
        </div>
        <h3 className='header-title'>Bookmarks</h3>
        <div className='header-icon menu'>
          <HiOutlineDotsVertical />
        </div>
      </div>
      <div className='bookmark-container'>
        <BookmarkMessage />
        <BookmarkMessage />
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

  .bookmark-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    margin-top: 2rem;
    padding-bottom: 7rem;
  }
`
export default Bookmarks
