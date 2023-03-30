import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import { RxCopy } from 'react-icons/rx'
import { deleteBookmark, setBtnIndex } from '../../slices/bookmarkSlice'
import { configTime } from '../../config/moment'
import { AlertSuccess, AlertError } from '../../config'
import { copyToClipboard, killCopyAlert } from '../../slices/eventSlice'

const BookmarkMessage = ({ message, createdAt, _id, link, tag }) => {
  const { deletePending, fetchLoading, targetId } = useSelector(
    (store) => store.bookmarks
  )
  const { textCopied } = useSelector((store) => store.actions)
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <h3 className='message-title'>Message:</h3>
      <p className='message'>{message}</p>
      <p className='time-stamp'>{configTime(createdAt)}</p>
      <div className='btn-container'>
        <button
          type='button'
          className='bookmark-btn'
          onClick={() => dispatch(copyToClipboard(message))}
        >
          <RxCopy className='bookmark' />
          Copy to clipboard
        </button>
        <button
          type='button'
          className='delete-btn'
          onClick={() => {
            dispatch(deleteBookmark(_id))
          }}
        >
          <MdDelete className='delete' />
          Delete Response
        </button>
      </div>
      <p className='message-source'>
        <Link to={`${link}`}>
          source:{' '}
          {link.startsWith('/groups')
            ? link.substring(1, 7)
            : link.substring(1)}
        </Link>
      </p>
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

  .message-title {
    width: 100%;
    text-align: start;
  }

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
    opacity: 0.95;
  }

  .btn-loading {
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

  .message-source {
    width: 100%;
    text-align: end;
    padding-right: 1rem;
    opacity: 0.8;
    font-size: 0.8em;
    margin: 0.3rem;
  }

  p a {
    color: var(--white-col);
  }

  @media only screen and (min-width: 768px) {
    width: 50%;
  }
`
export default BookmarkMessage
