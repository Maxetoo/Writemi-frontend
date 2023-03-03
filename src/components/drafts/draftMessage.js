import React from 'react'
import styled from 'styled-components'
import { BsPencilSquare } from 'react-icons/bs'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import { RxCopy } from 'react-icons/rx'

// BsPencilSquare
const DraftMessage = () => {
  return (
    <Wrapper>
      <div className='messge-header'>
        <h3>Message:</h3>
        <div className='edit-icon'>
          <BsPencilSquare />
        </div>
      </div>
      <p className='message'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, odio.
      </p>
      <p className='time-stamp'>20 mins ago</p>
      <div className='btn-container'>
        <button type='button' className='copy-btn'>
          <RxCopy className='copy' />
          Copy to clipboard
        </button>
        <button type='button' className='delete-btn'>
          <MdDelete className='delete' />
          Delete
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

  .messge-header {
    width: 100%;
    margin: 0.1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .edit-icon {
    cursor: pointer;
  }

  .message {
    margin: 0.5rem;
    text-align: start;
  }

  .time-stamp {
    width: 100%;
    text-align: end;
    padding-right: 1rem;
    opacity: 0.8;
    font-size: 0.8em;
    margin: 0.2rem;
  }

  .btn-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
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
    background: #131313;
    color: #ffffff;
    border: none;
  }

  .copy {
    margin-right: 0.3rem;
    margin-bottom: 0.1rem;
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
export default DraftMessage
