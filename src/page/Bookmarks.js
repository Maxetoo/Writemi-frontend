import React, { useEffect } from 'react'
import styled from 'styled-components'
import { IoMdClose } from 'react-icons/io'
import { BiSearch } from 'react-icons/bi'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Homemain } from '../components/home'
import { Loader, AlertError, AlertSuccess, paginator } from '../config'
import {
  HiOutlineDotsVertical,
  HiArrowLeft,
  HiArrowRight,
} from 'react-icons/hi'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import BookmarkMessage from '../components/bookmarks/bookmarkMessage'
import EmptyBookmark from '../components/bookmarks/emptyBookmark'
import {
  getBookmarks,
  alertErrorKill,
  setBtnIndex,
  toggleShowClearBtn,
  clearAllBookmarks,
  exitClearBtn,
  pageNavigator,
  pageToDefault,
} from '../slices/bookmarkSlice'
import { copyToClipboard, killCopyAlert } from '../slices/eventSlice'
import { fillSearchValue, toggleShowSearch } from '../slices/eventSlice'
import { TbArrowBackUp } from 'react-icons/tb'

const Bookmarks = () => {
  const {
    currentPage,
    isError,
    alertMessage,
    bookmarkAdded,
    fetchLoading,
    bookmarkEntries,
    deleteSuccess,
    bookmarkAlertMsg,
    deletePending,
    showClearBtn,
    totalMessages,
  } = useSelector((store) => store.bookmarks)
  const { searchValue, showSearchInput, textCopied } = useSelector(
    (store) => store.actions
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getBookmarks())
  }, [])

  useEffect(() => {
    if (deleteSuccess) {
      const timer = setTimeout(() => {
        dispatch(alertErrorKill())
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [deleteSuccess])

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
      <div className='header'>
        <div className='header-icon back-btn' onClick={() => navigate('/home')}>
          <MdOutlineArrowBackIosNew />
        </div>
        {!showSearchInput ? (
          <>
            <h3 className='header-title'>Bookmarks ({totalMessages})</h3>
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
                dispatch(getBookmarks())
              }}
            />
            <div
              className='header-icon close'
              onClick={() => {
                dispatch(toggleShowSearch())
                dispatch(getBookmarks())
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
            Clear Bookmarks
          </p>
        </div>
      )}
      {deleteSuccess && <AlertSuccess message={bookmarkAlertMsg} />}
      {textCopied && <AlertSuccess message={'Text copied'} />}
      <div
        className='bookmark-container'
        onClick={() => dispatch(exitClearBtn())}
      >
        {fetchLoading ? (
          <Loader />
        ) : bookmarkEntries.length === 0 ? (
          <EmptyBookmark />
        ) : (
          bookmarkEntries.map((value) => {
            return (
              <BookmarkMessage {...value} key={value._id} tag={value._id} />
            )
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
                dispatch(getBookmarks())
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
                dispatch(getBookmarks())
              }}
            >
              <HiArrowRight />
            </span>
            <span
              className='exit pag-icon'
              onClick={() => {
                dispatch(pageToDefault())
                dispatch(getBookmarks())
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

  .bookmark-container {
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
export default Bookmarks
