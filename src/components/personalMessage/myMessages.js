import React from 'react'
import styled from 'styled-components'

const MyMessages = () => {
  return (
    <Wrapper>
      <h3>Message:</h3>
      <p className='message'>Lorem ipsum dolor sit amet.</p>
      <p className='time-stamp'>time</p>
      <div className='btn-container'>
        <button type='button' className='bookmark-btn'>
          Bookmark Response
        </button>
        <button type='button' className='delete-btn'>
          Delete Response
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  width: 80%;
  min-height: 200px;
  border-radius: 5px;
  text-align: center;
  background: #435c6d;
  color: white;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  .btn-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  h3 {
    margin: 0.5rem;
  }

  p {
    margin: 0.5rem;
  }

  button {
    margin: 0.2rem;
    width: 100%;
    height: 50px;
    cursor: pointer;
    border-radius: 5px;
  }

  .bookmark-btn {
    background: #131313;
    color: white;
    border: none;
  }

  .delete-btn {
    background: #ec0c0c;
    color: white;
    border: none;
  }
`
export default MyMessages
