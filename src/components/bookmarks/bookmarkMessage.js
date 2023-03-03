import React from 'react'
import styled from 'styled-components'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import { RxCopy } from 'react-icons/rx'

const BookmarkMessage = () => {
  return (
    <Wrapper>
      <h3 className='message-title'>Message:</h3>
      <p className='message'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, natus.
      </p>
      <p className='time-stamp'>20mins ago</p>
      <div className='btn-container'>
        <button type='button' className='bookmark-btn'>
          <RxCopy className='bookmark' />
          Copy to clipboard
        </button>
        <button type='button' className='delete-btn'>
          <MdDelete className='delete' />
          Delete Response
        </button>
      </div>
      <p className='message-source'>source: groupmessages</p>
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

  .message-source {
    width: 100%;
    text-align: end;
    padding-right: 1rem;
    opacity: 0.8;
    font-size: 0.8em;
    margin: 0.3rem;
  }
`
export default BookmarkMessage
