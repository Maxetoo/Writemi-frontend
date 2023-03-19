import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { getSingleGroup, toggleGroupModal } from '../../slices/groupMsgSlice'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

const GroupLayout = ({ name, image, description, _id }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <Wrapper>
      <img src={image} alt={name} onClick={() => navigate(`/groups/${_id}`)} />
      <div
        className='text-desc-container'
        onClick={() => navigate(`/groups/${_id}`)}
      >
        <h3>{name}</h3>
        <p className='desc-texts'>{description}</p>
      </div>
      <div className='utils-container'>
        <div
          className='menu-icon'
          onClick={() => {
            dispatch(toggleGroupModal())
            dispatch(getSingleGroup(_id))
          }}
        >
          <HiOutlineDotsVertical />
        </div>
        {/* <p className='date'>mon 24th</p> */}
      </div>
      {/* <div className='layout-container'>
        <div className='container-header'>
          <h3>{name}</h3>
        </div>
        <p>{description}</p>
      </div>
      <div className='options-right-cont'>
        <div className='menu-icon'>
          <HiOutlineDotsVertical />
        </div>
        <p className='dates'>mon 24th, 2:30pm</p>
      </div> */}
    </Wrapper>
  )
}

const Wrapper = styled.article`
  width: 80%;
  height: 100px;
  border-radius: 5px;
  text-align: center;
  background: #435c6d;
  color: #ffffff;
  margin: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  cursor: pointer;

  img {
    height: 100%;
    width: 20%;
    background: #f5f5f5;
    border-radius: 50%;
    object-fit: cover;
  }

  .text-desc-container {
    height: 80px;
    width: calc(90% - (10% + 22%));
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  .utils-container {
    height: 80px;
    width: 10%;
    margin-left: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: start;
    align-items: flex-end;
  }

  .date {
    font-size: 0.5em;
  }

  .menu-icon {
    cursor: pointer;
  }

  h3 {
    font-size: 0.95em;
  }

  p {
    width: 80%;
    margin-top: 0.5rem;
    font-size: 0.8em;
    text-align: start;
  }
`
export default GroupLayout
