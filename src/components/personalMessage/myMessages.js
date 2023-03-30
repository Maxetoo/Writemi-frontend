import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom'

import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import {
  BsBookmarksFill,
  BsBookmarks,
  BsChatRightTextFill,
  BsChatRightText,
  BsFacebook,
} from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import {
  deletePersonalMessage,
  getPersonalMessages,
  getMessageId,
} from '../../slices/personalMsgSlice'
import { addToBookmark } from '../../slices/bookmarkSlice'
import { configTime } from '../../config/moment'

const MyMessages = ({ message, _id, createdAt }) => {
  const { deletePending } = useSelector((store) => store.messages)

  const dispatch = useDispatch()
  // const { id } = useParams()
  const location = useLocation().pathname
  return (
    <Wrapper>
      <h3>Message:</h3>
      <p className='message'>{message}</p>
      <p className='time-stamp'>{configTime(createdAt)}</p>
      <div className='btn-container'>
        <button
          type='button'
          className='bookmark-btn'
          onClick={() => {
            dispatch(
              addToBookmark({
                source: _id,
                message,
                link: location,
              })
            )
          }}
        >
          <BsBookmarksFill className='bookmark' />
          Bookmark Response
        </button>
        <button
          type='button'
          className='delete-btn'
          onClick={() => {
            dispatch(deletePersonalMessage(_id))
          }}
        >
          <MdDelete className='delete' />
          Delete Response
        </button>
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
  border: solid 1px #000;

  .btn-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  h3 {
    margin: 0.5rem;
    width: 100%;
    text-align: start;
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

  .loading-btn {
    opacity: 0.75;
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

  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`
export default MyMessages
