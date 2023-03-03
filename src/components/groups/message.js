import React from 'react'
import styled from 'styled-components'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import {
  BsBookmarksFill,
  BsBookmarks,
  BsChatRightTextFill,
  BsChatRightText,
  BsFacebook,
} from 'react-icons/bs'
const GroupMessage = () => {
  return (
    <Wrapper>
      <h3>Message:</h3>
      <p className='message'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, natus.
      </p>
      <p className='time-stamp'>20mins ago</p>
      <div className='btn-container'>
        <button type='button' className='bookmark-btn'>
          <BsBookmarksFill className='bookmark' />
          Bookmark Response
        </button>
        {/* <button type='button' className='delete-btn'>
          <MdDelete className='delete' />
          Delete Response
        </button> */}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  width: 80%;
  min-height: 200px;
  border-radius: 5px;
  text-align: center;
  background: #435c6d;
  color: #ffffff;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  .btn-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  h3 {
    margin: 0.5rem;
  }

  p {
    margin: 0.5rem;
  }

  .time-stamp {
    width: 100%;
    text-align: end;
    padding-right: 1rem;
    opacity: 0.8;
    font-size: 0.8em;
  }

  button {
    margin: 0.2rem;
    width: 100%;
    height: 50px;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .bookmark-btn {
    background: #131313;
    color: #ffffff;
    border: none;
  }

  .bookmark {
    margin-right: 0.3rem;
  }

  .delete-btn {
    background: #ec0c0c;
    color: #ffffff;
    border: none;
  }

  .delete {
    margin-right: 0.3rem;
    font-size: 1.2em;
    margin-bottom: 0.1rem;
  }
`

export default GroupMessage
