import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from '../home'
import { TiPlus } from 'react-icons/ti'
import { IoMdClose } from 'react-icons/io'
import { BiSearch } from 'react-icons/bi'
import GroupMessage from './message'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import { getGroupMessages } from '../../slices/singleGroupSlice'
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { Loader, AlertError, AlertSuccess, NoSearchResult } from '../../config'
import { killBookmarkAlert } from '../../slices/bookmarkSlice'
import { fillSearchValue, toggleShowSearch } from '../../slices/eventSlice'

// groupMessages
const GroupMessageSection = () => {
  const { searchValue, showSearchInput, textCopied } = useSelector(
    (store) => store.actions
  )
  const { isLoading, messageEntries } = useSelector(
    (store) => store.groupMessages
  )
  const { isError, alertMessage, bookmarkAdded } = useSelector(
    (store) => store.bookmarks
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  useEffect(() => {
    dispatch(getGroupMessages(id))
  }, [])

  useEffect(() => {
    if (isError || bookmarkAdded) {
      const timer = setTimeout(() => {
        dispatch(killBookmarkAlert())
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isError, bookmarkAdded])

  useEffect(() => {
    console.log('Message', messageEntries)
  }, [])
  return (
    <Wrapper>
      <div className='header'>
        <div className='header-icon back-btn'>
          <MdOutlineArrowBackIosNew />
        </div>
        {!showSearchInput ? (
          <>
            <h3 className='header-title'>
              Group Messages ({messageEntries.length})
            </h3>
            <div className='right-header-btns'>
              <div
                className='header-icon search'
                onClick={() => {
                  dispatch(toggleShowSearch())
                }}
              >
                <BiSearch />
              </div>
              <div
                className='header-icon menu'
                // onClick={() => dispatch(toggleShowClearBtn())}
              >
                <HiOutlineDotsVertical />
              </div>
            </div>
          </>
        ) : (
          <>
            <input
              type='text'
              className='search-input'
              placeholder='search'
              value={searchValue}
              onChange={(e) => {
                dispatch(fillSearchValue(e.target.value))
                dispatch(getGroupMessages(id))
              }}
            />
            <div
              className='header-icon close'
              onClick={() => {
                dispatch(toggleShowSearch())
                dispatch(getGroupMessages(id))
              }}
            >
              <IoMdClose />
            </div>
          </>
        )}
      </div>
      {/* {isLoading ? (
        <Loader />
      ) : messageEntries.length === 0 && searchValue.length > 0 ? (
        <NoSearchResult />
      ) : messageEntries.length === 0 && !searchValue ? (
        // <EmptyMessage />
        <h3>Empty message</h3>
      ) : (
        messageEntries.map((value) => {
          return <GroupMessage {...value} key={value._id} />
        })
      )} */}
      {/* {messageEntries.length} */}
      {/* {isLoading ? (
        <Loader />
      ) : (
        <div className='group-message-container'>
          {messageEntries.map((value) => {
            return <GroupMessage {...value} key={value._id} />
          })}
        </div>
      )} */}
      <div
        className='create-msg-icon'
        onClick={() => navigate('/groups/createGroup')}
      >
        <TiPlus />
      </div>
      {bookmarkAdded && <AlertSuccess message={alertMessage} />}
      {isError && <AlertError message={alertMessage} />}
      <Navbar />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
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

  .search-input {
    width: 80%;
    height: 55px;
    outline: none;
    padding: 0rem 1.5rem 0rem 1.5rem;
    border: none;
    font-size: 0.9em;
  }

  .right-header-btns {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .close {
    margin-right: 1rem;
  }

  .search {
    margin-right: 1rem;
  }

  .group-message-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    margin-top: 2rem;
    padding-bottom: 7rem;
  }

  .create-msg-icon {
    position: fixed;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    display: grid;
    place-content: center;
    top: 70%;
    right: 10%;
    z-index: 500;
    background: var(--dark-secondary);
    color: var(--white-col);
    cursor: pointer;
  }
`
export default GroupMessageSection
