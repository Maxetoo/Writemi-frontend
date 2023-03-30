import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar } from '../home'
import { TiPlus } from 'react-icons/ti'
import { IoMdClose } from 'react-icons/io'
import { BiSearch } from 'react-icons/bi'
import GroupMessage from './message'
import EmptyMessage from './emptyGroupMessages'
import {
  HiOutlineDotsVertical,
  HiArrowLeft,
  HiArrowRight,
} from 'react-icons/hi'
import { TbArrowBackUp } from 'react-icons/tb'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import {
  getGroupMessages,
  pageNavigator,
  pageToDefault,
  flagGroupMessage,
  killErrorAlert,
} from '../../slices/singleGroupSlice'
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import {
  Loader,
  AlertError,
  AlertSuccess,
  NoSearchResult,
  paginator,
} from '../../config'
import { getSingleGroup } from '../../slices/groupMsgSlice'
import { killBookmarkAlert } from '../../slices/bookmarkSlice'
import { fillSearchValue, toggleShowSearch } from '../../slices/eventSlice'
import { killAlertError } from '../../slices/profileSlice'
import SignupPrompt from './signupPrompt'

// groupMessages
const GroupMessageSection = () => {
  const { searchValue, showSearchInput, textCopied } = useSelector(
    (store) => store.actions
  )

  const {
    isLoading,
    messageEntries,
    totalMessages,
    currentPage,
    errorPresent,
    errorMessage,
    messageFlagged,
    successMessage,
    loginPrompt,
  } = useSelector((store) => store.groupMessages)
  const { getSingleGroupLoad, getSingleGroupEntry } = useSelector(
    (store) => store.groups
  )
  const { isError, alertMessage, bookmarkAdded, bookmarkLoginPrompt } =
    useSelector((store) => store.bookmarks)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { name } = getSingleGroupEntry
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
    if (errorPresent || messageFlagged) {
      const timer = setTimeout(() => {
        dispatch(killErrorAlert())
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [errorPresent, messageFlagged])

  useEffect(() => {
    dispatch(getSingleGroup(id))
  }, [])

  return (
    <Wrapper>
      <div className='header'>
        <div
          className='header-icon back-btn'
          onClick={() => navigate('/groups')}
        >
          <MdOutlineArrowBackIosNew />
        </div>
        {!showSearchInput ? (
          <>
            <h3 className='header-title'>
              {getSingleGroupLoad ? 'Group messages' : name} ({totalMessages})
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
              <div className='header-icon menu'></div>
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
      {(loginPrompt || bookmarkLoginPrompt) && <SignupPrompt />}
      <div className='group-message-container'>
        {isLoading ? (
          <Loader />
        ) : messageEntries.length === 0 && searchValue.length > 0 ? (
          <NoSearchResult />
        ) : messageEntries.length === 0 && !searchValue ? (
          <EmptyMessage />
        ) : (
          messageEntries.map((value) => {
            return <GroupMessage {...value} key={value._id} />
          })
        )}
      </div>
      <div
        className='create-msg-icon'
        onClick={() => navigate(`/group/addMessage/${id}`)}
      >
        <TiPlus />
      </div>
      {totalMessages > 7 && (
        <div className='pagination-container'>
          <div className='pagination'>
            <span
              className='page-left pag-icon'
              onClick={() => {
                dispatch(
                  pageNavigator({
                    type: 'dec',
                    totalPages: `${paginator(totalMessages)}`,
                  })
                )
                dispatch(getGroupMessages(id))
              }}
            >
              <HiArrowLeft />
            </span>
            <span className='page-count'>
              {currentPage} of {paginator(totalMessages)}
            </span>
            <span
              className='page-right pag-icon'
              onClick={() => {
                dispatch(
                  pageNavigator({
                    type: 'inc',
                    totalPages: `${paginator(totalMessages)}`,
                  })
                )
                dispatch(getGroupMessages(id))
              }}
            >
              <HiArrowRight />
            </span>
            <span
              className='exit pag-icon'
              onClick={() => {
                dispatch(pageToDefault())
                dispatch(getGroupMessages(id))
              }}
            >
              <TbArrowBackUp />
            </span>
          </div>
        </div>
      )}
      {bookmarkAdded && <AlertSuccess message={alertMessage} />}
      {messageFlagged && <AlertSuccess message={successMessage} />}
      {isError && <AlertError message={alertMessage} />}
      {errorPresent && <AlertError message={errorMessage} />}
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
  padding-bottom: 7rem;

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

  .pagination-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    margin-top: 2rem;
  }

  .pagination {
    width: 60%;
    height: 50px;
    border-radius: 10px;
    background: #435c6d;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* padding: 1.5rem 4rem 1.5rem 4rem; */
    padding: 1.5rem 2rem 1.5rem 2rem;
    border: solid 1px black;
  }

  .pagination span {
    height: 100%;
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
  }

  .page-count {
    font-size: 0.95em;
    opacity: 0.85;
  }

  .pag-icon {
    font-size: 1.2em;
    color: #0e0e0e;
  }

  @media only screen and (min-width: 768px) {
    .header {
      padding: 0rem 3rem 0rem 10rem;
    }

    .pagination {
      width: 300px;
    }
  }
`
export default GroupMessageSection
