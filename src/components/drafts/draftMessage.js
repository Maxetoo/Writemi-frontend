import React, { useEffect } from 'react'
import styled from 'styled-components'
import { BsPencilSquare } from 'react-icons/bs'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import { RxCopy } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { configTime } from '../../config/moment'
import {
  deleteDraftMessage,
  editDraftMessage,
  checkDraftId,
} from '../../slices/draftSlice'
import { AlertSuccess } from '../../config'
import { copyToClipboard, killCopyAlert } from '../../slices/eventSlice'

// BsPencilSquare
const DraftMessage = ({ dateCreated, dateUpdated, message, source, _id }) => {
  const { textCopied } = useSelector((store) => store.actions)
  // const {} = useSelector((store) => store.messages)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (textCopied) {
      const timer = setTimeout(() => {
        dispatch(killCopyAlert())
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [textCopied])

  return (
    <Wrapper>
      <div className='messge-header'>
        <h3>Message:</h3>
        <div
          className='edit-icon'
          onClick={() => {
            dispatch(editDraftMessage({ id: _id, message }))
            navigate(`/drafts/${_id}`)
          }}
        >
          <BsPencilSquare />
        </div>
      </div>
      {textCopied && <AlertSuccess message={'Text copied'} />}
      <p className='message'>{message}</p>
      <p className='time-stamp'>{configTime(dateCreated)}</p>
      <div className='btn-container'>
        <button
          type='button'
          className='copy-btn'
          onClick={() => dispatch(copyToClipboard(message))}
        >
          <RxCopy className='copy' />
          Copy to clipboard
        </button>
        <button
          type='button'
          className='delete-btn'
          onClick={() => {
            dispatch(deleteDraftMessage(_id))
          }}
        >
          <MdDelete className='delete' />
          Delete
        </button>
      </div>
      <p className='message-source'>
        <Link to={`/${source}`}>source: {source}</Link>
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
    /* margin-top: 0.5rem; */
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

  p a {
    color: var(--white-col);
    /* text-decoration: none; */
  }
`
export default DraftMessage
