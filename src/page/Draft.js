import React from 'react'
import styled from 'styled-components'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdOutlineArrowBackIosNew, MdDelete } from 'react-icons/md'
import { Navbar, Homemain } from '../components/home'
// import DraftMessage from '../components/drafts/draftMessage'
import { DraftMessage, EmptyDraftMessage } from '../components/drafts'
const Draft = () => {
  const { draftEntries } = useSelector((store) => store.drafts)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Wrapper>
      <div className='header'>
        <div className='header-icon back-btn' onClick={() => navigate('/home')}>
          <MdOutlineArrowBackIosNew />
        </div>
        <h3 className='header-title'>Drafts ({draftEntries.length})</h3>
        <div className='header-icon menu'>
          <HiOutlineDotsVertical />
        </div>
      </div>
      <div className='message-container'>
        {draftEntries.length === 0 ? (
          <EmptyDraftMessage />
        ) : (
          draftEntries.map((value) => {
            return <DraftMessage {...value} key={value._id} />
          })
        )}
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
  text-align: center;
  color: var(--white-col);

  .header {
    height: 50px;
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
    font-size: 0.95em;
  }

  .message-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: auto;
    margin-top: 2rem;
    padding-bottom: 7rem;
  }

  @media only screen and (min-width: 768px) {
    .header {
      padding: 0rem 3rem 0rem 10rem;
    }
  }
`

export default Draft
