import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import {
  BsBookmarksFill,
  BsBookmarks,
  BsChatRightTextFill,
  BsChatRightText,
  BsFacebook,
  BsFlagFill,
} from 'react-icons/bs'
import { configTime } from '../../config/moment'
import { flagGroupMessage } from '../../slices/singleGroupSlice'
import { addToBookmark } from '../../slices/bookmarkSlice'
import { getSingleGroup } from '../../slices/groupMsgSlice'

import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'

// BsFlagFill

const GroupMessage = ({ message, _id, createdAt }) => {
  const dispatch = useDispatch()
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
        {/* <button
          type='button'
          className='flag-btn'
          onClick={() => {
            dispatch(flagGroupMessage(_id))
          }}
        >
          <BsFlagFill className='flag' />
          Flag Response
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
    opacity: 0.9;
  }

  .bookmark-btn {
    background: #131313;
    color: #ffffff;
    border: none;
  }

  .bookmark {
    margin-right: 0.3rem;
  }

  .flag-btn {
    background: #ec0c0c;
    color: #ffffff;
    border: none;
  }

  .flag {
    margin-right: 0.3rem;
    font-size: 1.2em;
    margin-bottom: 0.1rem;
  }

  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`

export default GroupMessage
