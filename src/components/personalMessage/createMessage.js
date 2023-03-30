import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
  deletePersonalMessage,
  createPersonalMessage,
  fillMessageInput,
  sender,
  alertErrorKill,
} from '../../slices/personalMsgSlice'
import { ImCross } from 'react-icons/im'
import { EmptyMessage, MessageSent } from './index'
import { saveToDraft, setDraftToLocalStorage } from '../../slices/draftSlice'

const CreateMessage = () => {
  const { id: username } = useParams()
  const navigate = useNavigate()
  const {
    message,
    deletePending,
    sendingError,
    errorMessage,
    sendLoading,
    messageSent,
    messageLength,
    userOffline,
    addToDraft,
  } = useSelector((store) => store.messages)
  const { draftEntries } = useSelector((store) => store.drafts)
  const dispatch = useDispatch()

  useEffect(() => {
    if (sendingError) {
      const timer = setTimeout(() => {
        dispatch(alertErrorKill())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [sendingError])

  useEffect(() => {
    const timeCreated = new Date().getTime()
    const draftData = {
      _id: timeCreated,
      message,
      source: username,
      dateCreated: timeCreated,
      dateUpdated: timeCreated,
    }
    if (addToDraft) {
      dispatch(saveToDraft(draftData))
    }
  }, [addToDraft])

  return (
    <Wrapper>
      {!messageSent ? (
        <>
          <div className='header'>
            <div
              className='header-icon back-btn'
              onClick={() => navigate('/home')}
            >
              <MdOutlineArrowBackIosNew />
            </div>
            <h3 className='header-title'>Send Your Message</h3>
            <div className='header-icon menu'></div>
          </div>
          {sendingError && (
            <div className='alert-container'>
              <p className='alert-texts'>{errorMessage}</p>
              <div className='exit-btn'>
                <ImCross />
              </div>
            </div>
          )}
          <div className='message-container'>
            <p>
              Say something about <b>{username}</b>...
            </p>
            <form>
              <textarea
                draggable='true'
                placeholder='Type here'
                value={message}
                maxLength={300}
                onChange={(e) => {
                  dispatch(fillMessageInput(e.target.value))
                }}
              />
              <p className='counter'>{messageLength}/300</p>
              <button
                type='button'
                className={sendLoading ? 'loading-btn' : ''}
                onClick={() => {
                  dispatch(createPersonalMessage({ message, username }))
                }}
              >
                Send
              </button>
            </form>
          </div>
        </>
      ) : (
        <MessageSent />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  min-height: 100vh;
  width: 100vw;
  background: var(--secondary-home);
  text-align: center;
  color: var(--white-col);
  display: flex;
  flex-direction: column;
  align-items: center;

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

  .alert-container {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    color: #b94a48;
    background-color: #f2dede;
    border-color: #eed3d7;
    height: auto;
    padding: 1rem;
  }

  .alert-texts {
    font-size: 0.9em;
    width: 90%;
  }

  .exit-btn {
    font-size: 0.7em;
    height: 90%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    cursor: pointer;
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

  .loading-btn {
    opacity: 0.5;
  }
`
export default CreateMessage
