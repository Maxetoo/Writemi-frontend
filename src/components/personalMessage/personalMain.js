import React from 'react'
import styled from 'styled-components'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import {
  BsFillShareFill,
  BsTrash,
  BsFillBookmarkHeartFill,
} from 'react-icons/bs'

// BiDotsHorizontalRounded
const personalMain = () => {
  return (
    <Wrapper>
      <div className='message-container'>
        <div className='message-frame'>
          <div className='frame-top'>
            <p className='message'>
              Lorem ipsum dolor sit amet consectetur. Pablo escober is fine
            </p>
            <BiDotsHorizontalRounded className='options-icon' />
          </div>
          <div className='frame-bottom'>
            <p className='date'>11pm 2/22/12</p>
            <div className='action-icons'>
              <BsFillBookmarkHeartFill className='bookmark-icon' />
              <BsFillShareFill className='share-icon' />
            </div>
          </div>
        </div>
        <div className='message-frame'>
          <div className='frame-top'>
            <p className='message'>I can't wait to fuck you so badly</p>
            <BiDotsHorizontalRounded className='options-icon' />
          </div>
          <div className='frame-bottom'>
            <p className='date'>11pm 2/22/12</p>
            <div className='action-icons'>
              <BsFillBookmarkHeartFill className='bookmark-icon' />
              <BsFillShareFill className='share-icon' />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  margin-top: 1.5rem;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .message-container {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .message-frame {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffcc80;
    color: black;
    padding: 1rem;
    border-radius: 10px;
    margin: 0.5rem;
    border-bottom: solid 2px black;
  }

  .frame-top {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
  }

  .message {
    text-align: start;
    font-size: 0.9em;
  }

  .options-icon {
    margin-left: 1rem;
    cursor: pointer;
    font-size: 1.2em;
  }

  .frame-bottom {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    margin-top: 1.5rem;
    font-size: 0.8em;
  }

  .date {
    opacity: 0.8;
  }

  .action-icons {
    margin-left: 1rem;
    cursor: pointer;
    font-size: 1.2em;
  }

  .share-icon {
    margin-left: 1rem;
  }
`

export default personalMain
