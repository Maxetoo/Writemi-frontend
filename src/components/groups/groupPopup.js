import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import { RxCopy } from 'react-icons/rx'
import { ImCross } from 'react-icons/im'
import {
  toggleGroupModal,
  deleteGroup,
  getSingleGroup,
} from '../../slices/groupMsgSlice'
import { Loader } from '../../config'
import { configTime } from '../../config/moment'
import { copyToClipboard, killCopyAlert } from '../../slices/eventSlice'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
// dispatch(getSingleGroup(_id))
// showGroupModal
const GroupPopup = () => {
  const {
    getSingleGroupLoad,
    getSingleGroupEntry,
    deleteSuccess,
    deleteLoading,
  } = useSelector((store) => store.groups)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { name, _id, createdAt, image } = getSingleGroupEntry
  const currentUrl = window.location.href + `/${_id}`
  //   getSingleGroupLoad ? <Loader />
  return (
    <Wrapper
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'saturation',
      }}
    >
      <div className='cancel-icon' onClick={() => dispatch(toggleGroupModal())}>
        <ImCross />
      </div>
      {getSingleGroupLoad ? (
        <Loader />
      ) : (
        <div className='option-menu'>
          <h3>{name}</h3>
          <div className='link-container'>
            <p className='link'>{currentUrl.substring(0, 15)}...</p>
            <div
              className='copy-container'
              onClick={() => dispatch(copyToClipboard(currentUrl))}
            >
              <RxCopy className='copy-icon' />
            </div>
          </div>
          <div className='btn-container'>
            <button
              type='button'
              className='edit-btn'
              onClick={() => {
                navigate(`/groups/editGroup/${_id}`)
                dispatch(getSingleGroup(_id))
              }}
            >
              <BsPencilSquare className='edit' />
              Edit
            </button>
            <button
              type='button'
              className={`delete-btn ${deleteLoading ? 'btn-loading' : ''}`}
              onClick={() => {
                dispatch(deleteGroup(_id))
              }}
            >
              <MdDelete className='delete' />
              Delete
            </button>
          </div>
          <div className='date-container'>{configTime(createdAt)}</div>
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.article`
  width: 100vw;
  height: 100vh;
  overflow: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.7); /* Black w/ opacity */
  /* background: var(--dark-secondary); */
  color: var(--white-col);
  z-index: 1000 !important;
  position: fixed;
  top: 0;
  /* opacity: 0.75; */

  .cancel-icon {
    margin: -3rem 0rem 2rem 0rem;
    font-size: 1.5em;
    cursor: pointer;
  }

  .copy-container {
    border-left: solid 1px black;
    padding-left: 1rem;
    display: grid;
    place-content: center;
    cursor: pointer;
  }

  .option-menu {
    background: #435c6d;
    color: #ffffff;
    height: auto;
    width: 80%;
    opacity: 1;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    border: solid 2px black;
  }

  .link-container {
    width: 90%;
    height: 35px;
    background: #ffffff;
    color: #000000;
    padding: 0rem 1rem 0rem 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 1rem;
    border-radius: 5px;
  }

  .btn-container {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    width: 100%;
    margin: 0.3rem;
    height: 50px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .btn-loading {
    opacity: 0.75;
  }

  .edit-btn {
    background: #131313;
    color: #ffffff;
    border: none;
  }

  .edit {
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

  .date-container {
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-top: 0.3rem;
    font-size: 0.8em;
    opacity: 0.9;
  }
`

export default GroupPopup
