import React from 'react'
import styled from 'styled-components'
import { HiOutlineDotsVertical } from 'react-icons/hi'

const GroupLayout = () => {
  return (
    <Wrapper>
      <img src='' alt='' />
      <div className='layout-container'>
        <div className='container-header'>
          <h3>Lorem, ipsum dolor.</h3>
          <div className='menu-icon'>
            <HiOutlineDotsVertical />
          </div>
        </div>
        <p>description made me young</p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  width: 80%;
  min-height: 100px;
  border-radius: 5px;
  text-align: center;
  background: #435c6d;
  color: #ffffff;
  margin: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;

  img {
    height: 80px;
    width: 80px;
    background: whitesmoke;
    border-radius: 50%;
    object-fit: cover;
  }

  .layout-container {
    width: 70%;
    height: 100%;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .container-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
