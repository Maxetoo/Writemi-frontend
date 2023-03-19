import React from 'react'
import styled from 'styled-components'
import { ImCross } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'

const AlertError = ({ message }) => {
  return (
    <Wrapper>
      <div className='alert-container'>
        <p className='alert-texts'>{message}</p>
        {/* <div className='exit-btn'>
          <ImCross />
        </div> */}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  z-index: 999 !important;
  position: fixed;
  bottom: 20%;

  .alert-container {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: -1rem;
    color: #b94a48;
    background-color: #f2dede;
    border-color: #eed3d7;
    height: auto;
    padding: 1rem;
    border-radius: 10px;
    border: solid 1px black;
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
`
export default AlertError
