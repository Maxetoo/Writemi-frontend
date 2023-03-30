import React, { useEffect, memo } from 'react'
import styled from 'styled-components'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Navbar, Homemain } from '../components/home'
// import MyMessages from './../components/personalMessage/myMessages'
import {
  MyMessages,
  EmptyMessage,
  MessageSent,
} from './../components/personalMessage'
import {
  Loader,
  AlertError,
  AlertSuccess,
  NoSearchResult,
  paginator,
} from '../config'
import {
  HiOutlineDotsVertical,
  HiArrowLeft,
  HiArrowRight,
} from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { TbArrowBackUp } from 'react-icons/tb'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
// import EmptyMessages from './../components/personalMessage/emptyMessage'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPersonalMessages,
  killDeleteAlert,
  toggleShowClearBtn,
  clearAllPersonalMessages,
  exitClearBtn,
  pageNavigator,
  pageToDefault,
} from '../slices/personalMsgSlice'
import { IoMdClose } from 'react-icons/io'
import { killBookmarkAlert } from '../slices/bookmarkSlice'
// import {to} from '../slices/groupMsgSlice';
import { fillSearchValue, toggleShowSearch } from '../slices/eventSlice'
// MdOutlineArrowBackIosNew
// HiOutlineDotsVertical
// BiSearch
// TbArrowBackUp

const PersonalMessages = () => {
  const {
    loading,
    personalMessages,
    deleteError,
    errorMessage,
    successMessage,
    messageDeleted,
    showClearBtn,
    totalMessages,
    currentPage,
  } = useSelector((store) => store.messages)
  const { searchValue, showSearchInput } = useSelector((store) => store.actions)
  const { isError, alertMessage, bookmarkAdded } = useSelector(
    (store) => store.bookmarks
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getPersonalMessages())
  }, [])

  useEffect(() => {
    if (deleteError || messageDeleted) {
      const timer = setTimeout(() => {
        dispatch(killDeleteAlert())
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [deleteError, messageDeleted])

  useEffect(() => {
    if (isError || bookmarkAdded) {
      const timer = setTimeout(() => {
        dispatch(killBookmarkAlert())
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isError, bookmarkAdded])

  return (
    <Wrapper>
      <div className='header'>
        <div className='header-icon back-btn' onClick={() => navigate('/home')}>
          <MdOutlineArrowBackIosNew />
        </div>
        {!showSearchInput ? (
          <>
            <h3 className='header-title'>
              Personal Messages ({totalMessages})
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
                onClick={() => {
                  dispatch(toggleShowClearBtn())
                }}
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
                dispatch(getPersonalMessages())
              }}
            />
            <div
              className='header-icon close'
              onClick={() => {
                dispatch(toggleShowSearch())
                dispatch(getPersonalMessages())
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
              dispatch(clearAllPersonalMessages())
              dispatch(toggleShowClearBtn())
            }}
          >
            Clear Messages
          </p>
        </div>
      )}
      {bookmarkAdded && <AlertSuccess message={alertMessage} />}
      {messageDeleted && <AlertSuccess message={successMessage} />}
      {deleteError && <AlertError message={errorMessage} />}
      {isError && <AlertError message={alertMessage} />}
      <div
        className='message-container'
        onClick={() => dispatch(exitClearBtn())}
      >
        {loading ? (
          <Loader />
        ) : personalMessages.length === 0 && searchValue.length > 0 ? (
          <NoSearchResult />
        ) : personalMessages.length === 0 && !searchValue ? (
          <EmptyMessage />
        ) : (
          personalMessages.map((value) => {
            return <MyMessages {...value} key={value._id} />
          })
        )}
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
                dispatch(getPersonalMessages())
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
                dispatch(getPersonalMessages())
              }}
            >
              <HiArrowRight />
            </span>
            <span
              className='exit pag-icon'
              onClick={() => {
                dispatch(pageToDefault())
                dispatch(getPersonalMessages())
              }}
            >
              <TbArrowBackUp />
            </span>
          </div>
        </div>
      )}
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

  .search-input {
    width: 80%;
    height: 55px;
    outline: none;
    padding: 0rem 1.5rem 0rem 1.5rem;
    border: none;
    font-size: 0.9em;
  }

  .header-icon {
    font-size: 1.3em;
    cursor: pointer;
  }

  .header-title {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1em;
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

  .message-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    margin-top: 2rem;
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

export default PersonalMessages
