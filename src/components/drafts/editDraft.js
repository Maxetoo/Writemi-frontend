import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams, useLocation, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import {
  saveDraftMessage,
  fillEditValues,
  checkDraftId,
} from '../../slices/draftSlice'

const EditDraft = () => {
  const { message, draftIdCorrect, draftMessageLength } = useSelector(
    (store) => store.drafts
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    dispatch(checkDraftId(id))
  }, [draftIdCorrect])

  return (
    <Wrapper>
      <div className='header'>
        <div className='header-icon back-btn'>
          <MdOutlineArrowBackIosNew />
        </div>
        <h3 className='header-title'>Edit Message</h3>
        <div className='header-icon menu'></div>
      </div>
      <div className='message-container'>
        <p>Add text...</p>
        <form>
          <textarea
            draggable='true'
            placeholder='Edit message'
            maxLength={300}
            value={message}
            onChange={(e) => {
              dispatch(fillEditValues(e.target.value))
            }}
          />

          <p className='counter'>{draftMessageLength}/300</p>
          <button
            type='button'
            onClick={() => {
              dispatch(saveDraftMessage())
              navigate(`/drafts`)
            }}
          >
            Save
          </button>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
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

  .message-container {
    margin-top: 2rem;
    width: 100%;
    padding: 1.5em;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  form {
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  textarea {
    min-width: 100%;
    max-width: 100%;
    background: none;
    color: var(--white-col);
    font-size: 1.2em;
    min-height: 50px;
    height: auto;
    border: none;
    outline: none;
  }

  .counter {
    width: 100%;
    text-align: start;
    opacity: 0.8;
    font-size: 0.8em;
    margin: 0.2rem;
  }

  button {
    margin: 1rem;
    height: 50px;
    width: 90%;
    border: none;
    background: var(--login-secondary);
    color: var(--white-col);
    font-size: 0.9em;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }
`
export default EditDraft
