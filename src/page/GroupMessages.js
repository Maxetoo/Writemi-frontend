import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Navbar, Homemain } from '../components/home'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import GroupLayout from '../components/groups/groupLayout'
import EmptyGroup from '../components/groups/emptyGroup'
import { TiPlus } from 'react-icons/ti'
import {
  getGroups,
  toggleShowClearBtn,
  exitClearBtn,
  clearAllBookmarks,
} from '../slices/groupMsgSlice'
import { IoMdClose } from 'react-icons/io'
import { BiSearch } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, AlertError, AlertSuccess, NoSearchResult } from '../config'
import GroupPopUp from '../components/groups/groupPopup'
import { fillSearchValue, toggleShowSearch } from '../slices/eventSlice'

// TiPlus

const GroupMessages = () => {
  const {
    groupEntries,
    loading,
    showGroupModal,
    getSingleGroupLoad,
    showClearBtn,
  } = useSelector((store) => store.groups)
  const { searchValue, showSearchInput, textCopied } = useSelector(
    (store) => store.actions
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getGroups())
  }, [])

  return (
    <Wrapper>
      {showGroupModal && <GroupPopUp />}
      <div className='header'>
        <div className='header-icon back-btn' onClick={() => navigate('/home')}>
          <MdOutlineArrowBackIosNew />
        </div>
        {!showSearchInput ? (
          <>
            <h3 className='header-title'>Groups ({groupEntries.length})</h3>
            {/* <div className='header-icon menu'>
          <HiOutlineDotsVertical />
        </div> */}
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
                onClick={() => dispatch(toggleShowClearBtn())}
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
                dispatch(getGroups())
              }}
            />
            <div
              className='header-icon close'
              onClick={() => {
                dispatch(toggleShowSearch())
                dispatch(getGroups())
              }}
            >
              <IoMdClose />
            </div>
          </>
        )}
      </div>
      {showClearBtn && (
        <div className='clear-msg-container'>
          <p
            className='clear-msg'
            onClick={() => {
              dispatch(clearAllBookmarks())
              dispatch(toggleShowClearBtn())
            }}
          >
            Clear Groups
          </p>
        </div>
      )}
      <div className='group-container' onClick={() => dispatch(exitClearBtn())}>
        {loading ? (
          <Loader />
        ) : groupEntries.length === 0 && searchValue.length > 0 ? (
          <NoSearchResult />
        ) : groupEntries.length === 0 && !searchValue ? (
          <EmptyGroup />
        ) : (
          groupEntries.map((value) => {
            return <GroupLayout {...value} key={value._id} />
          })
        )}
      </div>
      <div
        className='create-group-icon'
        onClick={() => navigate('/groups/createGroup')}
      >
        <TiPlus />
      </div>
      <Navbar />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100vw;
  background: var(--secondary-home);
  color: var(--white-col);
  text-align: center;

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

  .right-header-btns {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .search {
    margin-right: 1rem;
  }

  .search-input {
    width: 80%;
    height: 55px;
    outline: none;
    padding: 0rem 1.5rem 0rem 1.5rem;
    border: none;
    font-size: 0.9em;
  }

  .clear-msg-container {
    width: 100%;
    display: flex;
    justify-content: end;
    padding: 1rem 2.5rem 0rem 2.5rem;
  }

  .clear-msg {
    width: 200px;
    padding: 0.5rem;
    border-radius: 5px;
    background: #131313;
    color: #ffffff;
    font-size: 0.9em;
    cursor: pointer;
    user-select: none;
  }

  .group-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    margin-top: 2rem;
    padding-bottom: 7rem;
  }

  .create-group-icon {
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

  @media only screen and (min-width: 768px) {
    .header {
      padding: 0rem 3rem 0rem 10rem;
    }
  }
`

export default GroupMessages
